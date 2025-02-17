import { Router } from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from './product.controller.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
import { saveProductValidator } from '../../middlewares/validators.js'

const api = Router()

api.post('/', [ validateJwt, isAdmin, saveProductValidator ] , createProduct)
api.get('/', getProducts)
api.get('/:id', getProductById)
api.put('/:id', [ validateJwt, isAdmin ] , updateProduct)
api.delete("/:id", [ validateJwt, isAdmin ] , deleteProduct)

export default api