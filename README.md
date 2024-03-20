# Aplicación Node.js con Docker

Esta es una aplicación Node.js que se ejecuta en un contenedor Docker, junto con un contenedor de PostgreSQL como base de datos. La aplicación se levanta utilizando Docker Compose.

## Requisitos Previos

Antes de comenzar, asegúrate de tener Docker y Docker Compose instalados en tu sistema. Consulta la documentación oficial para obtener instrucciones de instalación:

- [Instalar Docker](https://docs.docker.com/get-docker/)
- [Instalar Docker Compose](https://docs.docker.com/compose/install/)

## Configuración Inicial

Primero, clona este repositorio y navega al directorio del proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>

## Levantar la Aplicación con Docker Compose

docker compose up

# Es necesario acceder al contenedor y crear la Tabla duties por primera vez.

docker exec -it <NOMBRE_DEL_CONTENEDOR_DE_POSTGRES> /bin/bash

psql -U userdev -d dutydb -c "CREATE TABLE duties (id SERIAL PRIMARY KEY, name VARCHAR(255));"

