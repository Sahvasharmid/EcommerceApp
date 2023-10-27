import React, { useContext } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { AuthContextProvider } from '../../utils/Authcontext'

const UserDashboard = () => {
  const[auth]=useContext(AuthContextProvider)
  return (
    <div>
      <Layout>
        <div className='container-fluid'>
          <div className='container p-5'>
              <div className='row'>
    <div className='col-md-3'>
        <UserMenu></UserMenu>
    </div>
    <div className='col-md-9 text-center'>
      <h6>username:{auth?.user?.username}</h6>
      <h6>email:{auth?.user?.email}</h6>

      <h6>address:{auth?.user?.address}</h6>
      <h6>phoneno:{auth?.user?.phoneno}</h6>
    </div> 
              </div>
            </div>
          </div>

      </Layout>

    </div>
  )
}

export default UserDashboard