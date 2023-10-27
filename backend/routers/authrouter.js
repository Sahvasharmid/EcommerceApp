const express=require("express")
const router=express.Router()
const {verifytoken,isAdmin}=require("../middlewares/authMiddleware")
const {registerController,loginController, protectedController,forgotPasswordController, adminController,updateProfileController} = require("../controllers/authController")



router.post("/login",loginController)
router.post("/register",registerController)

router.get("/privateroute",verifytoken,protectedController)
router.post("/forgotpassword",forgotPasswordController)
router.get("/adminroute",verifytoken,isAdmin,adminController)
router.put("/profile", verifytoken, updateProfileController);

module.exports=router