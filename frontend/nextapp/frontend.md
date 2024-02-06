node --version = v21.1.0
npm --version = 10.2.0

npx create-next-app@latest


<!-- ec2 ubuntu - setup -->
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install build-essential -y
sudo apt install nginx -y

install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts

setup github
git config --global user.name "dashk11"
git config --global user.email "dashbuis@gmail.com"
git config --global credential.helper 'cache --timeout=3600'
git clone https://github.com/dashk11/sketches-to-smiles.git

go to the frontend folder
npm install
npm run build

<!-- go back 2 directories to root and setup nginx -->
sudo vim /etc/nginx/sites-available/demo
server {
    listen 80; # Listen on port 80 for incoming connections

    server_name 18.217.206.80; # Replace with your domain name or leave blank if not using a domain

    location / {
        proxy_pass http://127.0.0.1:3000; # Forward traffic to port 3000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
sudo ln -s /etc/nginx/sites-available/demo /etc/nginx/sites-enabled/
sudo nginx -t
sudo service nginx restart
sudo systemctl restart nginx

cd sketches-to-smiles/frontend/nextapp

npm i -g pm2 && pm2 start npm --name "deploy nextjs" -- start
pm2 ls

<!-- /home/ubuntu/.local/bin/gunicorn -->
gunicorn --workers 1 --bind 0.0.0.0:8000 suzie_api.wsgi:application&
<!-- list gunicorn process -->
ps ax|grep gunicorn
<!-- kill gunicorn process -->
pkill gunicorn

<!-- restart pm2 -->
pm2 kill

<!-- clear swap -->
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap  /swapfile
swapon /swapfile
swapon  --show
free -h


<!-- ===================================== -->

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
