import supertest from 'supertest'
import chai from 'chai'
import mongoose from 'mongoose'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing Adoptions Router', () => {
    let testUserId
    let testPetId
    let testAdoptionId

    before(async function() {
        this.timeout(10000)
        await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/adoptme')
    })

    after(async function() {
        this.timeout(10000)
        if (testUserId) {
            await requester.delete(`/api/users/${testUserId}`)
        }
        if (testPetId) {
            await requester.delete(`/api/pets/${testPetId}`)
        }
        await mongoose.connection.close()
    })

    describe('POST /api/adoptions/:uid/:pid - Crear adopción', () => {
        
        beforeEach(async function() {
            this.timeout(10000)
            
            const userMock = {
                first_name: 'TestAdoption',
                last_name: 'User',
                email: `adoption${Date.now()}@test.com`,
                password: 'test123'
            }

            const userResponse = await requester
                .post('/api/sessions/register')
                .send(userMock)

            testUserId = userResponse.body.payload

            const petMock = {
                name: 'TestPet',
                specie: 'dog',
                birthDate: '2020-01-01'
            }

            const petResponse = await requester
                .post('/api/pets')
                .send(petMock)

            testPetId = petResponse.body.payload._id
        })

        it('Debe crear una adopción exitosamente', async function() {
            this.timeout(10000)
            
            const { statusCode, body } = await requester
                .post(`/api/adoptions/${testUserId}/${testPetId}`)

            expect(statusCode).to.equal(200)
            expect(body.status).to.equal('success')
            expect(body.message).to.equal('Pet adopted')
        })

        it('Debe retornar error 404 si el usuario no existe', async function() {
            this.timeout(10000)
            
            const fakeUserId = new mongoose.Types.ObjectId()
            const { statusCode, body } = await requester
                .post(`/api/adoptions/${fakeUserId}/${testPetId}`)

            expect(statusCode).to.equal(404)
            expect(body.status).to.equal('error')
            expect(body.error).to.equal('user Not found')
        })

        it('Debe retornar error 404 si la mascota no existe', async function() {
            this.timeout(10000)
            
            const fakePetId = new mongoose.Types.ObjectId()
            const { statusCode, body } = await requester
                .post(`/api/adoptions/${testUserId}/${fakePetId}`)

            expect(statusCode).to.equal(404)
            expect(body.status).to.equal('error')
            expect(body.error).to.equal('Pet not found')
        })

        it('Debe retornar error 400 si la mascota ya está adoptada', async function() {
            this.timeout(10000)
            
            await requester.post(`/api/adoptions/${testUserId}/${testPetId}`)
            
            const { statusCode, body } = await requester
                .post(`/api/adoptions/${testUserId}/${testPetId}`)

            expect(statusCode).to.equal(400)
            expect(body.status).to.equal('error')
            expect(body.error).to.equal('Pet is already adopted')
        })
    })

    describe('GET /api/adoptions - Obtener todas las adopciones', () => {
        
        it('Debe obtener un array de adopciones', async function() {
            this.timeout(10000)
            
            const { statusCode, body } = await requester.get('/api/adoptions')

            expect(statusCode).to.equal(200)
            expect(body.status).to.equal('success')
            expect(body.payload).to.be.an('array')
            
            if (body.payload.length > 0) {
                testAdoptionId = body.payload[0]._id
            }
        })

        it('Debe retornar un objeto con status y payload', async function() {
            this.timeout(10000)
            
            const { body } = await requester.get('/api/adoptions')

            expect(body).to.have.property('status')
            expect(body).to.have.property('payload')
        })
    })

    describe('GET /api/adoptions/:aid - Obtener adopción por ID', () => {
        
        before(async function() {
            this.timeout(10000)
            
            const adoptionsResponse = await requester.get('/api/adoptions')
            if (adoptionsResponse.body.payload.length > 0) {
                testAdoptionId = adoptionsResponse.body.payload[0]._id
            }
        })

        it('Debe obtener una adopción específica por ID', async function() {
            this.timeout(10000)
            
            if (!testAdoptionId) {
                this.skip()
            }

            const { statusCode, body } = await requester
                .get(`/api/adoptions/${testAdoptionId}`)

            expect(statusCode).to.equal(200)
            expect(body.status).to.equal('success')
            expect(body.payload).to.be.an('object')
            expect(body.payload).to.have.property('_id')
        })

        it('Debe retornar error 404 si la adopción no existe', async function() {
            this.timeout(10000)
            
            const fakeAdoptionId = new mongoose.Types.ObjectId()
            const { statusCode, body } = await requester
                .get(`/api/adoptions/${fakeAdoptionId}`)

            expect(statusCode).to.equal(404)
            expect(body.status).to.equal('error')
            expect(body.error).to.equal('Adoption not found')
        })

        it('Debe validar que el ID sea un ObjectId válido', async function() {
            this.timeout(10000)
            
            const invalidId = '12345'
            const { statusCode } = await requester
                .get(`/api/adoptions/${invalidId}`)

            expect(statusCode).to.be.oneOf([404, 500])
        })
    })
})