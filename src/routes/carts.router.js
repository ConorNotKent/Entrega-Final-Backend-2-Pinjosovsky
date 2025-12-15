const express= require("express")
const router=express.Router()
const passport= require("passport")
const {verifyJWT}=require("../middlewares/verifyJWT")
const {isLogged}=require("../middlewares/isLogged")
const CartsDao= require("../dao/carts.dao")
const CartsService= require("../service/carts.service")
const CartsControllers=require("../controllers/carts.controllers")

const cartsDao= new CartsDao()
const cartsService= new CartsService(cartsDao)
const cartsControllers= new CartsControllers(cartsService)


router.post("/", verifyJWT ,passport.authenticate("jwt", {session:false}), cartsControllers.createCart)
router.get("/:id", isLogged, verifyJWT, passport.authenticate("jwt", {session:false}), cartsControllers.getCartbyId)
router.post("/:idC/products/:idP",isLogged ,verifyJWT,passport.authenticate("jwt", {session:false}), cartsControllers.addProductsToCarts)
router.delete("/:idC/products/:idP", isLogged,verifyJWT, passport.authenticate("jwt", {session:false}), cartsControllers.deleteProductfromCart)
router.post("/:idCart/purchase",isLogged, verifyJWT ,passport.authenticate("jwt", {session:false}),cartsControllers.finishPurchase)
router.delete("/:idC/",isLogged, verifyJWT, passport.authenticate("jwt", {session:false}), cartsControllers.vaciarProductosdeCarrito)

module.exports=router