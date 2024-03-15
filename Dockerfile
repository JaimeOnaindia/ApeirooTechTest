FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "src/app.js"]
