const User=require("../models/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const loginController=async(req,res)=>{
    const{email,password}=req.body
    try{
        
const loginresult=await User.findOne({email})
    if(!loginresult){
        return res.status(403).send('User not found');  
    }

  const match = await bcrypt.compare(password,loginresult.password);
  
    if (match) {
      const token=jwt.sign({_id:loginresult._id},"secretkey",{expiresIn:'24h'})

      return res.status(200).send({success:true,token:token,message:"success",loginresult:{email:loginresult.email,
        username:loginresult.username,
        phoneno:loginresult.phoneno,
        address:loginresult.address,
        role:loginresult.role
       }});
    } else {
      return res.status(401).send('Invalid credentials');
    
    }
  } 
      

    catch(err){
console.log(err)
    }
}
    const registerController=async(req,res)=>{
        const{username,email,password,phoneno,address,answer}=req.body
     
        try{
            if(!username||!email||!phoneno||!password||!address||!answer){
                return res.status(400).json("send all fields")       
             }


             const hashedPassword = await bcrypt.hash(password, 7);

        const Userobj=new User({username,email,password:hashedPassword,phoneno,address,answer})
        await Userobj.save()
        res.status(200).send({
            success:true,
            message:"user created",
            Userobj
        })
        }
        catch(err){
    return res.status(500).send({
        success:false,
        message:"error in registration",
        err
    })
        }
    }



      const protectedController=async(req,res)=>{
        res.status(200).json({ok:true})
      }
      const forgotPasswordController=async(req,res)=>{
try{const{email,newpassword,answer}=req.body
if(!email||!newpassword||!answer){
return  res.status(400).send("Send all fields")
}
const userResult=await User.findOne({email,answer})
if(!userResult){
 return res.status(401).send("user not found")
}

const hashedPassword = await bcrypt.hash(newpassword, 7);
const Updateresult=await User.findByIdAndUpdate(userResult._id,{password:hashedPassword})
return res.status(200).send({
  success:true,
  message:"password reset succesfull",
  Updateresult

})
}
catch(err){
 return res.status(500).send({
    success:false,
    message:"not success"
  })
}
      }
      const adminController=async(req,res)=>{
return res.status(200).json({ok:true})
      }
 const updateProfileController = async (req, res) => {
        try {
          console.log(req.users)
          const { username, email, password, address, phoneno } = req.body;
          const user = await User.findById(req.users._id);
          //password
          if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
          }
        const hashedPassword = await bcrypt.hash(password, 7);
        
          const updatedUser = await User.findByIdAndUpdate(
            req.users._id,
            {
              username: username || user.name,
              password: hashedPassword || user.password,
              phoneno: phoneno || user.phoneno,
              address: address || user.address,
            },
            { new: true }
          );
          res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
          });
        } catch (error) {
          console.log(error);
          res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
          });
        }
      };
module.exports={
    loginController:loginController,
    registerController:registerController,

    protectedController:protectedController,
    forgotPasswordController:forgotPasswordController,
    adminController:adminController,
    updateProfileController:updateProfileController
};