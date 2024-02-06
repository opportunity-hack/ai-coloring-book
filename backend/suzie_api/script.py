
import os
import replicate
import smtplib, ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv

message = MIMEMultipart()
message['From'] = os.getenv("ADMIN_EMAIL")
message['To'] = os.getenv("RECEIVER_EMAIL")
message['Subject'] = "We have a Sponsor!"

book_list = ["book1", "book2"]
sponsor_name = "google"
donation_amount = 10
load_dotenv()


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
<h3>Donation Acknowledgement</h3>

<p>Hello,</p>

<p>We have received a generous donation from our esteemed sponsor, <strong>{sponsor_name}</strong>. This contribution will be directed towards supporting the following books:</p>

<p>{books_formatted.replace('new-line', "<br>")}</p>

<p><strong>Total Donation Amount:</strong> ${donation_amount}</p>
</body>
</html>
"""
message.attach(MIMEText(email_body, 'html'))

# Sending the email
try:
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(os.getenv("SMTP_SERVER"), int(os.getenv("SMTP_PORT")), context=context) as server:
        server.login(os.getenv("ADMIN_EMAIL"), os.getenv("ADMIN_EMAIL_PASSWORD"))
        server.sendmail(os.getenv("ADMIN_EMAIL"), os.getenv("RECEIVER_EMAIL"), message.as_string())
        print("Email successfully sent!")
except Exception as e:
    print(f"Failed to send email. Error: {e}")