//Controlador del usuario
import User from "../user/user.model.js";
import { encrypt } from '../../utils/encryp.js'

export const getUsers = async(req,res) => {
    try{
        let { limit = 10, skip = 0 } = req.query
        let users = await User.find()
            .skip(skip)
            .limit(limit)

        if(!users) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Users not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Users found',
                users
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when found users',
                err
            }
        )
    }
}

export const getUserById = async(req, res)=>{
    try{
        let { id } = req.params
        let user = await User.findById(id)

        if(!user) return res.status(404).send(
            {
                    success: false,
                    message: 'User not found'
            }   
        )    
        return res.send(
            {
                success: true,
                message: 'User found',
                user
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when found user',
                err
            }
        )
    }
}

export const updateUser = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let updateUser = await User.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update) return res.status(404).send(
            {
                success: false, 
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated',
                user: updateUser 
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when update user',
                err
            }
        )
    }   
} 

export const deleteUser = async(req, res)=>{
    try{
        let { id } = req.params
        let deleteUser = await User.findByIdAndDelete(id)

        if(!deleteUser) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }   
        )    
        return res.send(
            {
                success: true,
                message: 'User deleted',
                deleteUser
            }
        )        
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when delete user',
                err
            }
        )
    }  
}

//Actualizar la contraseña del usuario
export const updatePassword = async(req, res) => {
    try{
        let { id } = req.params
        let { newPassword } = req.body

        if(!newPassword) return res.status(400).send(
            {
                success: false, 
                message: "New password is required" 
            }
        )   
      
        let hashedPassword = await encrypt(newPassword)
        let user = await User.findByIdAndUpdate(
            id,
            { password: hashedPassword },
            { new: true }
        )
  
        if(!user) return res.status(404).send(
            { 
                success: false,
                message: "User not found" 
            }
        )

        return res.send(
            {
                success: true,
                message: 'Password updated successfully'
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when update password',
                err
            }
        )
    }
}

export const updateProfilePicture = async(req, res)=>{
    try{
        const { uid } = req.user
        const { filename } = req.file
        const user = await User.findByIdAndUpdate(
            uid,
            {
                ProfilePicture: filename
            },
            { new: true }
        )
        
        if(!user) return res.status(404).send(
            {
                succes: false,
                message: 'User not found - not updated'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated successfully',
                user
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when update profile picture',
                err
            }
        )
    }
}

//Agregar usuario por defecto
const adminPorDefecto = async() => {
    try{
        let adminExistente = await User.findOne({ role: "ADMIN" })
        
        if(!adminExistente) {
            let passwordEncrypt = await encrypt("Contraseña123*", 13)
            let adminPorDefecto = new User( 
                {
                    name: "Pedro Sergio Javier",
                    surname: "Bautista Matheu",
                    username: "admindefault",
                    email: "correoinstitucional@kinal.edu.gt",
                    password: passwordEncrypt,
                    phone: "4967-0135",
                    role: "ADMIN",
                    profilePicture: null
                }
            )
            await adminPorDefecto.save()
            console.log("Default admin added")
        }
    }catch(err){
        console.error("General error when adding the default admin", err)
    }
}

adminPorDefecto()