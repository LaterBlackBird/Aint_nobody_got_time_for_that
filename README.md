# Aint Nobody Got Time For That

A meal planning app with functionality in mind.  The goal is to have a simple and intuitive
layout that offers easy maniuplation of a weekly meal plan.  Meal planning can take a long time,
so Aint Nobody Got Time For That aims to make this as quick of a process as possible.


## Demo

https://angtft-sh.herokuapp.com/

## Screenshots

### Landing Page
![App Screenshot](https://res.cloudinary.com/dd1ndszow/image/upload/v1643235037/Aint%20Nobody%20Got%20Time%20For%20That/landing_page_hzdqaq.png)


### Login/Signup/and General Form Design
![App Screenshot](https://res.cloudinary.com/dd1ndszow/image/upload/v1643235037/Aint%20Nobody%20Got%20Time%20For%20That/login_and_general_form_design_wdh41a.png)

### Homepage & Daily Schedule Workspace
![App Screenshot](https://res.cloudinary.com/dd1ndszow/image/upload/v1643235037/Aint%20Nobody%20Got%20Time%20For%20That/homepage_layout_v565of.png)
## Deployment

1. Clone this repository (only this branch)

   ```bash
   git clone git@github.com:LaterBlackBird/Aint_nobody_got_time_for_that.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```


## Deploy to Heroku

1. Before you deploy, don't forget to run the following command in order to
ensure that your production environment has all of your up-to-date
dependencies. You only have to run this command when you have installed new
Python packages since your last deployment, but if you aren't sure, it won't
hurt to run it again.

   ```bash
   pipenv lock -r > requirements.txt
   ```

2. Create a new project on Heroku
3. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
4. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
5. Run

   ```bash
   heroku login
   ```

6. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

7. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://angtft-sh.herokuapp.com/"
8. Push your docker container to heroku from the root directory of your project.
   (If you are using an M1 mac, follow [these steps below](#for-m1-mac-users) instead, then continue on to step 9.)
   This will build the Dockerfile and push the image to your heroku container registry.

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

9. Release your docker container to heroku

      ```bash
      heroku container:release web -a {NAME_OF_HEROKU_APP}
      ```

10. set up your database

      ```bash
      heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
      heroku run -a {NAME_OF_HEROKU_APP} flask seed all
      ```

11. Under Settings find "Config Vars" and add any additional/secret .env variables.


### For M1 Mac users

(Replaces **Step 8**)

1. Build image with linux platform for heroku servers. Replace
{NAME_OF_HEROKU_APP} with your own tag:

   ```bash=
   docker buildx build --platform linux/amd64 -t {NAME_OF_HEROKU_APP} .
   ```

2. Tag your app with the url for your apps registry. Make sure to use the name
of your Heroku app in the url and tag name:

   ```bash=2
   docker tag {NAME_OF_HEROKU_APP} registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```

3. Use docker to push the image to the Heroku container registry:

   ```bash=3
   docker push registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```

## Tech Stack

**Client:** JavaScript, NodeJS, React, Redux

**Server:** PostgreSQL, Python, Flask, SQLAlchemy


## Roadmap

- Drag & Drop of recipe cards
  - within the same daily schedule & across separate schedules
- Implement recipe CRUD
- Integrate nutrition statistics
- Auto-generate meal plan
