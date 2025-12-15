const mongoose=require("mongoose")
const Product=require("../models/products.schema");

class ProductManager{

    async getProducts(){
        try {
            const products=await Product.find()
            return products
        } catch (error) {
            throw new Error("No se pueden leer los productos")
        }
    }

    async getProductbyId(idProducto){
        try {
            const IdEncontrado= await Product.findById(idProducto)
            return IdEncontrado
        } catch (error) {
            throw new Error("No se ha encontrado el producto");
        }
    }

    async addProduct(product){
            
        try {
        const NewProduct=await new Product(product)
        NewProduct.save()
        return NewProduct
        } catch (error) {
            throw new Error("Hay uno o mas campos sin completar")
        }
       
    }

    async updateProduct(id, updateInfo){
        try {
            if(!mongoose.Types.ObjectId.isValid(id)){
                throw new Error("No se ha encontrado el ID");
                
            }else{
                const productoModificado= await Product.findByIdAndUpdate(id,updateInfo,{new:true})
                return productoModificado
            }           

        } catch (error) {
            throw new Error("no se pudo modificar el objeto"); 
        }

    }

    async deleteProduct(idDelete){
        try {
        await Product.findByIdAndDelete(idDelete)
        const productos= await Product.find()
        return productos
         }
        catch (error) {
            throw new Error("No se pudo eliminar el objeto")
        }
    }

    // async paginateProducts(pageElejido, limitElejido, sortElejido, category){
    //     try {
    //     let query={}

    //     if(category){
    //         const findCategory= Product.find({category:category})
    //         if(!findCategory){
    //             throw new Error("No se ha encontrado la categoria");
    //         }else{
    //             query.category=category
    //         }
    //     }
    //     let options={
    //         page:parseInt(pageElejido),
    //         limit:parseInt(limitElejido),
    //         sort: {price: parseInt(sortElejido)},
    //         lean: true
    //     }
    //     const products=await Product.paginate(query, options)
    //     return products            
    //     } catch (error) {
    //         throw new Error("No se pudo indentar la pagina");
    //     }

        
    // }
}

module.exports=ProductManager