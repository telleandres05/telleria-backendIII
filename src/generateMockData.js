import { faker } from '@faker-js/faker'
import { createHash } from './utils/index.js'

export const generateMockUsers = async (num) => {
    const users = []
    
    for (let i = 0; i < num; i++) {
        const hashedPassword = await createHash('coder123')
        const role = faker.helpers.arrayElement(['user', 'admin'])
        
        const user = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: role,
            pets: []
        }
        
        users.push(user)
    }
    
    return users
}

export const generateMockPets = (num) => {
    const pets = []
    const species = ['dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish']
    
    for (let i = 0; i < num; i++) {
        const pet = {
            name: faker.animal.petName(),
            specie: faker.helpers.arrayElement(species),
            birthDate: faker.date.past({ years: 5 }),
            adopted: false,
            image: faker.image.url()
        }
        
        pets.push(pet)
    }
    
    return pets
}