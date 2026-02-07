# AdoptMe - Backend III

Proyecto final del módulo Backend III de CoderHouse. Sistema de adopción de mascotas con API REST completa, documentación Swagger, tests funcionales y dockerización.

## 📋 Descripción

AdoptMe es una aplicación backend que permite gestionar usuarios, mascotas y adopciones. Incluye funcionalidades de generación de datos mock para pruebas y está completamente dockerizada.

## 🚀 Tecnologías utilizadas

- **Node.js 18+** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **Bcrypt** - Encriptación de contraseñas
- **Swagger** - Documentación de API
- **Mocha + Chai** - Testing
- **Supertest** - Tests de integración
- **Faker.js** - Generación de datos mock
- **Docker** - Containerización

## 📦 Instalación

### Requisitos previos

- Node.js (versión 18 o superior)
- MongoDB (versión 6 o superior)
- Docker (opcional, para ejecución en contenedor)
- npm o yarn

### Instalación local

1. **Clonar el repositorio**

2. **Instalar dependencias:**

```bash
npm install
```

3. **Crear archivo `.env` en la raíz del proyecto:**

```env
MONGO_URL=mongodb://localhost:27017/adoptme
PORT=8080
NODE_ENV=development
```

4. **Ejecutar MongoDB** (asegúrate de tenerlo corriendo)

5. **Ejecutar el proyecto:**

```bash
# Modo producción
npm start

# Modo desarrollo (con nodemon)
npm run dev
```

## 🐳 Docker

### Imagen en Docker Hub

**Link de la imagen:** https://hub.docker.com/r/[TU_USUARIO]/adoptme-backend

> **Nota:** Reemplaza `[TU_USUARIO]` con tu usuario real de Docker Hub

### Ejecutar con Docker

**Opción 1: Pull y run de la imagen**

```bash
docker pull [TU_USUARIO]/adoptme-backend
docker run -p 8080:8080 -e MONGO_URL=mongodb://host.docker.internal:27017/adoptme [TU_USUARIO]/adoptme-backend
```

**Opción 2: Construir localmente**

```bash
# Construir la imagen
docker build -t adoptme-backend .

# Ejecutar el contenedor
docker run -p 8080:8080 -e MONGO_URL=mongodb://host.docker.internal:27017/adoptme adoptme-backend
```

### Subir imagen a Docker Hub

```bash
# Login en Docker Hub
docker login

# Etiquetar la imagen
docker tag adoptme-backend [TU_USUARIO]/adoptme-backend:latest

# Subir la imagen
docker push [TU_USUARIO]/adoptme-backend:latest
```

## 📚 Endpoints de la API

### 👤 Users

- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:uid` - Obtener usuario por ID
- `PUT /api/users/:uid` - Actualizar usuario
- `DELETE /api/users/:uid` - Eliminar usuario

### 🐕 Pets

- `GET /api/pets` - Obtener todas las mascotas
- `POST /api/pets` - Crear mascota
- `PUT /api/pets/:pid` - Actualizar mascota
- `DELETE /api/pets/:pid` - Eliminar mascota

### 🤝 Adoptions

- `GET /api/adoptions` - Obtener todas las adopciones
- `GET /api/adoptions/:aid` - Obtener adopción por ID
- `POST /api/adoptions/:uid/:pid` - Crear adopción

### 🔐 Sessions

- `POST /api/sessions/register` - Registrar usuario
- `POST /api/sessions/login` - Iniciar sesión
- `GET /api/sessions/current` - Usuario actual

### 🎭 Mocks (Nuevos endpoints)

- `GET /api/mocks/mockingpets` - Generar 100 mascotas mock
- `GET /api/mocks/mockingusers` - Generar 50 usuarios mock
- `POST /api/mocks/generateData` - Generar e insertar datos en BD

**Ejemplo de uso del endpoint generateData:**

```bash
curl -X POST http://localhost:8080/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{"users": 10, "pets": 20}'
```

## 🧪 Testing

El proyecto incluye tests funcionales completos para el módulo de adopciones.

**Ejecutar todos los tests:**

```bash
npm test
```

**Características de los tests:**

- Tests del router de adopciones (adoption.test.js)
- Tests generales de la aplicación (supertest.test.js)
- Cobertura de casos de éxito y error
- Validación de respuestas HTTP
- Manejo de errores 404 y 400

## 📖 Documentación API (Swagger)

La documentación interactiva de la API está disponible en:

```
http://localhost:8080/api-docs
```

### Características de la documentación:

- Documentación completa del módulo Users
- Esquemas de datos
- Ejemplos de request y response
- Códigos de estado HTTP
- Interfaz interactiva para probar endpoints

## 📁 Estructura del proyecto

```
adoptme-backend/
├── src/
│   ├── controllers/
│   │   ├── adoptions.controller.js
│   │   ├── pets.controller.js
│   │   ├── sessions.controller.js
│   │   └── users.controller.js
│   ├── dao/
│   │   ├── models/
│   │   │   ├── Adoption.js
│   │   │   ├── Pet.js
│   │   │   └── User.js
│   │   ├── Adoption.js
│   │   ├── Pets.dao.js
│   │   └── Users.dao.js
│   ├── docs/
│   │   └── users.swagger.js
│   ├── dto/
│   │   ├── Pet.dto.js
│   │   └── User.dto.js
│   ├── repository/
│   │   ├── AdoptionRepository.js
│   │   ├── GenericRepository.js
│   │   ├── PetRepository.js
│   │   └── UserRepository.js
│   ├── routes/
│   │   ├── adoption.router.js
│   │   ├── mocks.router.js
│   │   ├── pets.router.js
│   │   ├── sessions.router.js
│   │   └── users.router.js
│   ├── services/
│   │   └── index.js
│   ├── utils/
│   │   ├── index.js
│   │   └── uploader.js
│   ├── app.js
│   ├── generateMockData.js
│   └── swagger.config.js
├── test/
│   ├── adoption.test.js
│   └── supertest.test.js
├── public/
│   └── img/
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

## ✨ Características implementadas

### Consigna 1: Router Mocks
- ✅ Router mocks.router.js en /api/mocks
- ✅ Endpoint /mockingpets migrado
- ✅ Módulo de generación de usuarios mock
- ✅ Endpoint /mockingusers (50 usuarios)
- ✅ Endpoint /generateData para insertar en BD
- ✅ Contraseña "coder123" encriptada
- ✅ Roles aleatorios (user/admin)
- ✅ Arrays de pets vacíos

### Consigna 2: Documentación, Tests y Docker
- ✅ Documentación Swagger completa para Users
- ✅ Tests funcionales para todos los endpoints de adoptions
- ✅ Dockerfile optimizado
- ✅ Imagen subida a Docker Hub
- ✅ README.md con link a Docker Hub

## 🔧 Configuración adicional

### Variables de entorno

```env
# Base de datos
MONGO_URL=mongodb://localhost:27017/adoptme

# Puerto del servidor
PORT=8080

# Entorno
NODE_ENV=development
```

### MongoDB con Docker Compose (opcional)

Si deseas ejecutar MongoDB también en Docker:

```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
  
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - MONGO_URL=mongodb://mongodb:27017/adoptme
    depends_on:
      - mongodb

volumes:
  mongodb_data:
```

## 🐛 Troubleshooting

### Error de conexión a MongoDB

Si obtienes error de conexión, verifica que:
- MongoDB esté corriendo
- La URL de conexión en `.env` sea correcta
- El puerto 27017 esté disponible

### Tests fallan

Asegúrate de que:
- MongoDB esté corriendo
- El servidor esté apagado antes de ejecutar tests
- No haya problemas de puertos

### Docker no conecta a MongoDB

Usa `host.docker.internal` en lugar de `localhost` para la URL de MongoDB:

```bash
docker run -p 8080:8080 -e MONGO_URL=mongodb://host.docker.internal:27017/adoptme adoptme-backend
```

## 👨‍💻 Autor

Proyecto desarrollado para **CoderHouse** - Full Stack Developer
Módulo: Backend III

## 📄 Licencia

ISC

## 🙏 Agradecimientos

- CoderHouse por la formación
- Comunidad de desarrolladores

---

**¿Preguntas o problemas?** Abre un issue en el repositorio.