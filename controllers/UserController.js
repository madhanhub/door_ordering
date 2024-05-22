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
}
module.exports=UserController