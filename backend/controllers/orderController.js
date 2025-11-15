import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import dotenv from 'dotenv';
import Stripe from "stripe"
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order for frontend

const placeOrder = async(req,res)=>{

    const frontend_url = "http://localhost:5174";

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name

                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,

        })

        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const verifyOrder = async(req,res)=>{
    const {orderId,success} = req.body;
    try {
        if (success=="true") 
            {
                await orderModel.findByIdAndUpdate(orderId,{payment:true});
                res.json({success:true,message:"Paid"})
            
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
        res.json({success:false,message:"Not paid"})
        }
    } catch (error) {
        console.log("Error");
        res.json({success:false,message:Error})


        
        
    }
}

// user order for frontend

const userOrder = async(req,res) =>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }


}
// listing orders for administrator panel
const listOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})

    }
}

// api for updating order{
const updateStatus = async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}
const updateOrderDetails = async (req, res) => {
    const { orderId } = req.params;  
    const updatedData = req.body;    
  
    try {
      
      const updatedOrder = await orderModel.findByIdAndUpdate(orderId, updatedData, { new: true });
      
      if (!updatedOrder) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
  
      res.json({ success: true, data: updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to update order" });
    }
  };
  
  
  const deleteOrder = async (req, res) => {
    const { orderId } = req.params; 
  
    try {
      const deletedOrder = await orderModel.findByIdAndDelete(orderId);
      if (!deletedOrder) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
      res.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to delete order" });
    }
  };
  
  

export {placeOrder,verifyOrder,userOrder,listOrders,updateStatus,updateOrderDetails,deleteOrder}