FROM node:16

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

ENV BOT_USERNAME=codingtomato
ENV OAUTH_TOKEN=
ENV TWITCH_CLIENT_ID=
ENV TWITCH_SECRET=
ENV API_OAUTH_TOKEN=

CMD [ "npm", "start" ]