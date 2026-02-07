import { Router } from 'express'
import { generateMockPets, generateMockUsers } from '../generateMockData.js'
import { usersService, petsService } from '../services/index.js'

const router = Router()

router.get('/mockingpets', (req, res) => {
    try {
        const pets = generateMockPets(100)
        res.send({ status: 'success', payload: pets })
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message })
    }
})

router.get('/mockingusers', async (req, res) => {
    try {
        const users = await generateMockUsers(50)
        res.send({ status: 'success', payload: users })
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message })
    }
})

router.post('/generateData', async (req, res) => {
    try {
        const { users, pets } = req.body
        
        if (!users || !pets) {
            return res.status(400).send({ 
                status: 'error', 
                error: 'Debe proporcionar los parámetros users y pets' 
            })
        }
        
        const usersArray = await generateMockUsers(Number(users))
        const petsArray = generateMockPets(Number(pets))
        
        const insertedUsers = await Promise.all(
            usersArray.map(user => usersService.create(user))
        )
        
        const insertedPets = await Promise.all(
            petsArray.map(pet => petsService.create(pet))
        )
        
        res.send({ 
            status: 'success', 
            message: `${insertedUsers.length} usuarios y ${insertedPets.length} mascotas insertados exitosamente`,
            payload: {
                users: insertedUsers.length,
                pets: insertedPets.length
            }
        })
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message })
    }
})

export default router