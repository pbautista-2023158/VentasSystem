//Validar campos en las rutas
import { body } from "express-validator" 
import { validateErrors, validateErrorsWithoutFiles } from "./validate.errors.js"
import { existUsername, existEmail, notRequiredField} from "../utils/db.validators.js"

//Arreglo de validaciones (por cada ruta)
export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(existEmail),  
    body('username')
        .notEmpty() 
        .toLowerCase()
        .custom(existUsername),  
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min: 8})
        .withMessage('Password need min characteres'),
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
    validateErrors //Si lleva parentesis es una funcion en ejecucion y si no es una referencia a una funcion
]

export const updateUserValidator = [
    body('username')
        .optional() //Parametro opcional, puede llegar como no puede llegar
        .notEmpty()
        .toLowerCase()
        .custom()
        .custom((username, { req })=> existUsername(username, req.user)),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, { req })=> existEmail(email, req.user)),
    body('password')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('profilePicture')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('role')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    validateErrorsWithoutFiles
]

export const saveCategoryValidator = [
    body('name', 'Name cannot be empty')
        .isLength({max: 35})
        .notEmpty(),
    body('description', 'Description cannot be empty')
        .isLength({max: 100})
        .notEmpty()
]

export const updateCategoryValidator = [
    body('name', 'Name cannot be empty')
        .isLength({max: 35})
        .notEmpty(),
    body('description', 'Description cannot be empty')
        .isLength({max: 100})
        .notEmpty()    
]

export const saveProductValidator = [
    body('name', 'Name cannot be empty')
        .isLength({max: 35})
        .notEmpty(),
    body('description', 'Description cannot be empty')
        .isLength({max: 100})
        .notEmpty(),
    body('price', 'Name cannot be empty')
        .notEmpty(),
    body('stock', 'Stock cannot be empty')
        .notEmpty(),  
    body('category', 'Category cannot be empty')
        .notEmpty()              
]