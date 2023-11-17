# Yale Butteries Backend

This is where all the api endpoints are defined and run, and also where the database is. You'll need this running in order to interact with the database use Stripe funcionality on the frontend

## Requirements

- Docker (Docker Desktop is preferred, but Docker Engine will work)
- If you don't see an `.env.local` file in this directory, contact the team lead. The file stores passwords and various other sensitive information, so it's not on GitHub.

## Setup

- Set up the database with `docker compose run backend bash -c "yarn initialize"`. It might take a few minutes if this is your first time
  - If you're asked to name a migration, name it anything
- If everything worked, you should see **"Your database is now in sync with your schema"** and **"The seed command has been executed"**
- Run the backend with `docker compose up backend`. You should see the message **"Deployed on port 3000"**
- To test it, type `http://localhost:3000/api/colleges` into the url search bar in a browser. You should see a bunch of text

## Usage

- Run `docker compose up backend` to get the backend and database up and running
- Run `docker exec -it yalebutteries bash` while the containers are running to enter into the backend container, or `docker compose run backend bash` to create a container and enter it
- To run the containers with a specific command, type `docker compose run backend bash -c "{name-of-command}"`. Example: `docker compose run backend bash -c "yarn initialize"`
  - `yarn start` runs the backend. This is basically identical to `docker compose up backend`
  - `yarn migrate` runs database migrations, for when `prisma/schema.prisma` is altered. You'll need to rebuild the image with `docker compose build` before you can run the container again
  - `yarn seed` seeds the database with the values in `prisma/seed.ts`
  - `yarn initialize` combines migrate and seed
  
- If you change the dependencies or database schema, you must rebuild the image with `docker compose build` before you run the container again

## Heroku Deployment

_Currently the backend is hosted on Heroku, under my account (addison.goolsbee@yale.edu) becuase we were having some difficulties with the ycs account, so for now, I (Addison) will need to sort out deployment_

The production code runs on a heroku instance, not Docker. Similar to Docker, there are two components: the code portion of the backend, and the Postgres database.

#### Setting up Heroku

- Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- Login to the yale butteries account with `heroku login`. TBD how we will share these...
- The Heroku git URL is `https://git.heroku.com/yale-butteries.git`. Add this to your git remote with `git remote add heroku https://git.heroku.com/yale-butteries.git`

#### Configuration

- Under the settings menu, in the config vars section, there are two variables that matter: `STRIPE_SECRET_KEY` and `POSTGRES_URL_FULL`. This is the Heroku equivalent of our `env.local`
- In order for the stripe payments to be working, you'll need to input `STRIPE_SECRET_KEY` as a config variable. It should be in `env.local`, or you can regenerate it in the Stripe dashboard
- In order to connect to the database, you'll need to get the Heroku-generated URL
  - Go to Resources -> Heroku Postgres -> Settings -> Database Credentials (view) and copy the URI value into the value for `POSTGRES_URL_FULL`

#### Updating the Production Backend

- You'll need to have finished **Setting up Heroku** for this part
- Type `git push heroku` from the branch you want to upload (hopefully master!)
- Heroku should try to redeploy automatically from here, you can see the logs with the command `heroku logs -t -n 1000`
- You can also see the status through the Heroku dashboard

## Database (NEEDS TO BE REWRITTEN)

To login to the database, be inside the Docker container and run `$DATABASE`, which is an evnironment variable defined in the .`env.local` file. If you don't have a `.env.local`, contact the team lead. This is sensitive information, so we need to keep it secure and off of GitHub.

Once inside the database, type `\d` to list all database tables

type `\q` to quit

You can directly use SQL queries to view/manipulate data. Just type your SQL query (SQL keywords are in all-caps, names must be in double quotes and are case-sensitive), and make sure to end your query with a semicolon, for example `SELECT * FROM "College";`

### Useful SQL Queries

```
SELECT * FROM "TransactionItem" ORDER BY id DESC LIMIT 10;
SELECT id, order_complete, in_progress, total_price, "collegeId", "userId", charged_price, payment_intent_id FROM "TransactionHistory" ORDER BY id DESC LIMIT 3;
UPDATE "TransactionItem" SET order_status = 'FINISHED' WHERE id=?;
SELECT id, is_active, item, price, "collegeId" FROM "MenuItem";
UPDATE "MenuItem" SET is_active = false WHERE id=1;
```

## Prisma

Prisma is the ORM between the PostgreSQL database and the backend

- The database tables are defined in `schema.prisma`. If you change this file, you'll need to run migrations
- The default values for the database (the seed) are defined in `seed.ts`

If commands like `yarn seed` aren't working, you'll need to manually configure Prisma:

- Run `docker compose run app bash` to enter the backend container
- Make sure Prisma is installed in the container: `yarn prisma --version`. If not, run `yarn add prisma`
- To run migrations, type `yarn prisma migrate dev`
- To seed the database, type `yarn prisma db seed`
- To reset the database, type `yarn prisma migrate reset`

### TODO readme

- Rewrite database section
- Deploying to heroku in development and in production
- Everything in src/
- Technologies used in the project
