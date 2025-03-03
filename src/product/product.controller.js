//Controlador de producto
'use strict'

import Category from '../category/category.model.js'
import Product from './product.model.js'

//Crear un producto
export const createProduct = async(req, res) => {
    try{
        let data = req.body
        let category = await Category.findOne(
            {
                _id: data.category
            }
        )

        if(!category) return res.status(403).send(
            {
                success: false,
                message: 'Category id not found'
            }
        )

        let product = new Product(data)
        await product.save()
        return res.send(
            {
                success: true,
                message: `${product.name} saved successfully`
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding product',
                err
            }
        )
    }
}

//Obtener todos los productos
export const getProducts = async(req, res) => {
    try{
        let { limit = 10, skip = 0 } = req.query
        let products = await Product.find()
            .populate(
                {
                    path: 'category',
                    select: 'name -_id'
                }
            )
            .skip(skip)
            .limit(limit)
        
            if(!products) {
                return res.status(404).send(
                    {
                        success: false,
                        message: 'Products not found'
                    }
                )
            }
            return res.send(
                {
                    success: true,
                    message: 'Products found:',
                    total: products.length,
                    products
                }
            )         
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when found products',
                err
            }
        )
    }
}

//Obtener un producto por Id
export const getProductById = async(req, res) => {
    try{
        let product = await Product.findById(req.params.id)
            .populate(
                {
                    path: 'category',
                    select: 'name -_id'
                }
            )

            if(!product){
                return res.status(404).send(
                    {
                        success: false,
                        message: 'Product not found'
                    }
                )
            }
            return res.send(
                {
                    success: true,
                    message: 'Product found:',
                    total: product.length,
                    product
                }
            )              
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when found product',
                err
            }
        )
    }
}

//Actualizar un producto
export const updateProduct = async(req, res) =>{
    try{
        let { id } = req.params
        let data = req.body
        let updateProduct = await Product.findByIdAndUpdate(
            id, 
            data, 
            {new: true}
        )      

        if(!updateProduct) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Product not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Product updated',
                updateProduct
            }
        )           
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when update product',
                err
            }
        )
    }
}

//Eliminar un producto 
export const deleteProduct = async(req, res) => {
    try{
        let { id } = req.params
        let deleteProduct = await Product.findByIdAndDelete(id)
        if(!deleteProduct) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Product not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Product deleted',
                deleteProduct
            }
        )  
    }catch (err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when delete product',
                err
            }
        )
    }
}

export const productByPopularity = async(req, res) => {
    try{
        
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when found categories',
                err
            }
        )
    }
}

export const getProductByName = async(req, res) => {
    try{
        let { name, limit = 10, skip = 0 } = req.params
        let product = await Product.find({name: {$regex: name, $options: 'i'}})
        .skip(skip)
        .limit(limit)      
        
        if(!product){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Product not found'
                }
            )         
        }
        return res.send(
            {
                success: true,
                message: 'Product found',
                similar_results: product.length,
                product
            }
        )        
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when found product',
                err
            }
        )
    }
}

