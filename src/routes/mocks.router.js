import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mockingUtils.js';
import usersDao from '../dao/users.dao.js';
import petsDao from '../dao/pets.dao.js';

const router = Router();


router.get('/mockingpets', (req, res) => {
  try {
    const pets = generateMockPets(100);
    res.status(200).json({ status: 'success', payload: pets });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/mockingusers', (req, res) => {
  try {
    const users = generateMockUsers(50);
    res.status(200).json({ status: 'success', payload: users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.post('/generateData', async (req, res) => {
  try {
    const { users, pets } = req.body;

    // Validación
    if (!users || !pets || users <= 0 || pets <= 0) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Los parámetros users y pets deben ser números mayores a 0' 
      });
    }

    // Generar usuarios y pets
    const generatedUsers = generateMockUsers(Number(users));
    const generatedPets = generateMockPets(Number(pets));

    // Insertar en la DB
    const insertedUsers = await usersDao.createMany(generatedUsers);
    const insertedPets = await petsDao.createMany(generatedPets);

    res.status(201).json({ 
      status: 'success', 
      message: 'Datos generados e insertados correctamente',
      payload: {
        usersInserted: insertedUsers.length,
        petsInserted: insertedPets.length
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;