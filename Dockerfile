FROM node:16.3.0

# Install dependencies
RUN apt-get update -qq && apt-get install -y postgresql-client

RUN mkdir /app
WORKDIR /app

RUN yarn

EXPOSE 3000