FROM node:16.3.0

RUN mkdir /app
WORKDIR /app

RUN apt-get update -qq && apt-get install -y postgresql-client

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY prisma ./prisma
RUN yarn prisma generate

COPY . .

CMD [ "yarn", "start" ]