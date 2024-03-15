# Utilizar la imagen oficial de Node.js como imagen base
FROM node:16

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de dependencias y instalarlas
COPY package*.json ./
RUN npm install

# Copiar todos los archivos de la aplicación
COPY . .

# Exponer el puerto que utiliza la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
# CMD ["node", "src/app.js"]
