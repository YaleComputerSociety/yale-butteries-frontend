FROM node:16.14

RUN apt-get update -qq && apt-get install -y postgresql-client

RUN mkdir /app
WORKDIR /app


COPY package.json .
COPY yarn.lock .
RUN yarn

COPY prisma/schema.prisma ./prisma/
RUN yarn prisma generate

COPY . .

CMD [ "yarn", "start" ]