import React, { useEffect, useState ,useContext} from 'react'
import { AuthContextProvider } from '../utils/Authcontext'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import Spinner from '../components/Spinner'
const AdminRouter = () => {
    const[ok,setOk]=useState(false)
    const [auth]=useContext(AuthContextProvider)
    useEffect(()=>{
        const authcheck=async()=>{
           try{
const res=await axios.get("http://localhost:8000/adminroute")
console.log(res)
if(res.data.ok){
    setOk(true)
}
else{
    setOk(false)
}
           }

           catch(err){
            console.error('An error occurred:', err);
          }}
          if (auth?.token) authcheck();
        }, [auth?.token]);
return ok?<Outlet></Outlet>:<Spinner></Spinner>
    }
export default AdminRouter