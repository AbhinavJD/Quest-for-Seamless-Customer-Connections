FROM node:18-alpine as build_image
WORKDIR /usr/src/quest_ceadar/client


COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
