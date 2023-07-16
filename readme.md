# Yale Butteries Backend

This is where all the api endpoints are defined and run, and also where the database is. You'll need this running in order to interact with the database use Stripe funcionality on the frontend

## Setup

- First, make sure you have Docker installed on your machine (Docker desktop is preferred, but Docker engine will work)
- If you don't see an `.env.local` file in this directory, contact the team lead. The file stores passwords and various other sensitive information, so it's not on GitHub. You'll need it to setup/connect to the database and use Stripe functionality
- Run `command=initialize docker compose up backend`. It might take a few minutes, but it won't be slow next time
- If everything worked, you should see the message `Deployed on port 3000`
- To make sure it's working, type `http://localhost:3000/api/colleges` into the url search bar in a browser. You should see a bunch of text

## Usage

- Run `docker compose up backend` to get the backend and database up and running. You will get a warning about the command variable, but ignore it
- Run `docker exec -it yalebutteries bash` while the containers are running to enter into the backend container, or `docker compose run backend bash` to create a container and enter it
- If you look in `package.json`, at the scripts, you'll see there are a number of ways to start the backend
  - `yarn start` runs the backend. This is the default option if you don't specify a command
  - `yarn migrate` runs database migrations for when you change `prisma/schema.prisma`, and then runs the backend
  - `yarn seed` seeds the database with the values in `prisma/seed.ts`, and then runs the backend
  - `yarn initialize` combines migrate and seed
- To run the containers with a specific command, specify the command with`command={command-name} docker compose up backend`
  - For example, `command=seed docker compose up backend`

## Database (NEEDS TO BE REWRITTEN)

To login to the database, be inside the Docker container and run `$COMMAND`, which is an evnironment variable defined in the .`env.local` file. If you don't have a `.env.local`, contact the team lead. This is sensitive information, so we need to keep it secure and off of GitHub.

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

### TODO

- Rewrite database section
- Deploying to heroku in development and in production
- Everything in src/
- Technologies used in the project
