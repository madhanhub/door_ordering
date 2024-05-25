const order=require('../Schema/Order')
const user=require('../Schema/user_register')
const admin=require('../Schema/Admin')
const product=require('../Schema/Product')
class OrderController{
    static async New_order(
        u_id,p_id,door_id,quantity
    ){
        const new_order=await new order({
            u_id,
            p_id,door_id,quantity
        }).save()
        return new_order
    }
    static async Order_cancle(
        _id
    ){
        const order_cancle=await order.findOneAndDelete({_id})
        return order_cancle
    }
}
module.exports=OrderController