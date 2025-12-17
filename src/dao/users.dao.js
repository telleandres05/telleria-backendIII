import userModel from '../models/User.js';

class UsersDao {

  async getAll() {
    try {
      return await userModel.find({});
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
  }

  // Obtener por ID
  async getById(id) {
    try {
      return await userModel.findById(id);
    } catch (error) {
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }
  }

  // Creacion
  async create(userData) {
    try {
      return await userModel.create(userData);
    } catch (error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }

  // Crear varios users
  async createMany(usersData) {
    try {
      return await userModel.insertMany(usersData);
    } catch (error) {
      throw new Error(`Error al crear usuarios: ${error.message}`);
    }
  }

  // Actualizar un usuario
  async update(id, userData) {
    try {
      return await userModel.findByIdAndUpdate(id, userData, { new: true });
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }

  // Eliminar un usuario
  async delete(id) {
    try {
      return await userModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
  }
}

export default new UsersDao();