FROM alpine:3.16

ENV HOME /home/app
ENV NODE_ENV production

RUN addgroup node \
    && adduser node -u 1000 -D -S -G node -h $HOME \
    && apk add --update --no-cache nodejs npm \
    && npm install -g pm2

WORKDIR $HOME
