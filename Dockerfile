FROM node:latest

WORKDIR /chat

COPY package*.json .

RUN npm install

COPY . .

CMD ["node", "index.js"]
