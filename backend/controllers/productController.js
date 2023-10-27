const fs=require("fs")
const ProductSet = require("../models/ProductDetailsModel")
const CategoryDetails = require("../models/createcat")
const slugify = require('slugify'); 
const mongoose=require("mongoose")
const createProdController=async(req,res)=>{
        try {
          const { name, description, price, Category, quantity,shipping} =
            req.fields;
          const { photo } = req.files;
          if (!mongoose.Types.ObjectId.isValid(Category)) {
            return res.status(500).send({ error: "Invalid Category ID" });
          }
      
          switch (true) {
            case !name:
              return res.status(500).send({ error: "Name is Required" });
            case !description:
              return res.status(500).send({ error: "Description is Required" });
            case !price:
              return res.status(500).send({ error: "Price is Required" });
            case !Category:
              return res.status(500).send({ error: "Category is Required" });
            case !quantity:
              return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
              return res
                .status(500)
                .send({ error: "photo is Required and should be less then 1mb" });
          }
    
          const products = new ProductSet({ ...req.fields, slug: slugify(name) });
          if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
          }
          await products.save();
          res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            error,
            message: "Error in crearing product",
          });
        }
      };
      
      //get all products
      const getAllproductsController=async(req,res)=>{
        try{
        const getAllproducts=await ProductSet.find({}).select("-photo").populate("Category").sort({createdAt:-1})
        res.status(200).send({success:true,getAllproducts,  counTotal: getAllproducts.length})}
        catch(err){
          return res.status(500).send(err)
        }
      }
      const getSingleprodController=async(req,res)=>{
        const{slug}=req.params
        const singleProd=await ProductSet.findOne({slug}).populate("Category")
        if(!singleProd){
          res.status(400).send({message:"not found",success:false})
        }
        else{
          res.status(200).send({success:true,message:"product found",singleProd})
        }
      }
      const productPhotoController = async (req, res) => {
        const{id}=req.params
        try {
          const product = await ProductSet.findById(id).select("photo")
          if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
          }
      
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
          });
        }
      };
      const deleteProductController=async(req,res)=>{
        const {id}=req.params
        try{

        const delProd=await ProductSet.findByIdAndDelete(id).select("-photo")
      if(delProd){
        return res.status(200).send({message:"Deleted",delProd})
      }
      }
      catch(err){
        res.status(500).send(err)
      }
      }
      const deleteAllProductsController = async (req, res) => {
        try {
          
          await ProductSet.deleteMany({});
          console.log('All products deleted');
      
          res.status(200).send({
            success: true,
            message: 'All products deleted successfully',
          });
        } catch (error) {
          console.error('Error:', error);
          res.status(500).send({
            success: false,
            error,
            message: 'Error while deleting all products',
          });
        }
      };
      
      module.exports = {
        // ...other controllers
        deleteAllProductsController: deleteAllProductsController,
      };
      
      const UpdateProdController=async(req,res)=>{
        try {
          const {id}=req.params
          const {name, description, price, Category, quantity} = req.fields;
          const { photo } = req.files;
        switch (true) {
            case !name:
              return res.status(500).send({ error: "Name is Required" });
            case !description:
              return res.status(500).send({ error: "Description is Required" });
            case !price:
              return res.status(500).send({ error: "Price is Required" });
            case !Category:
              return res.status(500).send({ error: "Category is Required" });
            case !quantity:
              return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
              return res
                .status(500)
                .send({ error: "photo is Required and should be less then 1mb" });
          }
      
          const products = await ProductSet.findByIdAndUpdate(id,{...req.fields, slug: slugify(name) },{new:true})
          if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
          }
          await products.save(); // Save the updated product
          return res.status(201).send({
            success: true,
            message: "Product updated Successfully",
            products,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            error,
            message: "Error in updating product",
          });
        }
      };
      
      const productFilterController = async (req, res) => {
        try {
          const { radio, checked } = req.body;
          const args = {};
      
          if (checked.length > 0) args.Category = checked;
      
          if (radio.length) args.price = {$gte:radio[0],$lte:radio[1]};
         
      
          const products = await ProductSet.find(args);
      
          res.status(200).send({
            success: true,
            products,
          });
        } catch (err) {
          res.status(400).send({
            success: false,
            message: "Error While Filtering Products",
            err,
          });
        }
      };
      
        
      const productCountController=async(req,res)=>{
        try{
const total=await ProductSet.find({}).estimatedDocumentCount()
res.status(200).send({success:true,total})}
catch(err){
  console.log(err)
}
      }
const productPageController=async(req,res)=>{
  try{
const itemsperpage=6;
const page=req.params.page?req.params.page:1
const getAllproducts=await ProductSet.find({}).select("-photo"). skip((page - 1) * itemsperpage).sort({createdAt:-1}).limit(itemsperpage)
res.status(200).send({
  success: true,
 getAllproducts
});
  }
  catch(err){
    console.log(err)
  }
}

 const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await ProductSet
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }

 }
const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await ProductSet
      .find({
        Category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("Category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};
const getCategoryProductController=async(req,res)=>{
  const {slug}=req.params
  try{
    const category = await CategoryDetails.findOne({ slug });

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    
    const products = await ProductSet.find({Category:category._id} ).populate("Category");
    
res.status(200).send({
  success: true,
  category,
  products,
});
} catch (error) {
console.log(error);
res.status(400).send({
  success: false,
  error,
  message: "Error While Getting products",
});
}
};
module.exports={createProdController:createProdController,
getAllproductsController:getAllproductsController,
getSingleprodController:getSingleprodController,
productPhotoController:productPhotoController,
deleteProductController:deleteProductController,
UpdateProdController:UpdateProdController,
deleteAllProductsController: deleteAllProductsController,
productFilterController:productFilterController,
productCountController:productCountController,
productPageController:productPageController,
searchProductController:searchProductController,
realtedProductController:realtedProductController,
getCategoryProductController:getCategoryProductController
}