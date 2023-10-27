const express=require("express")
const router=express.Router()
const {CategoryController,updateController, getCategoryController, getSingleCatgeory, deleteCategoryController,getCategoryProductController} = require("../controllers/CategoryController")
const { verifytoken, isAdmin } = require("../middlewares/authMiddleware")


router.post("/createnew",verifytoken,isAdmin,CategoryController)

router.put("/updatecategory/:id",verifytoken,isAdmin,updateController)

router.get("/getcategory",getCategoryController)
router.get("/getsinglecategory/:slug",getSingleCatgeory)
router.delete("/deletecategory/:id",verifytoken,isAdmin,deleteCategoryController)

module.exports=router