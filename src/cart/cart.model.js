//Modelo del carrito de compras
import { Schema, model } from 'mongoose'

const cartSchema = Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']            
        },
        products: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }],
        total: {
            type: Number
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        versionKey: false, //Deshabilitar el __v(Versión del documento)
        timestamps: true //Agrega propiedades de fecha (Fecha de creación y de ultima actualización)
    }
)

export default model('Cart', cartSchema)