# Setting up frontend 

## Local setup

Make sure Node.js and npm are installed with the following versions:
- Node.js: v21.1.0
- npm: 10.2.0

1. Clone the repository:
git clone https://github.com/2023-opportunity-hack/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack.git

2. Install dependencies:
```
npm install
```

3. Run the development server:
```
npm run dev
```

4. Check the code on localhost:3000.

## Deploy on instance

1. Install required packages:

```
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install build-essential -y
sudo apt install nginx -y
```


2. install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts


3. Clone repo
git clone https://github.com/2023-opportunity-hack/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack.git


4. Navigate to the nextapp folder:
cd nextapp
npm install
npm run build


5. setup nginx
```
sudo vim /etc/nginx/sites-available/demo
```

```
server {
    listen 80; # Listen on port 80 for incoming connections

    server_name <SERVER IP>;

    location / {
        proxy_pass http://127.0.0.1:3000; # Forward traffic to port 3000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```
sudo ln -s /etc/nginx/sites-available/demo /etc/nginx/sites-enabled/
```
```
sudo nginx -t
```
```
sudo service nginx restart
```

6. run npm service in the background
```
npm i -g pm2 && pm2 start npm --name "deploy nextjs" -- start
pm2 ls
```

#### Note - Incase of issues with in memory during npm install, flush out memory
```
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap  /swapfile
swapon /swapfile
swapon  --show
free -h
```


------------------------------------------------------------------------------------------


# Setting up backend 

## Local setup

Make sure Python is installed with the following versions:
- Python: v3.10.1

1. Clone the repository:
git clone https://github.com/2023-opportunity-hack/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack.git

2. Install dependencies:
```
pip install -r requirements.txt
```

3. Run the migrations:
```
python manage.py migrate
```

4. Run server:
```
python manage.py runserver
```

5. check the server running on localhost:8000


## Deploy on instance

1. Install required packages:

```
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install build-essential -y
sudo apt install nginx -y
```


2. install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts


3. Clone repo
git clone https://github.com/2023-opportunity-hack/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack.git

4. setup nginx
```
sudo vim /etc/nginx/sites-available/demo
```

```
server {
    listen 80; # Listen on port 80 for incoming connections

    server_name <SERVER IP>;

    location / {
        proxy_pass http://127.0.0.1:8000; # Forward traffic to port 3000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```
sudo ln -s /etc/nginx/sites-available/demo /etc/nginx/sites-enabled/
```
```
sudo nginx -t
```
```
sudo service nginx restart
```

5. run gunicorn service in the background
<!-- /home/ubuntu/.local/bin/gunicorn -->
```
gunicorn --workers 1 --bind 0.0.0.0:8000 suzie_api.wsgi:application&
```
<!-- list gunicorn process -->
```
ps ax|grep gunicorn
```
<!-- kill gunicorn process -->
```
pkill gunicorn
```

#### Note - follow this to run gunicorn in background
https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-22-04#creating-systemd-socket-and-service-files-for-gunicorn