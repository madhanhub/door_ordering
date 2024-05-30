const order=require('../Schema/Order')
const my_order=require('../Schema/My_order')
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
    static async My_order(
        order_id,door_details
    ){
        const myorder=await new my_order({
            order_id,door_details
        }).save()
        return myorder
    }
    static async My_order_detail(
        
    ){
        const orders=await product.findOne({o_id})
        const my_order_details=orders
        await my_order.findOneAndUpdate({_id},
            {$push:{door_details:{
                door_id,door_type,door_colour,door_design,door_height,door_breadth,door_price
            }}})
            return my_order_details
    }
    static async Order_view(
        
    ){
        const order_view=await order.find({})
        return order_view
    }
}
module.exports=OrderController