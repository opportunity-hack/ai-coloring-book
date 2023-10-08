import uuid

import boto3
import os

from dotenv import load_dotenv
load_dotenv()


class S3:
    def __init__(self):
        self.s3 = boto3.client('s3',
                               aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
                               aws_secret_access_key=os.getenv("AWS_ACCESS_SECRET"))

    def upload(self, file_path, file_name):
        # Upload the PDF file to S3
        try:
            s3_key = f'pdf_uploads/{file_name}.pdf'
            self.s3.upload_file(file_path, os.getenv("AWS_BUCKET"), s3_key)
            print(f"""Uploaded {file_name} to {os.getenv("AWS_BUCKET")} {s3_key} successfully.""")
            return f'https://{os.getenv("AWS_BUCKET")}.s3.amazonaws.com/{s3_key}'
        except Exception as e:
            print(f"""Error uploading {file_name} to {os.getenv("AWS_BUCKET")}: {str(e)}""")
