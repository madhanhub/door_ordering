const user=require('../Schema/user_register')
const admin=require('../Schema/Admin')
const product=require('../Schema/Product')
class UserController{
    static async User_Register(
        user_name,user_address,user_mobile,user_mailId,user_password
    ){
        
        const user_register=await new user({
            user_name,user_address,user_mobile,user_mailId,user_password
        }).save()
        return user_register
    }
    static async User_login(
        user_mailId,user_password
    ){
        const user_login=await user.findOne({
            user_mailId,user_password
        })
        return user_login
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