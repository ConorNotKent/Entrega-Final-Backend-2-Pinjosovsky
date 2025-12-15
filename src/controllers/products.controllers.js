class ProductControllers{
    constructor(productsService){
        this.productsService=productsService
    }

    getProducts= async(req, res, next)=>{
        try {
            const products=await this.productsService.getAllProducts()
            return  res.json(products)
        } catch (error) {
            next(error)
        }
    }

    getProductbyId= async(req,res,next)=>{
        try {
            const {idProducto}=req.params
            let product=await this.productsService.getProductbyId(idProducto)
            if(!product){
                return  res.status(404).json({message: "Producto no encontrado"})
            }else{
                return  res.json(product)
            }                
        } catch (error) {
            next(error)
        }
    }

    addProduct= async (req,res,next)=>{
        try {
            const newProduct=await this.productsService.addProduct(req.body)
            return res.json(newProduct)
        } catch (error) {
            next(error)
        }
    }

    updateProduct= async (req,res,next)=>{
        try {
            const {id}=req.params
            const productoActualizado= await this.productsService.updateProduct(id, req.body)
            return  res.json(productoActualizado)
        } catch (error) {
            next(error)
        }
    }

    deleteProduct= async (req,res,next) =>{
        try {
            const {id}=req.params
            const listaNueva=await this.productsService.deleteProduct(id)
            return  res.json(listaNueva)
        } catch (error) {
            next(error)
        }
    }
    // paginateProducts= async (req,res,next)=>{
    //     try {
            
    //         const {page=1}= req.query 
    //         let {limit=3}= req.query
    //         const {sort=1}= req.query
    //         const {category}=req.query

    //         const result= await this.productsService.paginateProducts(page, limit, sort, category)

    //         let prevLink=null
    //         if(result.hasPrevPage){
    //              prevLink=`http://localhost:8080/api/products?page=${result.prevPage}&limit=${limit}%sort=${sort}`
    //         }

    //         let nextLink=null
    //         if (result.hasNextPage){
    //             nextLink=`http://localhost:8080/api/products?page=${result.nextPage}&limit=${limit}%sort=${sort}`
    //         }

    //         const status= {
    //         status: "success",
    //         productos: result.docs,
    //         totalPages: result.totalPages,            
    //         prevPage: result.prevPage,
    //         nextPage: result.nextPage,
    //         page: result.page,
    //         hasPrevPage: result.hasPrevPage,
    //         hasNextPage: result.hasNextPage,
    //         prevLink: prevLink,
    //         nextLink: nextLink
    //         }
    //         
    //         return res.render("partials/products",status)
            
    //     } catch (error) {
    //         next(error)
    //     }
    // }
}

module.exports=ProductControllers