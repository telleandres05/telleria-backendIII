# AdoptMe - Sistema de Adopción de Mascotas

Proyecto final del módulo Backend III

## Descripción

API REST para gestionar adopciones de mascotas. Permite administrar usuarios, mascotas y procesos de adopción, incluyendo generación de datos de prueba y documentación completa con Swagger.

## Tecnologías

- Node.js v18
- Express.js
- MongoDB Atlas
- JWT
- Bcrypt
- Swagger
- Mocha/Chai
- Faker.js
- Docker

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm start
```

El servidor estará disponible en: http://localhost:8080

## Testing

```bash
# Terminal 1: Iniciar servidor
npm start

# Terminal 2: Ejecutar tests
npm test
```

## Endpoints

### Mocks (Datos de Prueba)
- `GET /api/mocks/mockingpets` - Genera 100 mascotas
- `GET /api/mocks/mockingusers` - Genera 50 usuarios
- `POST /api/mocks/generateData` - Inserta datos en BD

Ejemplo:
```bash
curl -X POST http://localhost:8080/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{"users": 10, "pets": 20}'
```

### Users
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:uid` - Obtener usuario por ID
- `PUT /api/users/:uid` - Actualizar usuario
- `DELETE /api/users/:uid` - Eliminar usuario

### Pets
- `GET /api/pets` - Obtener todas las mascotas
- `POST /api/pets` - Crear mascota
- `PUT /api/pets/:pid` - Actualizar mascota
- `DELETE /api/pets/:pid` - Eliminar mascota

### Adoptions
- `GET /api/adoptions` - Obtener todas las adopciones
- `GET /api/adoptions/:aid` - Obtener adopción por ID
- `POST /api/adoptions/:uid/:pid` - Crear adopción

### Sessions
- `POST /api/sessions/register` - Registrar usuario
- `POST /api/sessions/login` - Iniciar sesión

## Documentación Swagger

Accede a la documentación completa en:

http://localhost:8080/api-docs

## Docker

### Imagen en Docker Hub

**https://hub.docker.com/r/telle05/adoptme-backend**

### Ejecutar con Docker

```bash
# Descargar imagen
docker pull telle05/adoptme-backend:latest

# Ejecutar contenedor
docker run -p 8080:8080 telle05/adoptme-backend:latest
```

Accede a: http://localhost:8080

## Estructura del Proyecto

```
adoptme/
├── src/
│   ├── controllers/
│   ├── dao/
│   ├── docs/
│   ├── dto/
│   ├── repository/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   ├── generateMockData.js
│   └── swagger.config.js
├── test/
│   └── adoption.test.js
├── Dockerfile
├── .dockerignore
└── package.json
```

## Características Implementadas

- Endpoint para generar mascotas mock
- Endpoint para generar usuarios mock con contraseña "coder123" encriptada
- Endpoint para insertar datos masivos en BD
- Tests funcionales completos para adoption router
- Documentación Swagger del módulo Users
- Dockerfile funcional
- Imagen publicada en Docker Hub

## Autor

Andres Telleria

## Licencia

ISC