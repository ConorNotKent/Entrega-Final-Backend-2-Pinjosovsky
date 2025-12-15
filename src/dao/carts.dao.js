const Carts=require("../models/carts.schema")
const Products=require("../models/products.schema")
const ProductManager=require("../dao/products.dao")
const User=require("../models/user.schema")
const Ticket=require("../models/ticket.schema")
const crypto=require("crypto")
const productDao= new ProductManager()

class CartManager{

    async #isCartfromUser(idC, idU){
        const comprador= await User.findById(idU)
        const carritosComprador=comprador.carts
        const carritoEsta=carritosComprador.find((carrito)=> carrito.idCart.toString()===idC.toString())
            if(!carritoEsta){
                throw new Error("Este carrito no le pertenece");
            }
        return carritoEsta
    }

    async createCart(id){
        try {
        const user=await User.findById(id)
        const newCart= await new Carts()
        await newCart.save()
        const carritoUser= user.carts
        const idC= newCart._id
        carritoUser.push({idCart:idC})
        await user.save()
        return carritoUser          
        } catch (error) {
            console.error("No se pudo generar el nuevo carrito")
        }
    }
    async getCartbyId(id, idU){
        try {
            await this.#isCartfromUser(id, idU)
            if(!id){
                throw new Error("Id no seleccionado");
            }else{
            const IdEncontrado=await Carts.findById(id)
            return IdEncontrado                
            }
        } catch (error) {
            throw new Error(error)
        }
    }

        async addProductsToCarts(idC,idP, idU, quantity){
        try {
            await this.#isCartfromUser(idC, idU)
            const carritoSeleccionado= await Carts.findById(idC)
            const productoSeleccionado=await Products.findById(idP)
                if(!carritoSeleccionado){
                throw new Error("No se ha encontrado el carrito"); 
                }
                if(!productoSeleccionado){
                throw new Error("No se ha encontrado el producto");            
                }
            const listaProductos=carritoSeleccionado.products
            const productoExiste= listaProductos.find((producto)=>producto.idProduct.toString()===idP.toString())
                if(!productoExiste){
                listaProductos.push({idProduct: idP, quantity: quantity})
                }else{
                productoExiste.quantity+=quantity
                }
            await carritoSeleccionado.save()
            return carritoSeleccionado        
        } catch (error) {
            throw new Error("No se pudo agregar el producto", error);
        }

    }

    async deleteProductfromCart(idC, idP, idU){
        try {
            await this.#isCartfromUser(idC, idU)
            const carrito= await Carts.findById(idC)
            const productosCarrito= carrito.products
            const productosFiltrado= productosCarrito.filter((producto)=> producto.idProduct.toString() !== idP.toString())
            carrito.products=productosFiltrado
            await carrito.save()
            return carrito
        } catch (error) {
            throw new Error("No se pudo eliminar el producto");
        }
    }

    async vaciarProductosdeCarrito(idC, idU){
        try {
        await this.#isCartfromUser(idC, idU)
        const carrito= await Carts.findById(idC)
        carrito.products=[]
        await carrito.save()
        return carrito
        } catch (error) {
            throw new Error("No se pudo vaciar el carrito")
        }
    }

    async finishPurchase(idCart, idU){
        try {
            await this.#isCartfromUser(idCart, idU)
            const comprador= await User.findById(idU)
            const emailComprador=comprador.email
            const cart= await Carts.findById(idCart)
            const listaProductos= cart.products
            const listaPrecios=[]
            const productosComprados=[]
            for(const item of listaProductos){
                const productoCompleto= await productDao.getProductbyId(item.idProduct)
                const prodStock=productoCompleto.stock
                    if(item.quantity <= prodStock){
                        productoCompleto.stock-=item.quantity
                        await productoCompleto.save()
                        const totalPorProducto= productoCompleto.price * item.quantity
                        listaPrecios.push(totalPorProducto)
                        const idP=productoCompleto._id
                        productosComprados.push(idP.toString())
                    }
            }
            const amount=listaPrecios.reduce((acc, current)=> acc+current, 0)
            const ticketInfo={
                code:crypto.randomUUID(),
                amount: amount.toFixed(2),
                purchaser:emailComprador
            }
            const ticket= await new Ticket(ticketInfo)
            await ticket.save()
            const listaFiltrada=listaProductos.filter((item)=> !productosComprados.includes(item.idProduct.toString()))
            cart.products=listaFiltrada
            await cart.save()
            const factura={
                ticket,
                "Productos Comprados": productosComprados,
                "Productos sin stock": listaFiltrada
            }
            return factura
        } catch (error) {
            throw new Error("No se pudo hacer la compra")
        }
    }
}


module.exports=CartManager