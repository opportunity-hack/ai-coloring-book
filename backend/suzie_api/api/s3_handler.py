from io import BytesIO

import boto3
import requests
from botocore.exceptions import NoCredentialsError
import datetime


class S3Handler:
    def __init__(self, bucket_name):
        self.s3 = boto3.client('s3')
        self.bucket_name = bucket_name

    def upload_file_to_s3(self, file_obj, file_name):
        try:
            self.s3.upload_fileobj(file_obj, self.bucket_name, file_name)
            return f"https://{self.bucket_name}.s3.amazonaws.com/{file_name}"
        except NoCredentialsError:
            print("Credentials not available")
            return None

    def upload_url_to_s3(self, url, file_name):
        response = requests.get(url)
        if response.status_code == 200:
            # Convert response.content (bytes) into a file-like object for upload
            return self.upload_file_to_s3(BytesIO(response.content), file_name)
        else:
            print("Failed to fetch image from URL")
            return None

    def store_to_s3(self, ai_sketch, raw_sketch):
        # Assuming raw_sketch is a file object and ai_sketch is a URL
        ts = int(datetime.datetime.now().timestamp())
        ai_sketch_url = self.upload_url_to_s3(ai_sketch, f'ai/{ts}.jpg')
        raw_sketch_url = self.upload_file_to_s3(raw_sketch, f'raw_sketch/{ts}.jpg')
        return ai_sketch_url, raw_sketch_url

    def upload_image_to_s3(self, image_file, file_name):
        """
        Upload an image file to S3 and return the file URL.
        :param image_file: File object to be uploaded.
        :return: URL of the uploaded file or None if upload fails.
        """
        try:
            self.s3.upload_fileobj(image_file, self.bucket_name, file_name)
            return f"https://{self.bucket_name}.s3.amazonaws.com/{file_name}"
        except NoCredentialsError:
            print("Credentials not available")
            return None

    def upload_image_to_s3_from_image(self, image, file_name):
        """
        Upload an image (PIL Image object) directly to S3.
        """
        img_byte_arr = BytesIO()
        image.save(img_byte_arr, format='JPEG')
        img_byte_arr = BytesIO(img_byte_arr.getvalue())  # Reset stream position
        return self.upload_file_to_s3(img_byte_arr, file_name)

    def get_s3_url(self, file_name):
        """
        Generates a URL for a file stored in the S3 bucket.
        """
        return f"https://{self.bucket_name}.s3.amazonaws.com/{file_name}"

    def get_s3_urls(self, folder_name):
        """
        List all URLs from a specific folder in an S3 bucket.

        :param bucket_name: Name of the S3 bucket
        :param folder_name: Name of the folder (prefix) you want to list the objects from
        :return: List of URLs
        """

        paginator = self.s3.get_paginator('list_objects_v2')

        # Ensure folder name ends with a slash
        if not folder_name.endswith('/'):
            folder_name += '/'

        urls = []

        # List objects within a specified folder
        for page in paginator.paginate(Bucket=self.bucket_name, Prefix=folder_name):
            if "Contents" in page:
                for obj in page['Contents']:
                    object_url = f"https://{self.bucket_name}.s3.amazonaws.com/{obj['Key']}"
                    urls.append(object_url)

        return urls
