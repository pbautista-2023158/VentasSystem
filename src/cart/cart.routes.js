//Rutas del carrito de compras
import { Router } from 'express'
import { addProductsInCart, createCart } from './cart.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/', validateJwt, createCart)
api.post('/addProducts', validateJwt, addProductsInCart)

export default api