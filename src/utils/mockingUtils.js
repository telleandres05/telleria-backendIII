import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

// Generar usuarios mock
export const generateMockUsers = (num) => {
  const users = [];
  
  for (let i = 0; i < num; i++) {
    const user = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('coder123', 10),
      role: faker.helpers.arrayElement(['user', 'admin']),
      pets: []
    };
    users.push(user);
  }
  
  return users;
};

// Generar pets mock
export const generateMockPets = (num) => {
  const pets = [];
  const species = ['dog', 'cat', 'bird', 'rabbit', 'hamster'];
  
  for (let i = 0; i < num; i++) {
    const pet = {
      name: faker.animal.petName(),
      specie: faker.helpers.arrayElement(species),
      birthDate: faker.date.past({ years: 10 }),
      adopted: false,
      owner: null
    };
    pets.push(pet);
  }
  
  return pets;
};