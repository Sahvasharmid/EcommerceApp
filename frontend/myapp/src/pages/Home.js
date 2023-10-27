import React, { useContext, useEffect ,useState} from 'react'
import Layout from '../components/Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'

import { Checkbox, Radio } from "antd";
import { Prices } from '../components/Prices';
import axios from 'axios'
import { useCart } from '../utils/CartContext';

const Home = () => {
  console.log("Home component rendered"); 
const navigate=useNavigate()
  const [radio, setRadio] = useState([]);
  const[products,setProducts]=useState([])
  const[categorylist,setCategoryList]=useState([])
  const[checked,setChecked]=useState([])
  const[total,setTotal]=useState(0)
  
  const[page,setPage]=useState(1)
  const[loading,setLoading]=useState(false)
  const getProducts=async()=>{
    console.log("getProducts function called");
    try{
      setLoading(true)
    const res=await axios.get(`http://localhost:8000/product/${page}`)
    console.log("product:", products.length);  
    if(res.data.success){
      setLoading(false)
      console.log(res.data.getAllproducts)
      setProducts(res.data.getAllproducts)
    
    }
  }
  catch(err){
    console.log(err)
    setLoading(false)
  }    
    }
    const getAllCategory= async()=>{
  
      try{
   const res=await axios.get("http://localhost:8000/getcategory")
   if (res.data.success) {
    setCategoryList(res.data.getCategory)
  }}
  catch (error) {
  console.log(error);
  
  }
  }
const handleFilter=(value,id)=>{
  let all=[...checked]
  if(value){
    all.push(id);
     console.log("all",all)
  }
  else{
    all=all.filter((item)=>item!==id)
  }
  setChecked(all)
}
const getTotal=async()=>{
  console.log("gettotal function called");
  try{
  const {data}=await axios.get("http://localhost:8000/product-count")
  setTotal(data.total)
  console.log("Total:", total);}


  catch(err){
    console.log(err)
  }
}
useEffect(()=>{
  getAllCategory()
  getTotal()
},[])

useEffect(() => {
  if (page === 1) return;
  loadMore();
}, [page]);
//load more
const loadMore = async () => {
  try {
    setLoading(true);
    const { data } = await axios.get(`http://localhost:8000/product/${page}`,{
    params: {
      radio: radio, // Include the current price filter
    },
  });
    // Check if there's new data received
    if (data.getAllproducts.length > 0) {
      setLoading(false);

      // Append the new products to the existing products list
      setProducts([...products, ...data.getAllproducts]);
      setPage(page + 1); // Increment the page number
    } else {
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

  useEffect(()=>{
    

    if(!checked.length||!radio.length)
    getProducts()
   
  },[!checked.length,!radio.length])

  useEffect(()=>{
    if(checked.length||radio.length)
    productFilter()
  },[checked,radio])
  const productFilter=async()=>{
    try{
const {data}=await axios.post("http://localhost:8000/product-filters",{checked,radio})
setProducts(data.products)}
catch(err){
  console.log(err)
}
  }
  return (
    <>
       
      {/*<p>{JSON.stringify(auth,null,4)}</p>*/}
      <Layout title={"ALl Products - Best offers "}>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h6 className='text-center'>Filter By Category</h6>
          <div className="d-flex flex-column">

          {categorylist.map((c)=>(<>
         
        <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>{c.categoryname}</Checkbox>
           
          </>))}
        </div>
        <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
         
              {Prices?.map((p) => (<>
           
                <div key={p._id}>
                   
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
</>

              ))}
            </Radio.Group>
          </div>
        
          <div className="d-flex flex-column">
               
    <button class="btn btn-danger ms-1" onClick={()=>window.location.reload()}>RESET</button>
          </div>

          </div>
          <div className="col-md-10">
          <h4 className="text-center">ALL PRODUCTS</h4>
        
          <div className='d-flex flex-wrap'>

          {products.map((item)=>(<>
           { console.log("Product ID:", item._id)}
            {console.log("Products Length:", products.length)}
            {console.log("Total:", total)}

                      {console.log(item.price)} {/* Log item.price */}

        <div key={item._id} class="card m-2" style={{width:"18rem"}}>
          <Link to={`/product/${item.slug}`} style={{textDecoration:"none"}}>
  <img src={`http://localhost:8000/getproductphoto/${item._id}`} class="card-img-top border"    style={{ width: "100%", height: "300px", objectFit: "contain" }} alt={item.name}></img>
 
  <div class="card-body">


    <h5 class="card-title">{item.name.substring(0,25)}...</h5>
    <p class="card-text">{item.description.substring(0, 30)}...
    </p>
    <p class="card-text">shipping:{item.shipping?"yes":"no"}</p>
    <h5 class="card-text">price:${item.price}</h5>
   


  </div>
  </Link>
  </div>
       


        </>))}
      
        </div>
        
          
          <div className="m-2 p-3">
            {radio.length === 0 && products && products.length<total && (
         <p className='center'>  <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button></p>
            )}
          </div>
          </div>
          </div>
      
        </Layout>
    </>
  )
}

export default Home