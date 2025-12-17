import { Router } from 'express';
import petsDao from '../dao/pets.dao.js';

const router = Router();

// GET 
router.get('/', async (req, res) => {
  try {
    const pets = await petsDao.getAll();
    res.status(200).json({ status: 'success', payload: pets });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const pet = await petsDao.getById(req.params.pid);
    if (!pet) {
      return res.status(404).json({ status: 'error', message: 'Pet no encontrada' });
    }
    res.status(200).json({ status: 'success', payload: pet });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// POST
router.post('/', async (req, res) => {
  try {
    const newPet = await petsDao.create(req.body);
    res.status(201).json({ status: 'success', payload: newPet });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// PUT
router.put('/:pid', async (req, res) => {
  try {
    const updatedPet = await petsDao.update(req.params.pid, req.body);
    if (!updatedPet) {
      return res.status(404).json({ status: 'error', message: 'Pet no encontrada' });
    }
    res.status(200).json({ status: 'success', payload: updatedPet });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// DELETE
router.delete('/:pid', async (req, res) => {
  try {
    const deletedPet = await petsDao.delete(req.params.pid);
    if (!deletedPet) {
      return res.status(404).json({ status: 'error', message: 'Pet no encontrada' });
    }
    res.status(200).json({ status: 'success', message: 'Pet eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;