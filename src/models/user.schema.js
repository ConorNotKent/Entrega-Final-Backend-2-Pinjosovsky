const mongoose=require("mongoose")

const UserSchema= new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    carts:[ {_id: false,     
            idCart:{type:mongoose.Schema.Types.ObjectId, ref:"Carts"},}],
    role:{
        type:String,
        required: true,
        default: "user"
    }
    
})

const User= mongoose.model("User", UserSchema)

module.exports=User