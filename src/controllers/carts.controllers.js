class CartsControllers{
    constructor(cartsService){
        this.cartsService=cartsService
    }

    createCart= async(req, res, next) =>{
        try {
            let user=req.user.user
            const id=user._id
            const carritoNuevo= await this.cartsService.createCart(id)
            return  res.json(carritoNuevo)
        } catch (error) {
            next(error)
        }
    }

    getCartbyId= async (req, res, next)=>{
        try {
            let user=req.user.user
            const idU=user._id
            const {id}=req.params
            const carrito= await this.cartsService.getCartbyId(id, idU)
            if (!carrito){
                throw new Error("No se ha encontrado el carrito")
            }else{
                const carritoPopulate=await carrito.populate("products.idProduct")
                return  res.json({carrito: carritoPopulate.toObject()})
            }
        } catch (error) {
            next(error)
        }
    }

    addProductsToCarts = async(req,res,next)=>{
        try {
            const {quantity}= req.body
            let user=req.user.user
            const idU=user._id
            const {idC}=req.params
            const {idP}=req.params
            const carrito= await this.cartsService.addProductsToCarts(idC,idP,idU,quantity)
            return  res.json(carrito)
        } catch (error) {
            next(error)
        }
    }

    deleteProductfromCart = async (req, res, next)=>{
        try {
            let user=req.user.user
            const idU=user._id
            const {idC}=req.params
            const {idP}=req.params
            const carrito= await this.cartsService.deleteProductfromCart(idC, idP, idU)
            return  res.json(carrito)
        } catch (error) {
            next(error)
        }
    }

    updateQuantity = async (req, res, next)=>{
        try {
            const {idC}=req.params
            const {idP}=req.params
            const carrito = await this.cartsService.updateQuantity(idC, idP, req.body)
            return  res.json(carrito)
        } catch (error) {
            next(error)
        }
    }

    vaciarProductosdeCarrito = async (req, res, next)=>{
        try {
            let user=req.user.user
            const idU=user._id
            const {idC}=req.params
            const carrito =await this.cartsService.vaciarProductosdeCarrito(idC, idU)
            return  res.json(carrito)
        } catch (error) {
            next(error)
        }
    }

    finishPurchase=async(req,res)=>{
        try {
            let user=req.user.user
            const idU=user._id
            const{idCart}=req.params
            const cart= await this.cartsService.finishPurchase(idCart, idU)
            return  res.json(cart)
        } catch (error) {
            return res.status(404).send("NO SE PUDO")
        }
    }
}

module.exports=CartsControllers