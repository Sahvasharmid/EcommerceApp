import React, { useContext, useEffect, useState } from 'react'
import { AuthContextProvider } from '../utils/Authcontext'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Outlet } from "react-router-dom";

 function PrivateRouter() {
  const [ok, setOk] = useState(false);
  const [auth] = useContext(AuthContextProvider)

  useEffect(() => {
    const authCheck = async () => {
      try{
      const res = await axios.get("http://localhost:8000/privateroute");
       console.log(res.data)
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    }
    catch(err){
      console.error('An error occurred:', err);
    }}
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner/>;
}

export default PrivateRouter;