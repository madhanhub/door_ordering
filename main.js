const express=require('express')
const app=express()
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyparser=require('body-parser')
require('dotenv').config()
const jsonwebtoken=require('jsonwebtoken')

const admin=require('./Schema/Admin')
const product=require('./Schema/Product')
const user=require('./Schema/user_register')
const order=require('./Schema/Order')
const my_order=require('./Schema/My_order')

const AdminController=require('./controllers/AdminControllers')
const ProductController=require('./controllers/ProductController')
const UserController = require('./controllers/UserController')
const OrderController = require('./controllers/OrderController')

const authorization=require('./function/auth')
const cors=require('./function/cors')


app.use(express.json())
app.use(morgan('dev'))
app.use(bodyparser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors)
app.listen(7777,()=>{
    console.log('SERVER Run')

	mongoose.set('strictQuery', false)
	
	mongoose
		.connect(`mongodb+srv://madhan91101:Mcabca%409@klncollege.ab2hmvj.mongodb.net/`
			
		// 	, {
		// 	useNewUrlParser: true,
		// 	useUnifiedTopology: true,
)
		.then(() => {
			conn = mongoose.connection
			console.log('database Connected')
		})
		.catch((error) => {
			console.log('Error connecting to MongoDB:', error)
		})
})

app.get('/',(req,res)=>{
    res.json('lets goo')
})

app.post('/admin',async(req,res)=>{
    try{
        const{a_name,a_mailId, a_password}=req.body
        const new_admin=await AdminController.New_admin(
            a_name,
            a_mailId,
            a_password
        )
        res.status(200).json({message:'admin register',data:new_admin})
    }catch(error){
        res.status(500).json({message:'register in valid'})
    }
})
app.post('/admin/login',async(req,res)=>{
    try{
    
        const{a_mailId,a_password}=req.body
        
        
        const login=await AdminController.Admin_login(
            a_mailId,
            a_password
        )
        if(login){
            {
                let token=await jsonwebtoken.sign({id:login.id,a_name:login.a_name,a_mailId:login.a_mailId},process.env.SECRET)
                res.setHeader('token',token)
                res.setHeader('id',login.id)
                res.setHeader('a_name',login.a_name)
                res.setHeader('a_mailId',login.a_mailId)
                res.status(200).json({message:'admin login',data:token})
            }
        }
        
    }catch(error){
        res.status(500).json({message:'invalid email/password'})
    }
})
app.post('/admin/delete',authorization,async(req,res)=>{
    try{
        const _id=req.body
        const a_delete=await AdminController.Admin_delete(_id)
        res.status(200).json({message:'admin deleted',data:a_delete})
    }catch(error){
        res.status(500).json({message:'something wrong'})
    }
})
app.post('/products',async(req,res)=>{
    try{
        const {a_id}=req.body
        const product=await ProductController.Product(a_id)
        res.status(200).json({message:'product',data:product})
    }catch(error){
        res.status(500).json({message:'something wrong'})
    }
})
app.post('/product/add',authorization,async(req,res)=>{
    try{
        const {_id,door_id,door_type,door_colour,door_design,door_height,door_breadth,door_price}=req.body
        const Product=await ProductController.Product_add(
           _id,door_id,door_type,door_colour,door_design,door_height,door_breadth,door_price
    )
            res.status(200).json({message:'product added',data:Product})
    }catch(error){
        res.status(500).json({message:'something wrong'})
    }
})
app.post('/product/delete',async(req,res)=>{
    try{
        const {_id,door_id}=req.body
        const p_delete=await ProductController.Product_delete(
            _id,door_id
        )
            res.status(200).json({message:'prodect deleted',data:p_delete})
    }catch(error){
        res.status(500).json({message:'something wrong'})
    }
})
app.post('/product/update',async(req,res)=>{
    try{
        const{_id,door_id,door_price}=req.body
        const p_update=await ProductController.Product_update(
            _id,door_id,door_price
        )
            res.status(200).json({message:'product updated',data:p_update})
    }catch(error){
        res.status(500).json({message:'Something wrong'})
    }
})
app.get('/product',async(req,res)=>{
    const list=await ProductController.product_list({})
    res.send({message:'product list',data:list})
    
})
app.post('/user/register',async(req,res)=>{
    try{
        const{user_name,user_address,user_mobile,user_mailId,user_password}=req.body
        const existing_user=await user.findOne({user_mailId})
        if(existing_user){
            return res.status(400).json({message:'user already exist'})
        }
        const user_register=await UserController.User_Register(
            user_name,user_address,user_mobile,user_mailId,user_password
        )
        res.status(200).json({message:'new user register',data:user_register})
    }catch(error){
        res.status(500).json({message:'user invalid'})
    }
})
app.post('/user/login',async(req,res)=>{
    try{
        const{user_mailId,user_password}=req.body
        const u_login=await UserController.User_login(
            user_mailId,user_password
        )
        if(u_login){
            {
                let token=await jsonwebtoken.sign({id:u_login.id,user_name:u_login.user_name,user_mailId:u_login.user_mailId},process.env.SECRET)
                res.setHeader('token',token)
                res.setHeader('id',u_login.id)
                res.setHeader('user_name',u_login.user_name)
                res.setHeader('user_mailId',u_login.user_mailId)
                
                res.status(200).json({message:'user login',data:token})
            }
        }
        
    }catch(error){
        res.status(500).json({message:'invalid user'})
    }
})
app.get('/product/view',async(req,res)=>{
    const door_id=req.params
    const list=await UserController.product_list(door_id)
    res.send({message:'product list',data:list})
    
})
app.post('/product/view/one',async(req,res)=>{
    const _id=req.body
    const list=await UserController.product_list_one(_id)
    res.send({message:'product list',data:list})
    
})
app.post('/order',authorization,async(req,res)=>{
    try{

        const{p_id,door_id,quantity}=req.body
        const u_id=req.id
        const new_order=await OrderController.New_order(
            u_id,p_id,door_id,quantity
        )
        
        res.status(200).json({message:'order placed',data:new_order})
    }catch(error){
        res.status(500).json({message:'order failed'})
    }
})
app.post('/order/cancle',async(req,res)=>{
    try{
            const o_cancle=await OrderController.Order_cancle({
                _id:req.body._id
    })
    res.status(200).json({message:'order cancle',data:o_cancle})
    }catch(error){
        res.status(500).json({message:'something wrong'})
    }
})
app.post('/myorder',async(req,res)=>{
    try{
        const {order_id,door_details}=req.body
        const myorder=await OrderController.My_order(
           order_id,door_details
        )
        res.status(200).json({success:true,message:'MY orders',data:myorder})
    }catch(error){
        res.status(500).json({message:'something wrong'})
    }
})
app.post('/myorder/details',async(req,res)=>{
    try{
       const products=await product.findOne({_id:req.body._id,'door_details.door_id':req.body.door_id},
       {'door_details.$':1})
       const my_order_details=products.door_id
       await my_order.findOneAndUpdate({_id:req.body._id},
        {$push:{door_details:{door_id:req.body.door_id}}},
        {new:true})
        res.status(200).json({message:'MY orders',data:my_order_details})
    }catch(error){
        res.status(500).json({message:'something wrong'})
    }
})
app.post('/order/view',async(req,res)=>{
    try{
        const admin_places=await OrderController.Order_view({})
        res.status(200).json({message:'order view',data:admin_places})
    }catch(error){
        res.status(500).json({message:'something wrong'})
    }
})