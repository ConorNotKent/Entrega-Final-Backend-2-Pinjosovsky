const isAdmin=(req,res, next)=>{
    try {
        const user= req.user.user
        if(user.role !== "admin" ){
            return res.status(404).json({message:"Tenes que ser admin para acceder a esta funcion"})
        }
        next()
    } catch (error) {
        return res.status(404).json({message:error})
    }
}

module.exports={isAdmin}