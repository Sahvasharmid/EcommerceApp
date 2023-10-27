import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { AuthContextProvider } from '../../utils/Authcontext'
import { useContext } from 'react'
const AdminDashboard = () => {
  const [auth]=useContext(AuthContextProvider)

  return (
   <div>
      <Layout title={"Admin-Dashboard-Ecommerce"}>
        <div className='container-fluid'>
          <div className='container p-5 border'>
    <div className='row'>
    <div className='col-md-3'>
        <AdminMenu></AdminMenu>
    </div>
    <div className='col-md-9 text-center'>
      <h1>details</h1>
     <h6>username:{auth?.user?.username} </h6>
     <h6>email:{auth?.user?.email} </h6>
     <h6>phoneno:{auth?.user?.phoneno} </h6>
     <h6>addres:{auth?.user?.address}</h6>
    </div>
    </div>
</div>
</div>
</Layout>   
</div>
  )

}
export default AdminDashboard
