Make sure Python is installed with the following versions:
- Python: v3.10.1

0. If on Mac: 
```
brew install postgresql
Uninstall psycopg2: pip uninstall psycopg2
Re-install psycopg2: pip install psycopg2-binary

# Start Postgres server and connect
psql postgres
CREATE ROLE <username> WITH LOGIN PASSWORD '<password>';
CREATE DATABASE suziev3;
GRANT ALL PRIVILEGES ON DATABASE suziev3 TO <username>;

Update .env with these details
```

# .env should have these settings
```
DB_DATABASE=
DB_USER=
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432

SECRET_KEY=

ADMIN_EMAIL=
RECEIVER_EMAIL=

SMTP_SERVER=smtp.gmail.com
SMTP_PORT=465
REPLICATE_TOKEN=

RESEND_EMAIL_KEY=

# AWS
AWS_BUCKET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-2
```