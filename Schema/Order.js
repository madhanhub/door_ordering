const mongoose=require('mongoose')
const order=new mongoose.Schema({

    u_id:{
        type:String
    },
    p_id:{
        type:String
    },
    door_details:[{
        door_id:{
            type:String
        },
        door_type:{
            type:String,
        },
        door_colour:{
            type:String
        },
        door_design:{
            type:String
        },
        door_height:{
            type:Number
        },
        door_breadth:{
            type:Number
        },
        door_price:{
            type:Number
        }
    }],
})
module.exports=mongoose.model('Order',order)