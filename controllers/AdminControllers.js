const admin=require('../Schema/Admin')
class AdminController{
    static async New_admin(
        a_name,a_mailId,a_password,a_status
    ){
        const new_admin=await admin({
            a_name,
            a_mailId,
            a_password,
            a_status
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
        const login=await admin.findOneAndUpdate({a_mailId,a_password},
            {$set:{a_status:'login'}})
        return login
    }
    static async admin_logout(
        a_mailId
    ){
        const a_logout=await admin.findOneAndUpdate({a_mailId},
            {$set:{a_status:'logout'}})
            return a_logout
    }
}
module.exports=AdminController