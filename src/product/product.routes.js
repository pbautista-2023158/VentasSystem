//Rutas de productos
import { Router } from 'express'
import { 
    createProduct, 
    deleteProduct, 
    getProductById, 
    getProductByName, 
    getProducts, 
    updateProduct } 
from './product.controller.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
import { saveProductValidator } from '../../middlewares/validators.js'

const api = Router()

api.post('/', [validateJwt, isAdmin, saveProductValidator], createProduct)
api.get('/', validateJwt, getProducts)
api.get('/:id', validateJwt, getProductById)
api.put('/:id', [validateJwt, isAdmin], updateProduct)
api.delete("/:id", [validateJwt, isAdmin], deleteProduct)
api.get('/product_name/:name', getProductByName)

export default api