FROM node:8.4.0-alpine

ENV NODE_PORT=4000

# Install yarn
RUN echo -e 'http://dl-cdn.alpinelinux.org/alpine/edge/main\nhttp://dl-cdn.alpinelinux.org/alpine/edge/community\nhttp://dl-cdn.alpinelinux.org/alpine/edge/testing' > /etc/apk/repositories && \
    apk add --no-cache yarn

# Use serve for static file serving
RUN yarn global add serve

RUN mkdir -p /tmp
WORKDIR /tmp

# Install dependencies
COPY package.json /tmp/package.json
COPY yarn.lock /tmp/yarn.lock
RUN yarn install --production

# Build
RUN mkdir -p /app
COPY ./ /tmp/
RUN yarn build && \
    cp -a build/. /app && \
    rm -rf /tmp

CMD serve -s /app -p ${NODE_PORT}
EXPOSE ${NODE_PORT}