from PIL.ImageDraw import ImageDraw
from PIL.ImageFont import ImageFont
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status
from api.models import NonProfits, Drawings, Sponsors, Books
from api.serializers import NonProfitsSerializer, DrawingsSerializer, SponsorsSerializer, BooksSerializer, \
    UserListSerializer, UserLoginSerializer, UserRegistrationSerializer
from django.contrib.auth import get_user_model
from django.conf import settings

import os
from PIL import Image
import cv2
import urllib.request
import numpy as np
import requests
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
import numpy as np

import replicate

from dotenv import load_dotenv

from assests.s3 import S3

load_dotenv()

UserModel = get_user_model()


class DrawingsViewSet(viewsets.ModelViewSet):
    queryset = Drawings.objects.all()
    serializer_class = DrawingsSerializer
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        raw_sketch = request.data["image"]
        subject = request.data["subject"]
        prompt = f"{subject} as simple coloring book page"

        processed_sketch = self.convert_file_to_color_book_sketch(raw_sketch, prompt)
        creative_url = self.store_to_s3(url=processed_sketch)
        sanitized_data = {
            "school": request.data["school"],
            "created_by": request.data["student"],
            "creative_url": creative_url,
            "is_active": True
        }
        serializer = self.get_serializer(data=sanitized_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def convert_file_to_color_book_sketch(self, raw_sketch, prompt) -> str:
        # client = replicate.Client(os.getenv("REPLICATE_TOKEN"))
        # output = client.run(
        #     "jagilley/controlnet-scribble:435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
        #     input={"image": raw_sketch.file,
        #            "prompt": prompt,
        #            "ddim_steps": 20,
        #            "scale": 8,
        #            "a_prompt": "best quality, line sketch, outlines only, black and white",
        #            "n_prompt": "solid fills, incomplete shapes"}
        # )
        # raw_img, ai_generated = output
        raw_img, ai_generated = raw_sketch, "https://pbxt.replicate.delivery/slwfP9Un21TMfUDIupiu3tEMhGlaSkegDjF6xX2SDWl6flvGB/output_1.png"
        return ai_generated

    def store_to_s3(self, url):
        return url

class NonProfitsViewSet(viewsets.ModelViewSet):
    queryset = NonProfits.objects.all()
    serializer_class = NonProfitsSerializer
    permission_classes = (AllowAny,)


class SponsorViewSet(viewsets.ModelViewSet):
    queryset = Sponsors.objects.all()
    serializer_class = SponsorsSerializer
    permission_classes = (AllowAny,)


class BooksViewSet(viewsets.ModelViewSet):
    queryset = Books.objects.all()
    serializer_class = BooksSerializer
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        submit = 0
        drawings_pk = request.data["drawings"]
        drawings_qs = Drawings.objects.filter(id__in=drawings_pk)
        image_urls = [dict(x)["creative_url"] for x in DrawingsSerializer(drawings_qs, many=True).data]


        # if submit in request.data:
        #     submit = request.data.pop("submit")
        # if submit:
        #     # set published to true
        #     self.convert_images_to_pdf(image_urls, sponsors=True, heading="Our Sponsors", sponsors_url=sponsor_urls)

        processed_book_path = self.convert_images_to_pdf(image_urls)
        book_url = S3().upload(file_path=processed_book_path, file_name=request.data["name"])
        request.data["url"] = book_url
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        instance = self.get_object()
        image_urls = [dict(x)["creative_url"] for x in DrawingsSerializer(instance.drawings.all(), many=True).data]
        sponsor_urls = [dict(x)["logo"] for x in SponsorsSerializer(instance.sponsors.all(), many=True).data]
        npo_urls = [dict(x)["url"] for x in NonProfitsSerializer(instance.nonprofits.all(), many=True).data]

        image_urls = [x for x in image_urls if x!=None]
        sponsor_urls = [x for x in sponsor_urls if x!=None]
        npo_urls = [x for x in npo_urls if x!=None]

        processed_book_path = self.convert_images_to_pdf(image_urls, sponsors=True, heading="Our Sponsors", sponsors_url=sponsor_urls, npo_urls=npo_urls)
        book_url = S3().upload(file_path=processed_book_path, file_name=request.data["name"])
        request.data["url"] = book_url

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def create_sponsors_page(self, heading, image_urls):
        # A4 paper size in pixels (3508x2480)
        paper_width = 2480
        paper_height = 3208

        # Create a new blank A4-sized image
        output_image = Image.new("RGB", (paper_width, paper_height + 300), (255, 255, 255))

        font_size = 150
        response = requests.get("https://opp-hack-asu.s3.us-west-1.amazonaws.com/arial.ttf")
        font = ImageFont.truetype(BytesIO(response.content), font_size)  # You may need to change the font path

        # Create a drawing context
        draw = ImageDraw.Draw(output_image)

        # Add the heading text at the top of the page
        heading_text = heading
        text_width, text_height = draw.textsize(heading_text, font)
        x_text = (paper_width - text_width) // 2  # Center the text horizontally
        y_text = 50  # Adjust the vertical position as needed
        draw.text((x_text, y_text), heading_text, fill=(0, 0, 0), font=font)

        # Calculate the size of each image on the A4 page
        image_width = paper_width // 2  # Two columns of images
        image_height = paper_height // 4  # Four rows of images
        starting_y = 300 + (paper_height - (image_height * len(image_urls) // 2)) / 2

        # Loop through the image URLs and paste them onto the A4 canvas
        for i, image_url in enumerate(image_urls):
            # Download the image from the URL
            response = requests.get(image_url)
            img = Image.open(BytesIO(response.content))

            # Resize the image to fit on the A4 page
            img = img.resize((image_width, image_height), Image.ANTIALIAS)

            # Calculate the position to paste the image
            x = ((i % 2) * image_width)
            y = int(starting_y) + ((i // 2) * image_height)

            # Paste the image onto the A4 canvas
            output_image.paste(img, (x, y))

        # Save the final image
        return output_image


    def convert_images_to_pdf(self, urls, sponsors=False, heading = "", sponsors_url=[], npo_urls=[]):
        BASE_DIR = os.path.dirname(__file__)
        pdf_path = f"{BASE_DIR}/final_pdf"
        pages = []
        bg = np.zeros([3508, 2480, 3], dtype=np.uint8)
        bg[:] = 255
        bg = Image.fromarray(bg)
        response = requests.get("https://opp-hack-asu.s3.us-west-1.amazonaws.com/Cover.jpg")
        cover = Image.open(BytesIO(response.content))
        pages.append(cover)

        for url in urls:
            urllib.request.urlretrieve(url, f"{BASE_DIR}/tmp.png")
            with open(f"{BASE_DIR}/tmp.png", "rb") as img:
                drawing = Image.open(img).resize((2280, 2280))
                bg_copy = bg.copy()
                bg_copy.paste(drawing, (100, 614))
                pages.append(bg_copy)
        if sponsors:
            pages.append(self.create_sponsors_page("Sponsors", sponsors_url))
            pages.append(self.create_sponsors_page("Non Profits", npo_urls))
        pages[0].save(pdf_path, "PDF", resolution=90.0, save_all=True, append_images=pages[1:])
        return pdf_path


class UserRegistrationView(APIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)

        if valid:
            serializer.save()
            status_code = status.HTTP_201_CREATED

            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User successfully registered!',
                'user': serializer.data
            }

            return Response(response, status=status_code)


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = (AllowAny, )

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
                    'email': serializer.data['email'],
                    'role': serializer.data['role']
                }
            }

            return Response(response, status=status_code)


class UserListView(APIView):
    serializer_class = UserListSerializer
    permission_classes = (IsAuthenticated,)

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