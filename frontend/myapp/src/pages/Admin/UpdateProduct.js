import axios from 'axios'
import React, {useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminMenu from '../../components/Layout/AdminMenu'
import { Select } from 'antd'
const { Option } = Select;
const UpdateProduct = () => {
  const[name,setName]=useState("")
  const[description,setDescription]=useState("")
  const[price,setPrice]=useState("")
  const[Category,setCategory]=useState("")
  const[quantity,setQuantity]=useState("")
  const[categorylist,setCategoryList]=useState([])
  const[shipping,setShipping]=useState("")  
    const[photo,setPhoto]=useState("")
  const[id,setid]=useState("")
  const params=useParams()
  const navigate=useNavigate()
  const getSingleProduct= async()=>{
  
      try{
   const res=await axios.get(`http://localhost:8000/getsingleproduct/${params.slug}`)
   if(res.data.success){
    setName(res.data.singleProd.name)
    setDescription(res.data.singleProd.description)
    setPrice(res.data.singleProd.price)
    setQuantity(res.data.singleProd.quantity)
setid(res.data.singleProd._id)
setCategory(res.data.singleProd.Category._id)
setShipping(res.data.singleProd.shipping)

   }
    
    } 

  
      
  catch (error) {
  console.log(error);
  
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
  useEffect(()=>{
  getSingleProduct()
  getAllCategory()

  },[])
  const handleUpdate=async(e)=>{
  e.preventDefault()
      try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
       photo &&  productData.append("photo", photo);
        productData.append("Category", Category);
        const {data} = await axios.put(`http://localhost:8000/updateproduct/${id}`,
          productData
          
        );
        if (data?.success) {
console.log("success")
navigate("/dashboard/admin/productlist");
        } 
      } catch (error) {
        console.log(error);
        
      }
    };
        
const handleDelete=async()=>{
  try {
    const { data } = await axios.delete(`http://localhost:8000/deleteproduct/${id}`);
    console.log(data); // Log the server response to the console
    if (data.message === "Deleted") {
      console.log("Product deleted successfully");
      navigate("/dashboard/admin/productlist");
   
    } else {
      console.log("Product deletion failed");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
  
}  
  return (
    <div>
        <div className='container-fluid'>
          <div className='container p-5 border'>
    <div className='row'>
    <div className='col-md-3'>
        <AdminMenu></AdminMenu>
    </div>
    <div className='col-md-9 text-center'>
       
     
              <Select
                 showSearch
                
                placeholder="Select a category"
                size="large"
 style={{ width: '100%' }}
                onChange={(value) => {
              setCategory(value)   }}
              
                optionFilterProp="children" // Search based on children (option text)
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) === 0
                  
                   }
                   value={Category} 
              >
                                

                {categorylist.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.categoryname}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:8000/getproductphoto/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3 mt-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            
            <div className='mb-3'>
            <Select
                 showSearch
                
                placeholder="Shipping"
                size="large"
 style={{ width: '100%' }}
 value={shipping}
 onChange={(e) => setShipping(e.target.value === 'true' )}
              
                optionFilterProp="children" // Search based on children (option text)
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) === 0
                  
                   }
               
              >
                                 <option value={false}>No</option>
          <option value={true}>Yes</option>
              
              </Select>
            </div>

                   
         
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                 Update PRODUCT
                </button>
</div>     
<div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>

    </div>
    
    </div>
    </div>
</div>
    </div>
    
  )
}

export default UpdateProduct