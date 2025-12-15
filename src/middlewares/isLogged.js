const isLogged=(req, res, next)=>{
    try {
        if(!req.cookies.currentUser){
            return res.status(404).json({message:"Tenes que estar loggeado para interactuar con esta accion"})
        }
        next()
    } catch (error) {
        return res.status(404).json({message:error})
    }
}

module.exports= {isLogged}