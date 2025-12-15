class CartsService{
    constructor(cartsDao){
        this.cartsDao=cartsDao
    }

    async createCart(id){
        if(!id){
            throw new Error("Tenes que estar loggeado para crear un carrito");
        }
        const carrito= await this.cartsDao.createCart(id)
        return carrito
    }

    async getCartbyId(id, idU){
        if(!id || !idU){
            throw new Error("id faltante")
        }else{
            const carrito=await this.cartsDao.getCartbyId(id, idU)
            if(!carrito){
                throw new Error("No se ha encontrado el carrito");
            }else{
                return carrito
            }
        }
    }

    async addProductsToCarts(idC,idP, idU, quantity){
        if(!idC || !idP || !idU){
            throw new Error("Falta un id")
        }
        const existe=await this.cartsDao.getCartbyId(idC, idU)
        if(!existe){
            throw new Error("Este carrito no existe");
        }
        if(!quantity){
            throw new Error("Por favor, introduzca la cantidad deseada")
        }
        if(quantity <=0){
            throw new Error("cantidad no valida. por favor poner un numero superior a 0");
        }
        
        const carrito= await this.cartsDao.addProductsToCarts(idC,idP, idU, quantity)
        return carrito
    }

    async deleteProductfromCart(idC, idP, idU){
        if(!idC || !idP || !idU){
            throw new Error("Falta un id");
        }else{
        const existe= await this.cartsDao.getCartbyId(idC, idU)
        if(!existe){
            throw new Error("No existe un carrito con ese id")
        }else{
            const carrito= await this.cartsDao.deleteProductfromCart(idC, idP, idU)
            return carrito
        }
        }        
    }

    async updateQuantity(idC, idP, newQuantity){
        if(!idC || !idP || !newQuantity){
            throw new Error("Falta informacion para actualizar la cantidad de productos");
        }else if(newQuantity<0){
            throw new Error("Cantidad no valida, el numero tiene que ser mayor a 0")
        }else{
            const existe= await this.cartsDao.getCartbyId(idC)
            if(!existe){
                throw new Error("No se ha encontrado el carrito");
            }else{
                const carrito= await this.cartsDao.updateQuantity(idC, idP, newQuantity)
                return carrito
            }
        }
}
    async vaciarProductosdeCarrito(idC, idU){
        if(!idC || !idU){
            throw new Error("Falta ID")
        }else{
            const existe=await this.cartsDao.getCartbyId(idC, idU)
            if(existe){
                const carrito=await this.cartsDao.vaciarProductosdeCarrito(idC, idU)
                return carrito
            }else{
                throw new Error("No se ha podido encontrar el carrito")
            }
        }
    }

    async finishPurchase(idCart, idU){
        if(!idCart || !idU){
            throw new Error("Falta un ID")
        }
        const existe=await this.cartsDao.getCartbyId(idCart, idU)
        if(!existe){
            throw new Error("Carrito no valido")
        }
        const cart= await this.cartsDao.finishPurchase(idCart, idU)
        return cart
    }
}

module.exports=CartsService