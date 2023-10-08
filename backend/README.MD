# Instructions

- Clone Repo
  git clone `git@github.com:teaglebuilt/Django-Boilerplate.git`

- cd into `backend/suzie_api`

- Create virtual environment
  `virtualenv {name of env}`

- Activate virtual environment
  `source {name of env}/bin/activate`

- Install requirements for boilerplate
  `pip install -r requirements.txt`

- Create folder "static_in_env" at the same level as manage.py

- Run python manage.py runserver
- 
# Walkthrough
- Options to create AI generated drawings using stable diffusion API, a raw image is passed to the DrawingsViewSet which will convert the raw image into a nicer looking coloring book ready image.
- Option to do CRUD with sponsors and non-profits using SponsorViewSet and NonProfitViewset
- Option to create book using the colorings of the kids using BookViewSet, will introduce options to do payments in the future
- Settings modules configured for development/production ready
- A list of commands for project configuration
- Keeps Keys and other sensitive information hidden in production in .env

## Note
Some of the APIs requires and S3 access id and secret, you should have that ready

