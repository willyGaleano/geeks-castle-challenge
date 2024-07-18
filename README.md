# GEEKS CASTLE CHALLENGE

## Instalación y ejecución ⚙️

### Functions

- Crear archivo .env usando .env.template

  ```bash
  #FIREBASE
  FIREBASE_PROJECT_ID="geeks-castle-dev-challenge"
  FIREBASE_PRIVATE_KEY="" 
  FIREBASE_CLIENT_EMAIL=""
  FIREBASE_DATABASE_URL="http://localhost:5010"
  ```

- Instalar dependencias y levantar proyecto

  ```bash
  #cd service-gcp/functions
  npm i
  
  #cd service-gcp
  firebase emulators:start
  ```

  ![firestore](/docs/images/firestore.png)

  ![functions](/docs/images/functions.png)
  
### Microservice

- Crear archivo .env usando .env.template

  ```bash
  #COMMON
  ENVIRONMENT=LOCAL
  NODE_ENV=development
  LOG_LEVEL=debug
  APP_NAME=ms-geeks-castle-bs
  HTTP_PORT=3001

  #FIREBASE
  FIREBASE_PROJECT_ID="geeks-castle-dev-challenge"
  FIREBASE_PRIVATE_KEY=""
  FIREBASE_CLIENT_EMAIL=""
  FIREBASE_DATABASE_URL="http://localhost:5010"
  ```

- Instalar dependencias y levantar proyecto

  ```bash
  #cd ms-geeks-castle-bs
  npm i
  npm install -g pino-pretty
  npm run start:dev | pino-pretty  
  ```

- [Ir a la documentación en Swagger](http://localhost:3001/geeks-castle-dev-challenge/v1/api-docs)

  ![swagger](/docs/images/swagger.png)

## Construido con 🛠️

- Nestjs
- Nodejs v18.20.4
- Typescript
- Fastify
- Firestore
- Cloud Functions
- Firebase

### Autor ✒️

- Williams David Galeano Gomez, <willyrhcp96@gmail.com>
