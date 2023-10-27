import React, { createContext, useState,useEffect } from 'react'

import axios from 'axios'
export const AuthContextProvider=createContext()
const Authcontext = (props) => {
    const[auth,setAuth]=useState({
        user:null,
        token:""
 })
 useEffect(()=>{
  const data=localStorage.getItem('auth')

  if(data){
    const parsedata=JSON.parse(data)
    axios.defaults.headers.common['Authorization'] = `Bearer ${parsedata.token}`;
    setAuth({...auth,user:parsedata.loginresult,token:parsedata.token})
    console.log("Authentication Token in Home Component:", auth?.token)
  }},[]
 )
  return (
    <div>
<AuthContextProvider.Provider value={[auth,setAuth]}>
    {props.children}

</AuthContextProvider.Provider>
    </div>
  )
}

export default Authcontext 