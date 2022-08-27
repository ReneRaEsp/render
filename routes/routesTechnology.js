import { Router } from 'express'

import technologyController from '../controllers/technology.controller'
import AuthMiddleware from '../middlewares/auth.middlewares'

const router = Router()

const { auth } = AuthMiddleware

const {
  addTechnology,
  listTechnologies,
  getTechnologyById,
  updateTechnology,
  removeTechnology,
} = technologyController

router.post('/tech', addTechnology)

router.get('/tech', listTechnologies)

router.get('/tech/:id', getTechnologyById)

router.put('/tech/:id', updateTechnology)

router.delete('/tech/:id', removeTechnology)

export default router
