import express from "express";
import {
  registerController,
  loginController,
  adminController,
  protectedController,
  forgotPasswordController,
  updateProfileController,

} from "../controllers/authController.js";
import { isAdmin,verifytoken } from "../middlewares/authMiddleware.js";

const router=express.Router()



router.post("/login",loginController)
router.post("/register",registerController)

router.get("/privateroute",verifytoken,protectedController)
router.post("/forgotpassword",forgotPasswordController)
router.get("/adminroute",verifytoken,isAdmin,adminController)
router.put("/profile", verifytoken, updateProfileController);

export default router;