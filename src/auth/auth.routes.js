//Rutas de autenticacion
import { Router } from "express";
import { login, register } from "./auth.controller.js"
import { registerValidator } from "../../middlewares/validators.js";
import { uploadProfilePicture } from "../../middlewares/multer.uploads.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.errors.js";


const api = Router()

//Rutas publicas
                    //Middlewares
api.post(
    '/register', 
    [
        uploadProfilePicture.single("profilePicture"),
        //Validador de errores!!!
        registerValidator,
        //Ejectuar la validacion de errores(delete.file.on.errors.js)
        deleteFileOnError
    ], 
    register
)

api.post('/login', login)

//Exporto las rutas
export default api