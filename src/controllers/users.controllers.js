const jwt=require("jsonwebtoken")
const config=require("../config/config.js")
class UserControllers{
    constructor(UserService){
        this.UserService=UserService
    }
    registerUser= async(req, res)=>{
        try {
            const user=req.user
            return res.status(200).send(`Usuario registrado. Hola ${user.first_name}`)
        } catch (error) {
            return res.status(404).send("Registro Fallido")
        }
    }

    loginUser= async(req, res)=>{
        try {
            let user= req.user
            const token=jwt.sign({user}, config.JWTpassword, {expiresIn:"1h"})
            res.cookie("currentUser", token,  {httpOnly: true, sameSite:"strict"})
            return res.status(200).send("Usuario loggeado")
        } catch (error) {
            return res.status(404).send("No se pudo loggear")    
        }
    }

    getCurrentUser= async (req,res)=>{
        try {
            const user=req.user.user
            const idU=user._id
            const currentUser= await this.UserService.getCurrentUser(idU)
            return res.status(200).json(currentUser)
        } catch (error) {
            return res.status(404).send(error.message)
        }
    }

    updateUser= async(req,res)=>{
        try {
            const currentUser=req.user.user
            const id=currentUser._id
            const user=await this.UserService.updateUser(id, req.body)
            return  res.status(200).json(user)
        } catch (error) {
            return res.status(404).send(error.message)
        }
    }

    logout= async(req,res)=>{
    try {
        if(!req.user){
            return res.status(404).send("No estas loggeado")
        }
        res.clearCookie('currentUser')
        return  res.status(200).send("Has cerrado la sesión")
        } catch (error) {
        return res.status(500).send({status: 'error', message: error.message});
        }
    }

    deleteUser=async (req,res)=>{
        try {
            const currentUser=req.user.user
            const idU=currentUser._id
            const userDelete= await this.UserService.deleteUser(idU)
            res.clearCookie('currentUser')
            return  res.status(200).json(userDelete)
        } catch (error) {
            return  res.status(404).send(error.message)
        }
    }
}

module.exports=UserControllers