FROM mhart/alpine-node:8.7

ENV NODE_PORT=4000

RUN mkdir -p /app

WORKDIR /app
COPY build/ /app/
COPY server/ /app/

RUN yarn install

EXPOSE ${NODE_PORT}
CMD yarn start
