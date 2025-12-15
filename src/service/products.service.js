class ProductsService{
    constructor(productsDao){
        this.productsDao=productsDao
    }

    async getAllProducts(){
        const products=await this.productsDao.getProducts()
        return products
    }

    async getProductbyId(idProducto){
        if (!idProducto){
            throw new Error("Producto no encontrado");
        }else{
            const productoEncontrado=await this.productsDao.getProductbyId(idProducto)
            if(!productoEncontrado){
                throw new Error("Producto no encontrado");
            }else{
             return productoEncontrado   
            }
            
        }
    }

    async addProduct(product){
        const requerimientos=["title", "description", "code", "price", "status", "stock", "category"]
        const requerimientosFaltantes=requerimientos.filter((field)=> !product[field])

        if(requerimientosFaltantes.length>0){
            throw new Error(`Falta rellenar los campos ${requerimientosFaltantes}`)
        }else{
            const productoNuevo=await this.productsDao.addProduct(product)
            return productoNuevo
        }
    }

    async updateProduct(id, updateInfo){
        if(!id || !updateInfo){
            throw new Error("Falta informacion para la acutalizacion");
        }else{
            const existe=this.productsDao.getProductbyId(id)
            if(!existe){
                throw new Error("Producto no encontrado");
            }else{
                const productoActualizado= await this.productsDao.updateProduct(id, updateInfo)
                return productoActualizado
            }
        }
    }

    async deleteProduct(id){
        if(!id){
            throw new Error("Falta el id");
        }else{
            const listaNueva= await this.productsDao.deleteProduct(id)
            return listaNueva
        }
    }

//     async paginateProducts(pageElejido, limitElejido, sortElejido, category){

//     if(!pageElejido || !limitElejido || !sortElejido){
//             throw new Error(" No se pudo mostrar la pagina")
//     }
//     if (pageElejido <0 || limitElejido <0){
//         throw new Error("Numero de pagina o de limite invalido");
//     }
//         const products=await this.productsDao.paginateProducts(pageElejido, limitElejido, sortElejido, category)
//         return products
    
// }
}

module.exports=ProductsService