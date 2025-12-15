const mongoose=require("mongoose")
const User=require("../models/user.schema")
const {createHash, isPasswordValid}=require("../utils/utils.js")

class UserManager{
    async registerUser(first_name, last_name, email, age, password, role){
        try {
            const info= {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                role
            }

            const nuevoUser= await new User(info)

            await nuevoUser.save()
            return nuevoUser
        } catch (error) {
            throw new Error("No se pudo registrar el usuario");
        }
    }

    async loginUser(username, password){
        try {
            const user= await User.findOne({email: username})
            if(!user){
                throw new Error("Usuario no registrado");
            }
            const passwordValido= isPasswordValid(user, password)
            if(!passwordValido){
                throw new Error("Contraseña incorrecta");
            }
            return {_id: user._id, role: user.role}
        } catch (error) {
            throw new Error("Login fallido");
        }
    }

    async findUserbyId(id){
        try {
            const user=User.findById(id)
            return user
        } catch (error) {
            throw new Error("No se pudo econtrar el usuario");
        }
    }

    async getCurrentUser(idU){
        try {
            const user=await User.findById(idU, {password: 0})
            return user
        } catch (error) {
            throw new Error("No se pudo econtrar el usuario");
        }
    }

    async updateUser(id, newInfo){
        try {
            const userModificado= await User.findByIdAndUpdate(id, newInfo, {new:true})
            return userModificado
        } catch (error) {
            throw new Error("No se pudo modificar el usuario")   
        }
    }

    async deleteUser(idU){
        try {
            const userDelete= await User.findByIdAndDelete(idU)
            return userDelete
        } catch (error) {
            throw new Error("No se pudo eliminar el usuario")
        }
    }
}

module.exports=UserManager