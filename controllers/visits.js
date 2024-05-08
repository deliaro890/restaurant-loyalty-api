// controllers/VisitController.js

export class VisitController {
    constructor({ Visit }) {
      this.Visit = Visit;
    }
  
    create = async (req, res) => {
      try {
        const { cliente, restaurante, puntos, fecha } = req.body;
        const nuevaVisita = new this.Visit({ cliente, restaurante, puntos, fecha });
        await nuevaVisita.save();
        res.status(201).json(nuevaVisita);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  
    getAll = async (req, res) => {
      try {
        const visits = await this.Visit.find();
        res.json(visits);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  
    getById = async (req, res) => {
      try {
        const visit = await this.Visit.findById(req.params.id);
        if (!visit) {
          return res.status(404).json({ message: 'Visita no encontrada' });
        }
        res.json(visit);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  
    update = async (req, res) => {
      try {
        const { cliente, restaurante, puntos, fecha } = req.body;
        const visit = await this.Visit.findById(req.params.id);
        if (!visit) {
          return res.status(404).json({ message: 'Visita no encontrada' });
        }
        visit.cliente = cliente;
        visit.restaurante = restaurante;
        visit.puntos = puntos;
        visit.fecha = fecha;
        await visit.save();
        res.json(visit);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  
    delete = async (req, res) => {
      try {
        const visit = await this.Visit.findByIdAndDelete(req.params.id);
        if (!visit) {
          return res.status(404).json({ message: 'Visita no encontrada' });
        }
        res.json({ message: 'Visita eliminada' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

  }
  
  