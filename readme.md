## Helpful Commands

```docker-compose up app```: run the backend

```docker-compose run app bash```: open up your terminal inside the Docker container

Once you are inside the Docker container, you can use Prisma to edit the database, and you can open the database to query it directly. type ```exit``` to quit

### ts-node not found
This means you'll need to run prisma migrations:

```docker-copmose run app bash```

```yarn prisma migrate dev``` 

If you get "command prisma not found, run ```yarn add prisma``` followed by the previous command

Then, exit the docker container with ```exit``` 

### Prisma

To use Prisma, you must be inside of the docker container. Run ```docker-copmose run app bash```

```yarn prisma migrate dev```: run prisma migrations. This will set everything up the first time you use it, and you use it again whenever you make a change to the prisma schema

```yarn prisma migrate reset```: clear all entries in the database and run migrations again

```yarn prisma db seed```: if you added any non-conflicting seed entries, this will add them to the database


### Database

To login to the database, be inside the Docker container and run the command listed in ```.env.local```. It is the value that comes after ```COMMAND=``` If you don't have a ```.env.local```, contact the team lead. This is sensitive information, so we need to keep it secure and off of GitHub. The terminal will ask for the password, this is also in the ```.env.local``` file by ```DATABASE_PASSWORD```

Once inside the database, type ```\d``` to list all database tables

type ```\q``` to quit

You can directly use SQL queries to view/manipulate data. Just type your SQL query (SQL keywords are in all-caps, names are in double quotes and case-sensitive), and make sure to end your query with a semicolon


### Helpful SQL Queries
SELECT * FROM "TransactionItem" ORDER BY id DESC LIMIT 10;
UPDATE "TransactionItem" SET order_status = 'FINISHED' WHERE id=?;
SELECT id, is_active, item, price, "collegeId" FROM "MenuItem";
