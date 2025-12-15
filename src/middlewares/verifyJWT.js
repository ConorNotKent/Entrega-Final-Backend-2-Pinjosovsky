const jwt=require("jsonwebtoken")
const config=require("../config/config.js")

const verifyJWT=(req, res, next)=>{
    try {
        const token=req.cookies.currentUser
        if(!token){
            return res.status(400).send("No se encontro el JWT")
        }
        const verify=jwt.verify(token, config.JWTpassword)
        if(!verify){
            return res.status(404).send("Token corrupto")
        }
        next()        
    } catch (error) {
        return res.status(404).send(error)
    }
}

module.exports={verifyJWT}