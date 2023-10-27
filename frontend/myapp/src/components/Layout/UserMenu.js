import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
       
        <div className='text-center'>
        <div class="list-group border">

        <h4>User Panel</h4>
      <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action p-2 border">Update Profile</NavLink>

  
</div>
</div>
    </>
  )
}

export default UserMenu