const admin=require('../Schema/Admin')
const product=require('../Schema/Product')
class ProductController{
   static async Product(
    a_id
   ){
    const pro=await product({a_id
    }).save()
    return pro
   }
   static async Product_add(
     _id, door_id,door_type,door_colour,door_design,door_height,door_breadth,door_price
   ){
      const product_add=await product.findOneAndUpdate({_id},
         {$push:{door_details:{
            door_id,door_type,door_colour,door_design,door_height,door_breadth,door_price
         }}})
         return product_add
   }
   static async Product_delete(
      _id,door_id
   ){
      const p_delete=await product.findOneAndUpdate({_id},
         {$pull:{door_details:{door_id}}})
         return p_delete
   }
   static async Product_update(
      _id,door_id,door_price
   ){
      const P_update=await product.findOneAndUpdate({_id,'door_details.door_id':door_id},
      {$set:{'door_details.$.door_price':door_price}})
      return P_update
   }
   static async product_list(
      _id
   ){
      const p_list=await product.find({})
   return p_list
   }
   
}
module.exports=ProductController