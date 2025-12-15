const express= require("express")
const router=express.Router()
const passport=require("passport")
const ProductsDao= require("../dao/products.dao")
const ProductsService= require("../service/products.service")
const ProductsControllers=require("../controllers/products.controllers")
const {isAdmin}=require("../middlewares/isAdmin.js")

const productsDao= new ProductsDao()
const productsService= new ProductsService(productsDao)
const productsControllers= new ProductsControllers(productsService)

router.get("/", productsControllers.getProducts)
router.get("/:idProducto", productsControllers.getProductbyId)
router.post("/",passport.authenticate("jwt", {session:false}), isAdmin, productsControllers.addProduct)
router.put("/:id",passport.authenticate("jwt", {session:false}), isAdmin, productsControllers.updateProduct)
router.delete("/:id",passport.authenticate("jwt", {session:false}),isAdmin, productsControllers.deleteProduct)

module.exports=router