import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
       
        <div className='text-center'>
        <div class="list-group border">

        <h4>Admin Panel</h4>
      <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action p-2 border">create category</NavLink>
  <NavLink to="/dashboard/admin/create-products" className="list-group-item list-group-item-action p-2 border">create product</NavLink>
  <NavLink to="/dashboard/admin/productlist" className="list-group-item list-group-item-action p-2 border">ProductList</NavLink>
  

</div>
</div>
    </>
  )
}

export default AdminMenu