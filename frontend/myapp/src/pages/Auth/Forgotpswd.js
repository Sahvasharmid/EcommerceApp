import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
const Forgotpassword = () => {
  const[email,setEmail]=useState("")
  const[newpassword,setpassword]=useState("")
const[answer,setanswer]=useState("")
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{

    e.preventDefault()
      const data={email,newpassword,answer}
      try{
    const response=  await axios.post("http://localhost:8000/forgotpassword",data)
   
      if (response.status === 200) {
          
          console.log("reset successful");
         navigate("/login")
        }
        
      }
      

      

      catch(err){
          console.log(err)
      }
  }
  return (
    <div>


<div className='container-fluid bgclr'>
<Layout title={"signin-EcommerceApp"}> 
    <div className='container main'>
        <form  className='form'>
    <h3 className='center'>LOGIN</h3>
        
        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" class="form-control" id="email"  value={email}  onChange={(e)=>setEmail(e.target.value)}></input>
        </div>
        <div className="form-group">
            <label htmlFor="newpassword">password:</label>
            <input type="password" class="form-control" id="newpassword"  value={newpassword}  onChange={(e)=>setpassword(e.target.value)} required></input>
        </div>
        <div className="form-group">
            <label htmlFor="answer">answer:</label>
            <input type="answer" class="form-control" id="answer"  value={answer}  onChange={(e)=>setanswer(e.target.value)} required></input>
        </div>
      
     <button type="submit" class="btn btn-primary btnsign" onClick={handleSubmit}>Resetpassword</button>

     
    </form>
    </div>
    </Layout>
    </div>
   
    </div>
  )
}

export default Forgotpassword