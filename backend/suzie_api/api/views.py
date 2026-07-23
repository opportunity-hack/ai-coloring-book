import logging
import resend

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status
from api.models import NonProfits, Drawings, Sponsors, Books, SponsoredBooks
from api.prepare_book import convert_images_to_pdf
from api.serializers import NonProfitsSerializer, DrawingsSerializer, SponsorsSerializer, BooksSerializer, \
    UserListSerializer, UserLoginSerializer, UserRegistrationSerializer, DrawingsGetSerializer
from django.contrib.auth import get_user_model
import datetime
import os
import replicate
from io import BytesIO
from dotenv import load_dotenv
from api.permission import IsAdmin, AllUsers, IsStaffAdmin, get_request_user
from api.s3_handler import S3Handler

# Setup logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

resend.api_key = os.getenv("RESEND_EMAIL_KEY")
# Resend requires the "from" address to use a domain verified in the Resend
# dashboard. notify.susieqsbooks.org is the verified sending domain; ADMIN_EMAIL
# (which may be any inbox, e.g. a personal Gmail address) is only used as the
# recipient/reply-to address, never as the "from" address.
RESEND_FROM_EMAIL = os.getenv("RESEND_FROM_EMAIL", "Susie Q's Coloring Book <noreply@notify.susieqsbooks.org>")
UserModel = get_user_model()

NPO_URLS = ['https://shorturl.at/lz457'] * 11


class DrawingsViewSet(viewsets.ModelViewSet):
    queryset = Drawings.objects.all()
    serializer_class = DrawingsSerializer
    permission_classes = (IsStaffAdmin,)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if request.user_obj.role == UserModel.SCHOOL_ADMIN:
            queryset = queryset.filter(school=request.user_obj.school)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = DrawingsGetSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = DrawingsGetSerializer(queryset, many=True)
        return Response(serializer.data)


