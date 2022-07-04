FROM node:16.15.0-buster


WORKDIR /home/node

COPY package*.json ./

RUN chown -R node:node ./package*.json

USER node

RUN npm install

CMD tail -f /dev/null
