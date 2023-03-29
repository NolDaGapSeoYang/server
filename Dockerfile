FROM node:16

COPY . /api
WORKDIR /api

RUN yarn

EXPOSE 3000

CMD yarn start