import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add items : 

const addFood = async (req,res)=>{

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    try {
        await food.save();
        res.json({success:true,message:"Furniture Added"})
        
    } catch (error) {

        console.log(error)
        res.json({success:false,message:"Error"})
        
    }

}

//all list
const listFood = async (req,res) =>{
    try {
        const foods = await foodModel.find({})
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

//Removing 
const removeFood = async(req,res)=>{

    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Furniture removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}
const updateFood = async (req, res) => {
    const { id, name, description, price, category } = req.body;
    const updatedData = {
        name,
        description,
        price,
        category,
    };

    
    if (req.file) {
        const food = await foodModel.findById(id);
        
        
        if (food && food.image) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.error("Error deleting old image", err);
            });
        }

        updatedData.image = req.file.filename; 
    }

    try {
        const updatedFood = await foodModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedFood) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        res.json({ success: true, message: "Food item updated successfully", data: updatedFood });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating food item" });
    }
};
const searchFood = async (req, res) => {
    console.log("Search query received:", req.query.q); // Log the query parameter
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const products = await foodModel.find({
            name: { $regex: q, $options: "i" }
            
        });
        console.log("Search Results:", products);

        if (!products.length) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error("Error searching for products:", error);
        res.status(500).json({ message: "Server error" });
    }
};



export {addFood,listFood,removeFood,updateFood,searchFood}