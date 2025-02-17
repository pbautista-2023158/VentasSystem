import { Router } from 'express'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from './category.controller.js'
import { saveCategoryValidator, updateCategoryValidator } from '../../middlewares/validators.js'

const api = Router()

api.post('/', [ validateJwt, isAdmin, saveCategoryValidator ], createCategory)
api.get('/', getCategories)
api.get('/:id', getCategoryById)
api.put('/:id', [ validateJwt, isAdmin, updateCategoryValidator ], updateCategory)
api.delete('/:id', [ validateJwt, isAdmin ], deleteCategory)

export default api
