const userLogged=(req, res, next)=>{
    try {
        if(req.cookies.currentUser){
            return res.status(404).send("User ya loggeado")
        }
        next()
    } catch (error) {
        return res.status(404).json({message: error})
    }
}

module.exports= {userLogged}