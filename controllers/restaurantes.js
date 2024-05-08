// controllers/RestauranteController.js
import mongoose from 'mongoose';

export class RestauranteController {
  constructor({ Restaurante }) {
    this.Restaurante = Restaurante
  }

  // Crear un nuevo restaurante
  create = async (req, res) => {
    try {
      const { nombre, activo } = req.body;
      const nuevoRestaurante = new this.Restaurante({ nombre, activo });
      await nuevoRestaurante.save();
      res.status(201).json(nuevoRestaurante);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Obtener todos los restaurantes
  getAll = async (req, res) => {
    try {
      const restaurantes = await this.Restaurante.find();
      res.json(restaurantes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Obtener un restaurante por su ID
  getById = async (req, res) => {
    try {
      const restaurante = await this.Restaurante.findById(req.params.id);
      if (!restaurante) {
        return res.status(404).json({ message: 'Restaurante no encontrado' });
      }
      res.json(restaurante);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Actualizar un restaurante
  update = async (req, res) => {
    try {
      const { nombre, activo } = req.body;
      const restaurante = await this.Restaurante.findById(req.params.id);
      if (!restaurante) {
        return res.status(404).json({ message: 'Restaurante no encontrado' });
      }
      restaurante.nombre = nombre;
      restaurante.activo = activo;
      await restaurante.save();
      res.json(restaurante);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Eliminar un restaurante

  delete = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'ID de restaurante no válido' });
        }
      const restaurante = await this.Restaurante.findByIdAndDelete(req.params.id);
      if (!restaurante) {
        return res.status(404).json({ message: 'Restaurante no encontrado' });
      }
      res.json({ message: 'Restaurante eliminado' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
}

