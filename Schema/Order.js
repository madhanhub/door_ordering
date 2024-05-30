const mongoose=require('mongoose')
const order=new mongoose.Schema({

    u_id:{
        type:String
    },
    p_id:{
        type:String
    },
    
        door_id:{
            type:String
        },
        quantity:{
            type:Number
        },
        door_price:{
            type:Number
        },
       total:{
            type:Number
        }
})
module.exports=mongoose.model('Order',order)