FROM node:16.3.0

# Install dependencies
RUN apt-get update -qq && apt-get install -y postgresql-client
RUN npm install -g yarn

RUN mkdir /app
WORKDIR /app

EXPOSE 3000
