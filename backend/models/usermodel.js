const mongoose=require("mongoose")

const ProductSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
 required:true},
phoneno:{
    type:String,
    required:true,

},
address:{
    type:String
},
answer:{
    type:String,
    required:true
},
role:{
    type:Number,
    default:0
},
},
{
    timestamps:true
}
)
const User=mongoose.model("ProductUser",ProductSchema)
module.exports=User