class CreateDrawingsViewSet(viewsets.ModelViewSet):
    logger.info("Creating drawings")
    queryset = Drawings.objects.all()    
    serializer_class = DrawingsSerializer
    permission_classes = (AllowAny,)
    
    def create(self, request, *args, **kwargs):
        logger.info("Creating drawing")

        raw_sketch = request.data["image"]
        subject = request.data["subject"]
        prompt = f"{subject} as simple coloring book page"

        uploader = S3Handler(os.getenv("AWS_BUCKET"))
        ts = int(datetime.datetime.now().timestamp())

        raw_sketch.file.seek(0)
        file_content = raw_sketch.file.read()
        # copy_of_file = BytesIO(file_content)
        # copy_of_file.seek(0)

        creative_url = uploader.upload_file_to_s3(BytesIO(file_content), f'raw_sketch/{ts}.jpg')

        processed_sketch = self.convert_file_to_color_book_sketch(raw_sketch.file, prompt)
        ai_creative_url = uploader.upload_url_to_s3(processed_sketch, f'ai/{ts}.jpg')

        sanitized_data = {
            "school": request.data.get("school"),
            "grade": request.data.get("grade"),
            "created_by": request.data.get("created_by"),
            "subject": subject,
            "creative_url": creative_url,
            "ai_creative_url": ai_creative_url,
            "is_active": True
        }
        serializer = self.get_serializer(data=sanitized_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def convert_file_to_color_book_sketch(self, raw_sketch, prompt) -> str:
        client = replicate.Client(os.getenv("REPLICATE_TOKEN"))
        output = client.run(
            "jagilley/controlnet-scribble:435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
            input={"image": raw_sketch,
                   "prompt": prompt,
                   "ddim_steps": 20,
                   "scale": 8,
                   "a_prompt": "best quality, line sketch, outlines only, black and white",
                   "n_prompt": "solid fills, incomplete shapes"}
        )
        raw_img, ai_generated = output
        # ai_generated = "https://pbxt.replicate.delivery/slwfP9Un21TMfUDIupiu3tEMhGlaSkegDjF6xX2SDWl6flvGB/output_1.png"
        return ai_generated


class NonProfitsViewSet(viewsets.ModelViewSet):
    queryset = NonProfits.objects.all()
    serializer_class = NonProfitsSerializer
    permission_classes = (IsAdmin,)


class SponsorViewSet(viewsets.ModelViewSet):
    queryset = Sponsors.objects.all()
    serializer_class = SponsorsSerializer
    permission_classes = (IsAdmin,)


class SponsorImageViewSet(APIView):
    permission_classes = (AllUsers,)

    def post(self, request, *args, **kwargs):
        ts = int(datetime.datetime.now().timestamp())
        sponsor_raw_img = request.data["file"]
        uploader = S3Handler(os.getenv("AWS_BUCKET"))
        url = uploader.upload_image_to_s3(image_file=sponsor_raw_img, file_name=f'sponsors/image_{ts}.jpg')
        sponsor = request.user_obj.sponsors_set.get()
        sponsor.logo = url
        sponsor.save()
        return Response({"url": url})


class SponsorPayAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        ts = int(datetime.datetime.now().timestamp())
        # create Sponsor
        sponsor_raw_img = request.data["file"]
        uploader = S3Handler(os.getenv("AWS_BUCKET"))
        url = uploader.upload_image_to_s3(image_file=sponsor_raw_img, file_name=f'sponsors/image_{ts}.jpg')
        sponsor = Sponsors(name=request.data["name"], logo=url)
        sponsor.save()

        books = list(map(int, request.data["books"].split(",")))
        total_amount = float(request.data["donation_amount"])
        amount_per_book = total_amount / len(books)
        sponsored_book_objs = []
        books_list = []
        for book_id in books:
            book_obj = Books.objects.get(pk=book_id)
            books_list.append(book_obj)
            if book_obj.current_sponsors < book_obj.total_sponsors:
                book_obj.current_sponsors += 1
                sponsored_book_objs.append(
                    SponsoredBooks(sponsor_id=sponsor, book_id=book_obj, amount=amount_per_book)
                )
                book_obj.save()

        SponsoredBooks.objects.bulk_create(sponsored_book_objs)

        # send mail to dr mary
        self.send_congratulatory_email(sponsor_name=sponsor.name,
                                       book_list=[x.name for x in books_list],
                                       donation_amount=total_amount)

        return Response({"sponsor": sponsor.id, "books": books, "amount_per_book": amount_per_book})

    def send_congratulatory_email(self, sponsor_name, book_list, donation_amount):
        # Email body
        books_formatted = "new-line".join([f"- {book}" for book in book_list])
        email_body = f"""
                <html>
                <head>
                <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }}
                h2 {{
                    color: #005691;
                }}
                p {{
                    margin: 18px 0;
                }}
                </style>
                </head>
                <body>
                
                <p>Hello,</p>
                
                <p>We have received a generous donation from our esteemed sponsor, <strong>{sponsor_name}</strong>. This contribution will be directed towards supporting the following books:</p>
                
                <p>{books_formatted.replace('new-line', "<br>")}</p>
                
                <p><strong>Total Donation Amount:</strong> ${donation_amount}</p>
                </body>
                </html>
                """
        
        # Sending the email
        try:
            r = resend.Emails.send({
              "from": RESEND_FROM_EMAIL,
                "to": os.getenv("RECEIVER_EMAIL"),
                "subject": "We have a Sponsor!",
                "html": email_body
            })
            print("Email successfully sent!")
        except Exception as e:
            print(f"Failed to send email. Error: {e}")


class BooksViewSet(viewsets.ModelViewSet):
    queryset = Books.objects.all()
    serializer_class = BooksSerializer

    def get_permissions(self):
        # The public sponsor page lists books; everything that mutates is staff-only.
        if self.action in ('list', 'retrieve'):
            return [AllowAny()]
        return [IsStaffAdmin()]

    def get_queryset(self):
        queryset = Books.objects.all()
        # School admins only see (and can only delete) books containing their
        # school's drawings; anonymous/sponsor and site-admin traffic sees all.
        user = get_request_user(self.request)
        if user is not None and user.role == UserModel.SCHOOL_ADMIN:
            queryset = queryset.filter(drawings__school=user.school).distinct()
        return queryset

    def create(self, request, *args, **kwargs):
        logger.info("Creating book")
        logger.info(request.data)

        drawings = request.data["drawings"]
        if request.user_obj.role == UserModel.SCHOOL_ADMIN:
            drawing_ids = [d["id"] for d in drawings]
            foreign = Drawings.objects.filter(id__in=drawing_ids).exclude(school=request.user_obj.school)
            if foreign.exists():
                return Response(
                    {"message": "You can only create books from your school's drawings."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        total_sponsors = request.data["totalSponsors"]
        ts = int(datetime.datetime.now().timestamp())
        # Make ts human readable and use underscores instead of spaces
        ts_str = datetime.datetime.fromtimestamp(ts).strftime('%Y%m%d_%H%M%S')
        book = {"name": f"Book_{ts_str}", "cover_url": "", "drawings": [], "total_sponsors": total_sponsors}
        logger.info(f"Book data: {book}")
        # set use_ai fields
        drawings_pk = []
        image_urls = []
        cover_url = ""
        for drawing_response in drawings:
            drawing = Drawings.objects.get(id=drawing_response["id"])
            if not cover_url:
                cover_url = drawing_response["url"]

            drawings_pk.append(drawing_response["id"])
            if drawing.use_ai != drawing_response["useAI"]:
                drawing.use_ai = drawing_response["useAI"]
                drawing.save()
                if drawing_response["useAI"]:
                    image_urls.append(drawing.ai_creative_url)
                else:
                    image_urls.append(drawing.creative_url)
            else:
                image_urls.append(drawing_response["url"])

        book["cover_url"] = cover_url
        book["drawings"] = drawings_pk
        serializer = self.get_serializer(data=book)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class GenerateBooksView(APIView):
    permission_classes = (IsStaffAdmin,)

    def post(self, request, *args, **kwargs):
        logger.info("Generating book")
        try:
            book = Books.objects.get(pk=request.data["id"])
            if request.user_obj.role == UserModel.SCHOOL_ADMIN and \
                    book.drawings.exclude(school=request.user_obj.school).exists():
                return Response(
                    {"message": "You can only generate books for your school."},
                    status=status.HTTP_403_FORBIDDEN,
                )
            logger.info(f"[Book] id: {book.id}, name: {book.name}, cover_url: {book.cover_url}, total_sponsors: {book.total_sponsors}")

            bucket = os.getenv("AWS_BUCKET")
            folder = "npos"
            
            npo_urls = [url for url in S3Handler(bucket_name=bucket).get_s3_urls(folder) if url != f"https://{bucket}.s3.amazonaws.com/{folder}/"]
            logger.info(f"Found {len(npo_urls)} NPO URLs in S3 bucket {bucket} and folder {folder} for book {book.id}")
            logger.info(f"NPO URLs: {npo_urls}")

            scribble_urls = list(set(x.ai_creative_url if x.use_ai else x.creative_url for x in book.drawings.all()))
            scribble_metadata = [f"{x.subject} by {x.created_by}" for x in book.drawings.all()]
            scribble_school = [x.school for x in book.drawings.all()]
            logger.info(f"Found {len(scribble_urls)} scribble URLs for book {book.id}")

            sponsor_urls = list(set([x.sponsor_id.logo for x in book.sponsoredbooks_set.all()]))
            logger.info(f"Found {len(sponsor_urls)} sponsor URLs for book {book.id}")
            
            logger.info("Converting images to PDF")
            book_url = convert_images_to_pdf(
                book_name=book.name,
                scribble_metadata=scribble_metadata,
                scribble_school=scribble_school,
                scribble_urls=scribble_urls,
                sponsor_urls=sponsor_urls,
                npo_urls=npo_urls,
            )
            logger.info(f"Book URL: {book_url}")

            book.url = book_url
            book.save()
        except Exception as error:
            logging.error(error)
            return Response({"type": error, "message": str(error)})
        return Response({"id": book.id, "url": book_url})


class SchoolRequestView(APIView):
    """Public 'add my school' form: validates and emails the request to the admins."""
    permission_classes = (AllowAny,)

    REQUIRED_FIELDS = ("name", "email", "school_name", "city", "state")
    OPTIONAL_FIELDS = ("requester_role", "students_estimate", "message")
    MAX_LENGTHS = {
        "name": 100, "email": 150, "school_name": 150, "city": 100,
        "state": 50, "requester_role": 50, "students_estimate": 20, "message": 2000,
    }

    def post(self, request, *args, **kwargs):
        # Honeypot: real users never fill this hidden field; bots do.
        if request.data.get("website"):
            return Response({"success": True})

        data = {}
        for field in self.REQUIRED_FIELDS + self.OPTIONAL_FIELDS:
            value = str(request.data.get(field, "") or "").strip()
            if field in self.REQUIRED_FIELDS and not value:
                return Response(
                    {"success": False, "message": f"Missing required field: {field}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            data[field] = value[: self.MAX_LENGTHS[field]]

        rows = "".join(
            f"<p><strong>{label}:</strong> {data[field] or '-'}</p>"
            for label, field in (
                ("Name", "name"), ("Email", "email"), ("School", "school_name"),
                ("City", "city"), ("State", "state"), ("They are a", "requester_role"),
                ("Estimated students", "students_estimate"), ("Message", "message"),
            )
        )
        email_body = f"""
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>New school request from susieqsbooks.org</h2>
                {rows}
                <p>Reply to {data['email']} to follow up, then add the school to
                the site's school list.</p>
                </body>
                </html>
                """

        try:
            resend.Emails.send({
                "from": RESEND_FROM_EMAIL,
                "to": os.getenv("RECEIVER_EMAIL", os.getenv("ADMIN_EMAIL")),
                "reply_to": data["email"],
                "subject": f"School request: {data['school_name']} ({data['city']}, {data['state']})",
                "html": email_body,
            })
        except Exception as e:
            logger.error(f"Failed to send school request email: {e}")
            return Response(
                {"success": False, "message": "Could not send the request. Please try again."},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        return Response({"success": True})


class UserRegistrationView(APIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = (IsAdmin,)

    def post(self, request):
        organization = request.data.pop("organization", "")

        if str(request.data.get("role")) == str(UserModel.SCHOOL_ADMIN) and not request.data.get("school"):
            return Response(
                {'success': False, 'message': 'School admins must be assigned a school.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)

        if valid:
            serializer.save()
            status_code = status.HTTP_201_CREATED
            user_data = serializer.data
            if user_data["role"] == UserModel.SPONSOR:
                Sponsors(name=organization, user_id=UserModel.objects.get(pk=user_data["id"])).save()

            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User successfully registered!',
                'user': user_data
            }

            return Response(response, status=status_code)


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)

        if valid:
            status_code = status.HTTP_200_OK

            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User logged in successfully',
                'access': serializer.data['access'],
                'refresh': serializer.data['refresh'],
                'authenticatedUser': {
                    'id': serializer.data['id'],
                    'email': serializer.data['email'],
                    'role': serializer.data['role'],
                    'school': serializer.data['school']
                }
            }

            return Response(response, status=status_code)


class UserListView(APIView):
    serializer_class = UserListSerializer
    permission_classes = (IsAdmin,)

    def get(self, request):
        user = request.user
        if user.role != 1:
            response = {
                'success': False,
                'status_code': status.HTTP_403_FORBIDDEN,
                'message': 'You are not authorized to perform this action'
            }
            return Response(response, status.HTTP_403_FORBIDDEN)
        else:
            users = UserModel.objects.all()
            serializer = self.serializer_class(users, many=True)
            response = {
                'success': True,
                'status_code': status.HTTP_200_OK,
                'message': 'Successfully fetched users',
                'users': serializer.data

            }
            return Response(response, status=status.HTTP_200_OK)
