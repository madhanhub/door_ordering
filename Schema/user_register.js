const mongoose=require('mongoose')
const user=new mongoose.Schema({
    user_name:{
        type:String
    },
    user_address:{
        type:String
    },
    user_mobile:{
        type:String
    },
    user_mailId:{
        type:String
    },
    user_password:{
        type:String
    },
})
module.exports=mongoose.model('user_register',user)