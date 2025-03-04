//Controlador del carrito de compras
'use strict'

import User from '../user/user.model.js'
import Cart from '../cart/cart.model.js'
import Product from '../product/product.model.js'
import addProducts from '../cart/addProducts.model.js'

export const createCart = async(req, res) => {
    try{
        let { user } = req.body
        let userExist = await User.findById(user)

        if(!userExist) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'User Id not found'
                }
            )
        }

        let cart = new Cart({user})
        await cart.save()

        return res.send(
            {
                success: true,
                message: 'Your cart has been created',
                data: cart
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when creating a cart',
                err
            }
        )
    }
}

export const addProductsInCart = async(req, res) => {
    try{
        let { cart, product } = req.body
        let cartExists = await Cart.findById(cart)

        if(!cartExists) {
            return res.status(403).send(
                {
                    success: false,
                    message: 'User id not found'
                }
            )            
        }

        let addProductExist = await Product.findById(product)

        if(!addProductExist) {
            return res.status(403).send(
                {
                    success: false,
                    message: 'Product id not found'
                }
            )               
        }

        let newAddProduct = new addProducts(
            {
                cart: cart,
                product: product
            }
        )

        await newAddProduct.save()
        cartExists.products.push(newAddProduct._id)

        cartExists.total += addProductExist.price

        await cartExists.save()

        return res.send(
            {
                success: true,
                message: 'Your products has been added'
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