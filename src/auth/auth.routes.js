//Rutas de autenticacion
import { Router } from "express";
import { login, register } from "./auth.controller.js"
import { registerValidator } from "../../middlewares/validators.js";
import { uploadProfilePicture } from "../../middlewares/multer.uploads.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.errors.js";

const api = Router()

api.post('/register', [uploadProfilePicture.single("profilePicture"), registerValidator, deleteFileOnError], register)
api.post('/login', login)

export default api