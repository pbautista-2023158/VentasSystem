//Rutas de usuario
import { Router } from "express";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"
import { updateUserValidator } from "../../middlewares/validators.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.errors.js";
import { 
    deleteUser, 
    getUserById, 
    getUsers, 
    updatePassword, 
    updateProfilePicture, 
    updateUser } 
from "./user.controller.js";
import { uploadProfilePicture } from "../../middlewares/multer.uploads.js";

const api = Router()

api.get("/", [validateJwt, isAdmin], getUsers); 
api.get('/:id', validateJwt, getUserById)
api.put('/:id', [validateJwt, updateUserValidator], updateUser)
api.delete('/:id', validateJwt, deleteUser)
api.put('/updatePassword/:id', validateJwt, updatePassword)
api.put('/updateProfilePicture/:id', [validateJwt, uploadProfilePicture.single('profilePicture'), deleteFileOnError], updateProfilePicture)

export default api
