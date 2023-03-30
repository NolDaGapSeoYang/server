FROM node:16

COPY . /api
WORKDIR /api

RUN yarn && yarn build

EXPOSE 3000

CMD yarn start:prod