const express = require('express')
const app = express()
const mongoose=require("mongoose")
const passport=require("passport")
const cookieParser= require("cookie-parser")
const ProductRoutes=require("./src/routes/products.router.js")
const CartsRoutes=require("./src/routes/carts.router.js")
const UserRoutes=require("./src/routes/users.router.js")
const config=require("./src/config/config.js")
const {initializePassport}=require("./src/config/passport.config.js")
// app.use(express.static(path.join(__dirname, "/public")))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

mongoose
  .connect(config.MongoCon)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error(err));





initializePassport()
app.use(passport.initialize())

app.use("/api/products",ProductRoutes)
app.use("/api/cart",CartsRoutes)
app.use("/api/user", UserRoutes)


app.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`)
})

