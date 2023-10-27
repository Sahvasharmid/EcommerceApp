import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ProductList = () => {
 
const[products,setProducts]=useState([])
const getProducts=async()=>{
  try{
  const res=await axios.get("http://localhost:8000/getallproducts")
  if(res.data.success){
    console.log(res.data.getAllproducts)
    setProducts(res.data.getAllproducts)
  }
}
catch(err){
  console.log(err)
}    
  }


useEffect(()=>{
  getProducts()
},[])

  return (
    <>
 <Layout>
        <div className='container-fluid'>
        <div className='container p-5 border'>
    <div className='row'>
    <div className='col-md-3'>
        <AdminMenu></AdminMenu>
    </div>
    <div className='col-md-9 text-center'>
        <h3>All Products</h3>
      
        <div className='d-flex flex-wrap'>
        {products.map((item)=>(<>
     
                  
        <div key={item._id} class="card m-2" style={{width:"18rem"}}>
             
        <Link to={`/dashboard/admin/productlist/${item.slug}`}  style={{textDecoration:"none"}} >
  <img src={`http://localhost:8000/getproductphoto/${item._id}`} class="card-img-top border" style={{ width: "100%", height: "300px", objectFit: "contain" }} alt={item.name}></img>
  <div class="card-body">
    <h5 class="card-title">{item.name}</h5>
    <p class="card-text">{item.description.substring(0, 30)}...
    </p>
    <p class="card-text">shipping{item.shipping?"yes":"no"}</p>
 
  </div>
  </Link>
  </div>
  
    


        </>))}
      
</div>
</div>
</div>
</div>
</div>  
</Layout>

</>
  )
}

export default ProductList