FROM node:alpine3.10 AS prod

WORKDIR /api

COPY package.json .

RUN npm install

COPY . .

ENV NODE_ENV=production

RUN npm run build

CMD ["sh", "-c", "npm run start:prod"]