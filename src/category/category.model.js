import { Schema, model } from 'mongoose'

const categorySchema = Schema(
    {
        name: {
            type: String,
            maxLength: [35, `Can't be overcome 35 characters`],
            required: [true, 'Category name is required']
        },
        description: {
            type: String,
            maxLength: [100, `Can't be overcome 100 characters`],
            required: [true, 'Description is required']
        }
    },
    {
        versionKey: false, //Deshabilitar el __v(Versión del documento)
        timestamps: true //Agrega propiedades de fecha (Fecha de creación y de ultima actualización)
    }
)

export default model ('Category', categorySchema)