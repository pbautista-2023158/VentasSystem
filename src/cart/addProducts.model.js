//Modelo de añadir producto
import { Schema, model } from 'mongoose'

const addProductsSchema = Schema(
    {
        cart: {
            type: Schema.Types.ObjectId,
            ref: 'Cart',
            required: [true, 'Cart is required']
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product is required']
        }
    }
)

export default model('addProducts', addProductsSchema)