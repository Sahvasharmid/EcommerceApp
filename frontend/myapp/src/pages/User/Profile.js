import { useState,useEffect ,useContext} from 'react'
import React from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios'
import Layout from '../../components/Layout/Layout'
import { AuthContextProvider } from '../../utils/Authcontext'

const Profile = () => {
        const[username,setUsername]=useState("")//same name as the backend
        const[phoneno,setPhn]=useState("")
        const[address,setAddress]=useState("")
        const[email,setEmail]=useState("")
        const[password,setpassword]=useState("")
        const [auth,setAuth]=useContext(AuthContextProvider)
        useEffect(() => {
            const { email, name, phoneno, address } = auth?.user;
            setUsername(name);
            setPhn(phoneno);
            setEmail(email);
            setAddress(address);
          }, [auth?.user]);
        
   
    const handleUpdate = async (e) => {
        e.preventDefault();
    
        try {
            const {data} = await axios.put("http://localhost:8000/profile", { username, email, phoneno,password, address });
        
            setUsername("");
            setEmail("");
            setPhn("");
           setpassword("")

            setAddress("");
          
            if(data?.success){
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
    
            }
    
    
          } catch (error) {
            console.log("Error during signup:", error);
            
          }
          
      };
      return (
        
    <div>
        <Layout>
        <div className='container-fluid'>
            <div className='container p-4'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu></UserMenu>
                    </div>
                    <div className='col-md-9'>
                     <h3 className='center'>User profile</h3>
                        <div className='container-fluid bgclr'>
    
    <div className='container main' >
    <form onSubmit={handleUpdate}  className='forms'>
   
       
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" class="form-control" id="name"  value={username}   onChange={(e)=>setUsername(e.target.value)}required></input>
            </div>
            <div className="form-group">
                <label htmlFor="name">Phone:</label>
                <input type="text" class="form-control" id="name"  value={phoneno}   onChange={(e)=>setPhn(e.target.value)}required></input>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" class="form-control" id="email"  value={email}  onChange={(e)=>setEmail(e.target.value)} disabled></input>
            </div>
            <div className="form-group">
                <label htmlFor="email">Password:</label>
                <input type="password" class="form-control" id="email"  value={password}  onChange={(e)=>setpassword(e.target.value)}></input>
            </div>
            <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input type="text" class="form-control" id="address"  value={address} onChange={(e)=>setAddress(e.target.value)} required></input>
            </div>
           
          
         <button type="submit" className="btn btn-primary btn-sign mt-3 w-100">Update</button>

        </form>
     

</div>
</div>

                    </div>
                </div> 
            </div>
        </div>
        </Layout>
    </div>
  )
}

export default Profile