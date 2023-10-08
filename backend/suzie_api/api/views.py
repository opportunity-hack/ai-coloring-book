from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status
from api.models import NonProfits, Drawings
from api.serializers import NonProfitsSerializer, DrawingsSerializer
import os

import replicate

from dotenv import load_dotenv
load_dotenv()




class NonProfitsViewSet(viewsets.ModelViewSet):
    queryset = NonProfits.objects.all()
    serializer_class = NonProfitsSerializer


class DrawingsViewSet(viewsets.ModelViewSet):
    queryset = Drawings.objects.all()
    serializer_class = DrawingsSerializer

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

    def store_to_s3(self, url) -> str:
        s3_url = url
        return s3_url

# class userReportView(APIView):
#     # def get(self, request):
#     #     """ Returns filtered or unfiltered, report data."""
#     #     try:
#     #         result, pageObject = getUserReport().get_report(request)
#     #         return Response({"data": result,
#     #                          "page": pageObject})
#     #
#     #     except Exception as error:
#     #         print(error)
#     #         return Response({"Message": "An exception has occurred.", "error": str(error)})
#
#     def post(self, request):
#         """ Upload given CSV."""
#         try:
#             result = saveUserReport().saveReport(dict(request.data))
#             return Response({"data": result})
#
#         except Exception as error:
#             print(error)
#             return Response({"Message": "An exception has occurred.", "error": str(error)})