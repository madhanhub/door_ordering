const admin=require('../Schema/Admin')
class AdminController{
    static async New_admin(
        a_name,a_mailId,a_password
    ){
        const new_admin=await admin({
            a_name,
            a_mailId,
            a_password
        }).save()
        return new_admin
    }
    static async Admin_delete(
        _id
    ){
        const a_delete=await admin.findOneAndDelete({_id})
    return a_delete
    }
    static async Admin_login(
        a_mailId,a_password
    ){
        const login=await admin.findOne({
            a_mailId,
            a_password
        })
        return login
    }
}
module.exports=AdminController