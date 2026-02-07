# AdoptMe - Backend III

Proyecto final del módulo Backend III de CoderHouse. Sistema de adopción de mascotas con API REST completa.

## Descripción

AdoptMe es una aplicación backend que permite gestionar usuarios, mascotas y adopciones. Incluye funcionalidades de generación de datos mock para pruebas y está completamente dockerizada.

## Tecnologías utilizadas

- Node.js v18
- Express.js
- MongoDB Atlas (Base de datos en la nube)
- JWT para autenticación
- Bcrypt para encriptación de contraseñas
- Swagger para documentación API
- Mocha y Chai para testing
- Faker.js para generación de datos mock
- Docker para containerización

## Instalación y Ejecución

### Opción 1: Ejecución Local

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar el proyecto:
```bash
npm start
```

El servidor estará disponible en: http://localhost:8080

### Opción 2: Con Docker (Recomendado)

1. Construir la imagen:
```bash
docker build -t adoptme-backend .
```

2. Ejecutar el contenedor:
```bash
docker run -p 8080:8080 adoptme-backend
```

El servidor estará disponible en: http://localhost:8080

## Imagen Docker Hub

La imagen de este proyecto está disponible en Docker Hub:

**[TU_USUARIO]/adoptme-backend:latest**

Para descargar y ejecutar:
```bash
docker pull [TU_USUARIO]/adoptme-backend:latest
docker run -p 8080:8080 [TU_USUARIO]/adoptme-backend:latest
```

## Endpoints principales

### API Base
- `GET /` - Información de la API y endpoints disponibles

### Sessions (Autenticación)
- `POST /api/sessions/register` - Registrar nuevo usuario
- `POST /api/sessions/login` - Iniciar sesión

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

### Mocks (Datos de Prueba)
- `GET /api/mocks/mockingpets` - Generar 100 mascotas mock
- `GET /api/mocks/mockingusers` - Generar 50 usuarios mock
- `POST /api/mocks/generateData` - Generar e insertar datos en BD

#### Ejemplo de uso del endpoint generateData:

```bash
curl -X POST http://localhost:8080/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{"users": 10, "pets": 20}'
```

## Documentación API con Swagger

Accede a la documentación completa en: http://localhost:8080/api-docs

## Testing

**IMPORTANTE:** El servidor debe estar corriendo antes de ejecutar los tests.

1. En una terminal, iniciar el servidor:
```bash
npm start
```

2. En otra terminal, ejecutar los tests:
```bash
npm test
```

## Características Implementadas

### Consigna 1 - Mocks Router ✓
- Router `/api/mocks` con endpoints para generación de datos
- Módulo de mocking para usuarios con contraseña encriptada "coder123"
- Generación de usuarios con roles aleatorios (user/admin)
- Endpoint para insertar datos masivos en la base de datos

### Consigna 2 - Documentación, Tests y Docker ✓
- Documentación Swagger completa del módulo Users
- Tests funcionales para todos los endpoints de adoption.router.js
- Dockerfile funcional para crear imagen del proyecto
- Imagen subida a Docker Hub
- README.md con instrucciones completas

## Estructura del proyecto

```
adoptme/
├── src/
│   ├── controllers/
│   ├── dao/
│   ├── docs/
│   │   └── users.swagger.js
│   ├── dto/
│   ├── repository/
│   ├── routes/
│   │   └── mocks.router.js
│   ├── services/
│   ├── utils/
│   ├── app.js
│   ├── generateMockData.js
│   └── swagger.config.js
├── test/
│   └── adoption.test.js
├── Dockerfile
├── .dockerignore
├── package.json
└── README.md
```

## Variables de Entorno

El proyecto está configurado para usar MongoDB Atlas (base de datos en la nube).
La URL de conexión ya está incluida en el código.

Si necesitas cambiarla, puedes crear un archivo `.env`:

```
MONGO_URL=tu_url_de_mongodb
PORT=8080
```

## Guía Docker

Para instrucciones detalladas de Docker, consulta: `DOCKER-GUIA.md`

Resumen rápido:
```bash
# Construir imagen
docker build -t adoptme-backend .

# Ejecutar contenedor
docker run -p 8080:8080 adoptme-backend

# Subir a Docker Hub
docker login
docker tag adoptme-backend TU_USUARIO/adoptme-backend:latest
docker push TU_USUARIO/adoptme-backend:latest
```

## Autor

Proyecto desarrollado para CoderHouse - Full Stack Developer
Curso: Backend III

## Licencia

ISC