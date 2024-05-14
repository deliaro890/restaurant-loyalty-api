
import express, { json } from 'express'
import { createVisitRouter } from './routes/visits.js'
import { createRestauranteRouter } from './routes/restaurantes.js'
import { corsMiddleware } from './middlewares/cors.js'
import mongoose from 'mongoose'

export const createApp = ({ Visit, Restaurante }) => { 
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/visits', createVisitRouter({ Visit }))
  app.use('/restaurantes', createRestauranteRouter({ Restaurante }))




// Conexión a MongoDB
mongoose.connect('mongodb://del:password@monguito:27017/registro_puntos?authSource=admin')
  .then(() => console.log('Conexión exitosa a MongoDB!!'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));
  
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
