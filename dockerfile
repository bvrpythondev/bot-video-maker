FROM node:latest
LABEL maintainer="Tauan Matos"

WORKDIR /usr/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
ENTRYPOINT yarn start