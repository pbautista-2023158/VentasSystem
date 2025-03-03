//Gestionar logica de autenticacion
import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encryp.js'
import { generateJwt } from '../../utils/jwt.js'

export const register = async(req, res)=>{
    try{
        //Capturar los datos
        let data = req.body
        //Crear el objeto del modelo agregandole los datos capturados
        let user = new User(data)
        //Encriptar la password (2)
        user.password = await encrypt(user.password)
        //Asignar rol por defecto
        user.role = 'CLIENT'
        //Asignar profilePicture
        user.profilePicture = req.file?.filename ?? null //Nullish si es verdad lo de la izquierda, pone ese valor, sino pone el de la derecha
        //Guardar
        await user.save()
        //Responder al usuario
        return res.send({message: `Registered succesfully, can be logged with username: ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with user registration', err})
    }
}

export const login = async(req, res)=>{
    try{
        //Capturar lso datos(body)
        let { userLoggin, password } = req.body
        //Validar que el usuario exista
        let user = await User.findOne(
            {
                $or: [ //Subfuncion OR | espera un [] de busquedas
                    { email: userLoggin }, 
                    { username: userLoggin }
                ]
            }
        )//{username} = {username: username}
        console.log(user)
        //Verificar que la contrasenia coincida       
        if(user && await checkPassword(user.password, password)){
            //Generar el token
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )    
        }    
        //Responder al usuario
        return res.status(400).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function', err})
    }
}