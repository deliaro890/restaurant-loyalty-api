// models/Restaurante.js

import mongoose from 'mongoose';


export const Restaurante = mongoose.model('Restaurante', new mongoose.Schema({
    nombre: { type: String, required: true }, 
    activo: { type: Boolean, default: true } 
}))


