const express = require("express");
const app = express();
const User = require("./models/usermodel")
const catrouter=require("./routers/catrouter")
const authrouter = require("./routers/authrouter")
const prodrouter=require("./routers/prodrouter")
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB=require("./config/db")
const path=require("path")
dotenv.config();
connectDB();
app.use(express.json());
app.use(express.json( { extended: true} ));
app.use(express.static(path.join(__dirname,'./frontend/myapp/build')))
// Middleware to handle CORS
app.use(cors());
 
// Define your routes after setting up CORS headers

app.use("/", authrouter);
app.use("/",catrouter)
app.use("/",prodrouter)
// Start the server
app.get("*",function(req,res){
res.sendFile(path.join(__dirname,"./frontend/myapp/build/index.html"))
})
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
