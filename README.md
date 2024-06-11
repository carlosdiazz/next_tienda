# Descripcion
Curso de NEXT con Fernando Herrera


## Correr en dev
1. Clonar el repositorio
2. Instalar dependencias ```npm install```
3. Crear una copia del archivo ```.env.template``` y renombrarlo a  ```.en``` y cambair los valores
4. Levantar la base de datos ```docker-compose up -d```
5. Correr las misgraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed```
7. Correr en desarrollo ```npm run dev```


## Instalacion


# Generar tsconfig:
```npx tsc --init      ```