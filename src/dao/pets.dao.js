import petModel from '../models/Pet.js';

class PetsDao {

  async getAll() {
    try {
      return await petModel.find({});
    } catch (error) {
      throw new Error(`Error al obtener pets: ${error.message}`);
    }
  }

  // Obtener por ID
  async getById(id) {
    try {
      return await petModel.findById(id);
    } catch (error) {
      throw new Error(`Error al obtener pet: ${error.message}`);
    }
  }

  // Creacion
  async create(petData) {
    try {
      return await petModel.create(petData);
    } catch (error) {
      throw new Error(`Error al crear pet: ${error.message}`);
    }
  }

  // Crear múltiples pets
  async createMany(petsData) {
    try {
      return await petModel.insertMany(petsData);
    } catch (error) {
      throw new Error(`Error al crear pet: ${error.message}`);
    }
  }

  // Actualizacion
  async update(id, petData) {
    try {
      return await petModel.findByIdAndUpdate(id, petData, { new: true });
    } catch (error) {
      throw new Error(`Error al actualizar pet: ${error.message}`);
    }
  }

  // Eliminar
  async delete(id) {
    try {
      return await petModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error al eliminar pet: ${error.message}`);
    }
  }
}

export default new PetsDao();