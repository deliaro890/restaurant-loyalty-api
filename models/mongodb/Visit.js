// models/Visit.js

import  mongoose from 'mongoose'

export const Visit = mongoose.model('Visit',new mongoose.Schema({
  cliente: { type: String, required: true }, // Nombre del cliente
  restaurante: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurante', required: true }, // Referencia al restaurante
  puntos: { type: Number, default: 0 }, // Puntos acumulados por el cliente en el restaurante, en esa visita
  fecha: { type: Date, default: Date.now } // Fecha de la visita
  })
)



