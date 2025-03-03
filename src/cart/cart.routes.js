import { Router } from 'express'
import { addProducts, createCart } from './cart.controller.js'

const api = Router()

api.post('/', createCart)
api.put('/addProducts/:id', addProducts)
export default api