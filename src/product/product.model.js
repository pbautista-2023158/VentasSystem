import { Schema, model } from 'mongoose'

const productSchema = Schema(
    {
        name: {
            type: String,
            maxLength: [35, `Can't be overcome 35 characters`],
            required: [true, 'Product name is required']
        },
        description: {
            type: String,
            maxLength: [100, `Can't be overcome 100 characters`],
            required: [true, 'Description is required']
        },  
        price: {
            type: Number,
            required: [true, 'Price is required']
        },
        stock: {
            type: Number,
            required: [true, 'Stock is required']
        },
        category:{
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
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

export default model ('Product', productSchema)