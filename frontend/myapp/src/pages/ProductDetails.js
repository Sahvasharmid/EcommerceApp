import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useCart } from "../utils/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const[cart,setCart]=useCart()
  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/getsingleproduct/${params.slug}`
      );
      setProduct(data.singleProd);
      getSimilarProduct(data.singleProd._id, data.singleProd.Category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
        <img
  src={product._id ? `http://localhost:8000/getproductphoto/${product._id}` : ''}
  className="card-img-top"
  alt={product.name}
  height="300"
  width={"350px"}
/>
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : ${product.price}</h6>
          <h6>Category : {product?.Category?.categoryname}</h6>
          <button class="btn btn-secondary ms-1" onClick={()=>{setCart([...cart,product]);   localStorage.setItem(  "cart",
                        JSON.stringify([...cart, product])
                      );console.log("cart",cart)}}>ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <Link to={`/product/${p.slug}`} style={{textDecoration:"none"}}>
              <img
                src={`http://localhost:8000/getproductphoto/${p._id}` } 
                className="card-img-top"
                alt={p.name}
                style={{ width: "100%", height: "300px", objectFit: "contain" }}
              />
              <div className="card-body" style={{color:"black"}}>
              
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> $ {p.price}</p>
                </div>
                
    </Link>
              </div>
            
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;