
import { Router } from 'express'
import { VisitController } from '../controllers/visits.js'

export const createVisitRouter = ({ Visit }) => {
  const visitsRouter = Router()
  const visitController = new VisitController({ Visit })

  visitsRouter.get('/', visitController.getAll)
  visitsRouter.post('/', visitController.create)

  visitsRouter.get('/:id', visitController.getById)
  visitsRouter.delete('/:id', visitController.delete)
  visitsRouter.patch('/:id', visitController.update)

  return visitsRouter
}
