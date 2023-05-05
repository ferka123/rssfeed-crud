FROM node:alpine3.10 AS prod

ARG API_HOST

WORKDIR /client

COPY package.json .

RUN npm install

COPY . .

ENV VITE_API_HOST ${API_HOST}

RUN npm run build

CMD ["sh", "-c", "npm run start:prod"]