FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY node_modules ./node_modules
COPY . .

RUN npm run build

COPY .next ./.next

CMD ["node", "server.js"]