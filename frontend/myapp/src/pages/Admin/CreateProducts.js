import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { Select } from 'antd'
const { Option } = Select;

const CreateProducts = () => {
  const[name,setName]=useState("")
  const[description,setDescription]=useState("")
  const[price,setPrice]=useState("")
  const[Category,setCategory]=useState("")
  const[quantity,setQuantity]=useState("")
  const[categorylist,setCategoryList]=useState([])
  const[photo,setphoto]=useState("")
  const[shipping,setShipping]=useState(false)

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
  getAllCategory()
  },[])
  const handleCreate=async()=>{
  
      try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        productData.append("photo", photo);
        productData.append("Category", Category);

        productData.append("shipping",shipping)
        const {data} = await axios.post("http://localhost:8000/createproduct",
          productData
          
        );
        if (data?.success) {
console.log("success")
console.log(data)

        } 
      } catch (error) {
        console.log(error);
        
      }
    };
        

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
        <h3>Create Product</h3>
     
              <Select
                 showSearch
                
                placeholder="Select a category"
                size="large"
 style={{ width: '100%' }}
                onChange={(value) => {
              setCategory(value);

                }}
                optionFilterProp="children" // Search based on children (option text)
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) === 0
                   }
                   
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
                    onChange={(e) => setphoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
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
              <label>Shipping:</label>
        <select value={shipping} onChange={(e) => setShipping(e.target.value === 'true')}>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
        </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
</div>     
    </div>
    </div>
    </div>
</div>
</Layout>
</>
  )
}

export default CreateProducts