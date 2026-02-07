import supertest from 'supertest'
import chai from 'chai'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing general de la aplicación AdoptMe', () => {
    
    describe('Test de Users', () => {
        
        it('El endpoint GET /api/users debe devolver un array de usuarios', async () => {
            const { statusCode, body } = await requester.get('/api/users')
            
            expect(statusCode).to.equal(200)
            expect(body.payload).to.be.an('array')
        })
    })

    describe('Test de Pets', () => {
        
        it('El endpoint GET /api/pets debe devolver un array de mascotas', async () => {
            const { statusCode, body } = await requester.get('/api/pets')
            
            expect(statusCode).to.equal(200)
            expect(body.payload).to.be.an('array')
        })

        it('El endpoint POST /api/pets debe crear una mascota', async () => {
            const petMock = {
                name: 'TestPet',
                specie: 'dog',
                birthDate: '2020-01-01'
            }

            const { statusCode, body } = await requester.post('/api/pets').send(petMock)
            
            expect(statusCode).to.equal(200)
            expect(body.payload).to.have.property('_id')
        })
    })

    describe('Test de Adoptions', () => {
        
        it('El endpoint GET /api/adoptions debe devolver un array', async () => {
            const { statusCode, body } = await requester.get('/api/adoptions')
            
            expect(statusCode).to.equal(200)
            expect(body.payload).to.be.an('array')
        })
    })
})