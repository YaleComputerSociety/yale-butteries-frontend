FROM node:16.14

# Base package requirements, won't automatically update
RUN apt-get update -qq && apt-get install -y postgresql-client

# put all of our backend code into the app folder, and make that our default folder
RUN mkdir /app
WORKDIR /app

# install all packages with yarn. We copy only these two files to utilize Docker's caching mechanism
COPY package.json .
COPY yarn.lock .
RUN yarn

# Similar caching purpose, this time with prisma files
COPY prisma/schema.prisma ./prisma/
RUN yarn prisma generate

# Finally we copy everything else over. Because of docker caching, the build will start from here every time any file changes
# as long as that file is not in prisma (relates to the database) or relates to yarn packages
COPY . .

# start up the container. We override this step in the docker compose file, so you'll likely never use it
CMD [ "yarn", "start" ]