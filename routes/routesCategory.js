import { Router } from 'express'

import categoryController from '../controllers/category.controller'

const router = Router()

const {
  addCategory,
  listCategories,
  getCategoryById,
  updateCategory,
  removeCategory,
} = categoryController

router.post('/category', addCategory)

router.get('/category', listCategories)

router.get('/category/:id', getCategoryById)

router.put('/category/:id', updateCategory)

router.delete('/category/:id', removeCategory)

export default router
