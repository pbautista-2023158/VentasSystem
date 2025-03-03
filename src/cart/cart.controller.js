//Controlador de carrito de compras
'use strict'

import User from '../user/user.model.js'
import Product from '../product/product.model.js'
import Cart from '../cart/cart.model.js'

//Crear un carrito
export const createCart = async(req, res) => {
    try{
        let data = req.body
        let user = await User.findOne(
            {
                _id: data.user
            }            
        )

        if(!user) return res.status(403).send(
            {
                success: false,
                message: 'User id not found'
            }
        )        
        
        let cart = new Cart(data)
        await cart.save()
        return res.send(
            {
                success: true,
                message: `Your cart has been created`,
                data: cart
            }
        )        
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when create a cart',
                err
            }
        )
    }
}

export const addProducts = async(req, res) => {
    try{
        let { id } = req.params
        let product = req.body
        let productExist = await Product.findById(product)

        if(!productExist) {
            return res.status(403).send(
                {
                    success: false,
                    message: 'Product id not found'
                }
            )
        }

        let addProducts = await Cart.findByIdAndUpdate(
            id,
            { $push: { product: product } },  // Utilizamos $push para agregar el producto al array
            { new: true }
        )

        if(!addProducts) {
            return res.status(404).send(
                {
                    sucess: false,
                    message: 'Cart not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Product/s added',
                addProducts
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when add products',
                err
            }
        )
    }
}