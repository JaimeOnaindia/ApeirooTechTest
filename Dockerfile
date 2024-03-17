FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

ENTRYPOINT ["node", "dist/server.js"]
