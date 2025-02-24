'use strict'

import Category from './category.model.js'

//Crear una categoria
export const createCategory = async(req, res) => {
    try{
        const data = req.body
        const category = new Category(data)
        await category.save()
        return res.send(
            {
                success: true,
                message: `${category.name} saved successfully`
            }
        )
    }catch (err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding category',
                err
            }
        )
    }
}

//Obtener todas las categorias
export const getCategories = async(req, res) => {
    try{
        const { limit = 5, skip = 0 } = req.query
        const categories = await Category.find()
            .skip(skip)
            .limit(limit)

        if(!categories.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Categories not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Categories found',
                categories
            }
        )            
    }catch (err){
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

//Obtener una categoria por Id
export const getCategoryById = async(req, res) => {
    try{
        let { id } = req.params
        let category = await Category.findById(id)
        if(!category.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Category found',
                category
            }
        )         
    }catch (err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when found category',
                err
            }
        )
    }
}

//Actualizar una categoria
export const updateCategory = async(req, res) => {
    try{
        const { id } = req.params
        const data = req.body
        const updateCategory = await Category.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        
        if(!updateCategory.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Category updated',
                updateCategory
            }
        )  
    }catch (err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when update category',
                err
            }
        )
    }
}

//Eliminar una categoria
export const deleteCategory = async(req, res) => {
    try{
        let { id } = req.params
        let deleteCategory = await Category.findById(id)
        if(!deleteCategory.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }

        deleteCategory.name = 'Categoria'
        deleteCategory.description = '-'
        await deleteCategory.save()

        return res.send(
            {
                success: true,
                message: 'Category deleted'
            }
        )  
    }catch (err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when delete category',
                err
            }
        )
    }
}

const agregarCategoriaAutomaticamente = async () => {
    const categoriasExistentes = await Category.countDocuments()
    if(categoriasExistentes === 0) {
        const categoriaPorDefecto = [
            {
                name: "Productos de limpieza",
                description: "Productos para el hogar"
            }
        ]
        try{
            await Category.insertMany(categoriaPorDefecto)
            console.log("Default category added")
        }catch(error){
            console.error("General error when adding the default category", error)
        }
    }
}

agregarCategoriaAutomaticamente()