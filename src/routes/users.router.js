import { Router } from 'express';
import usersDao from '../dao/users.dao.js';

const router = Router();

// GET
router.get('/', async (req, res) => {
  try {
    const users = await usersDao.getAll();
    res.status(200).json({ status: 'success', payload: users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/:uid', async (req, res) => {
  try {
    const user = await usersDao.getById(req.params.uid);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    }
    res.status(200).json({ status: 'success', payload: user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// POST 
router.post('/', async (req, res) => {
  try {
    const newUser = await usersDao.create(req.body);
    res.status(201).json({ status: 'success', payload: newUser });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// PUT
router.put('/:uid', async (req, res) => {
  try {
    const updatedUser = await usersDao.update(req.params.uid, req.body);
    if (!updatedUser) {
      return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    }
    res.status(200).json({ status: 'success', payload: updatedUser });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// DELETE
router.delete('/:uid', async (req, res) => {
  try {
    const deletedUser = await usersDao.delete(req.params.uid);
    if (!deletedUser) {
      return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    }
    res.status(200).json({ status: 'success', message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;