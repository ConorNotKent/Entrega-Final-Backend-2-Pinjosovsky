const express= require("express")
const router=express.Router()
const UserDao= require("../dao/users.dao")
const UserService=require("../service/users.service")
const passport= require("passport")
const {userLogged}=require("../middlewares/userLogged")
const {isLogged}=require("../middlewares/isLogged")
const {verifyJWT}=require("../middlewares/verifyJWT")
const UserControllers=require("../controllers/users.controllers")

const userDao= new UserDao()
const userService= new UserService(userDao)
const userControllers= new UserControllers(userService)

router.post("/register", passport.authenticate("register", {session: false}),userControllers.registerUser)
router.post("/login",userLogged, passport.authenticate("login", {session: false}),userControllers.loginUser)
router.get("/current", isLogged, verifyJWT, passport.authenticate("jwt", {session:false}), userControllers.getCurrentUser)
router.put("/", isLogged, verifyJWT, passport.authenticate("jwt", {session:false}), userControllers.updateUser)
router.post("/logout", verifyJWT, passport.authenticate("jwt", {session:false}), userControllers.logout)
router.delete("/", isLogged, verifyJWT, passport.authenticate("jwt", {session:false}), userControllers.deleteUser)

module.exports=router