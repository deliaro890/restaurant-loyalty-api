
import { Router } from 'express'
import { RestauranteController } from '../controllers/restaurantes.js'

export const createRestauranteRouter = ({ Restaurante }) => {
  const restaurantesRouter = Router()
  const restauranteController = new RestauranteController({ Restaurante })

  restaurantesRouter.get('/', restauranteController.getAll)
  restaurantesRouter.post('/', restauranteController.create)

  restaurantesRouter.get('/:id', restauranteController.getById)
  restaurantesRouter.delete('/:id', restauranteController.delete)
  restaurantesRouter.patch('/:id', restauranteController.update)

  return restaurantesRouter
}
