const user=require('../Schema/user_register')
const admin=require('../Schema/Admin')
const product=require('../Schema/Product')
class UserController{
    static async User_Register(
        user_name,user_address,user_mobile,user_mailId,user_password,user_status
    ){
        
        const user_register=await new user({
            user_name,user_address,user_mobile,user_mailId,user_password,user_status
        }).save()
        return user_register
    }
    static async User_login(
        user_mailId,user_password
    ){
        const user_login=await user.findOneAndUpdate({user_mailId,user_password},
            {$set:{user_status:'login'}})
        return user_login
    }
    static async user_logout(
        user_mailId
    ){
        const user_logout=await user.findOneAndUpdate({user_mailId},
            {$set:{user_status:'logout'}})
            return user_logout
    }
    static async product_list({
        door_id
    }){
        const p_list=await product.find({'door_details.door_id':door_id})
     return p_list
     }
     static async product_list_one({
        _id
    }){
        const p_list=await product.findOne({_id})
     return p_list
     }
}
module.exports=UserController