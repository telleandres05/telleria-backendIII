import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import usersRouter from './routes/users.router.js'
import petsRouter from './routes/pets.router.js'
import adoptionsRouter from './routes/adoption.router.js'
import sessionsRouter from './routes/sessions.router.js'
import mocksRouter from './routes/mocks.router.js'

import { setupSwagger } from './swagger.config.js'

const app = express()
const PORT = process.env.PORT || 8080
const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://andrestelleria579_db_user:N6ej3lsONxQbYs8D@cluster0.8loyvnz.mongodb.net/?appName=Cluster0'

console.log('Conectando a MongoDB...')

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('✓ Conectado a MongoDB exitosamente')
    })
    .catch((error) => {
        console.error('✗ Error al conectar a MongoDB:', error.message)
        process.exit(1)
    })

app.use(express.json())
app.use(cookieParser())

app.use('/api/users', usersRouter)
app.use('/api/pets', petsRouter)
app.use('/api/adoptions', adoptionsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/mocks', mocksRouter)

setupSwagger(app)

app.get('/', (req, res) => {
    res.send({
        status: 'success',
        message: 'AdoptMe API está funcionando',
        endpoints: {
            swagger: '/api-docs',
            users: '/api/users',
            pets: '/api/pets',
            adoptions: '/api/adoptions',
            mocks: '/api/mocks'
        }
    })
})

app.listen(PORT, () => {
    console.log(`✓ Servidor corriendo en puerto ${PORT}`)
    console.log(`✓ Swagger disponible en http://localhost:${PORT}/api-docs`)
})