const mongoose=require('mongoose')
const admin=new mongoose.Schema({
        a_name:{
            type:String
        },
        a_mailId:{
            type:String
        },
        a_password:{
            type:String
        },
        a_status:{
            type:String,
            default:'logout'
        }

})
module.exports=mongoose.model('Admin',admin)