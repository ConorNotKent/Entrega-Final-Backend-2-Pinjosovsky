const mongoose=require("mongoose")

const CartsSchema=new mongoose.Schema({
    products:[ 
           
{   _id: false,     
    idProduct:{
                type:mongoose.Schema.Types.ObjectId, ref:"Product"
            },
            quantity:{
                type:Number,
                required:true
            },}
    ]

})

const Carts= mongoose.model("Carts", CartsSchema)

module.exports=Carts