import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AdoptMe API',
            version: '1.0.0',
            description: 'API REST para sistema de adopción de mascotas - Backend III CoderHouse',
            contact: {
                name: 'API Support'
            }
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Servidor de desarrollo'
            }
        ],
        tags: [
            {
                name: 'Users',
                description: 'Operaciones relacionadas con usuarios'
            },
            {
                name: 'Pets',
                description: 'Operaciones relacionadas con mascotas'
            },
            {
                name: 'Adoptions',
                description: 'Operaciones relacionadas con adopciones'
            }
        ]
    },
    apis: ['./src/docs/*.js']
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

export const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customCss: '.swagger-ui .topbar { display: none }'
    }))
    console.log('📚 Documentación Swagger disponible en http://localhost:8080/api-docs')
}