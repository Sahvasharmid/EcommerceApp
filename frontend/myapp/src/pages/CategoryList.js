import axios from 'axios'
import Layout from '../components/Layout/Layout'

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../utils/CartContext';
import { Link } from 'react-router-dom';
const CategoryList = () => {
    const {slug}=useParams()
const[products,setProduct]=useState([])
const[category,setCategory]=useState([])
const[cart,setCart]=useCart()
const navigate=useNavigate()
    useEffect(()=>{
        if(slug)
getProducts()
    },[slug])
    const getProducts = async () => {
        const { data } = await axios.get(`http://localhost:8000/categories/${slug}`);
        setProduct(data.products);
        setCategory(data.category);
        console.log(data);
    };
  return (
    <Layout>
    <div className="container mt-3">
      <h4 className="text-center">Category - {category?.categoryname}</h4>
      <h6 className="text-center">{products?.length} result found </h6>
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div
                className="card m-2"
                style={{ width: "18rem" }}
                key={p._id}
              >
                          <Link to={`/product/${p.slug}`} style={{textDecoration:"none"}}>
                <img
                  src={`http://localhost:8000/getproductphoto/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ width: "100%", height: "300px", objectFit: "contain" }} 
                />
                
                <div className="card-body">
               
                  <h5 className="card-title">{p.name}</h5>

                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <h5 className="card-text"> $ {p.price}</h5>
                  </div>
</Link>
                </div>
            
            ))}
          </div>
       
        </div>
      </div>
    </div>
  </Layout>

  )
}

export default CategoryList