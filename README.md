# Setting up frontend 
## Local setup
Make sure Node.js and npm are installed with the following versions:
- Node.js: v21.1.0
- npm: 10.2.0

1. Go into frontend directory
```
cd frontend/nextapp
```

2. Install dependencies:
```
npm install
```

3. Run the development server:
```
npm run dev
```

4. Check the code on localhost:3000.

5. Test locally like this would be deployed in prod
```
npm run build
npm start
```

## Deploy on fly.io

1. Install required packages:
```
fly deploy
```
=
# Setting up backend 
The normal thing to do is setup MiniConda/Anaconda for local development

## Local setup
Make sure Python is installed with the following versions:
- Python: v3.10.1


1. Go into backend directory
```
cd backend/suzie_api
```

2. Install dependencies:
```
pip install -r requirements.txt
```

3. Run the migrations:
```
python manage.py migrate
```

4. Create a user 
```
python manage.py createsuperuser
```

5. Run server:
```
python manage.py runserver
```

6. check the server running on localhost:8000/api

## Deploy on fly.io

```
flyctl deploy
```