import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'

import CategoryForm from '../../components/Form/CategoryForm'

import { Modal } from "antd";


const CreateCategory = () => {

  const[category,setCategory]=useState([])
  const[categoryname,setCategoryname]=useState("" )
  const[updatedname,setUpdatedname]=useState("")  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);


  const getAllCategory=async()=>{
    try{
 const res=await axios.get("http://localhost:8000/getcategory")
 if (res.data.success) {
  setCategory(res.data.getCategory)
}}
catch (error) {
console.log(error);

}
};


  useEffect(()=>{
getAllCategory()
  },[])
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const data={categoryname}
    try {
      const response = await axios.post("http://localhost:8000/createnew", data);
      console.log(response.data); // Log the response data here
    
      if (response && response.data) {
        console.log(response.data);
        console.log("success")
        getAllCategory()
        setCategoryname("")
      }

    } catch (err) {
      console.log(err);
    }

  }
  const handleDelete=async(id)=>{
    try{
    const del=await axios.delete(`http://localhost:8000/deletecategory/${id}`);
    console.log(del)
    getAllCategory()
  }

    catch(err){
      console.log(err)
    }
  }

  const handleEdit=(item,id,categoryname)=>{
    setUpdatedname(categoryname)
    setIsModalVisible(true)
    setSelected(item)
  }
const handleUpdate=async(e)=>

  {
    e.preventDefault()
try{
    const data={categoryname:updatedname}

   const res=await axios.put(`http://localhost:8000/updatecategory/${selected._id}`,data)
    if(res.data.success){
      console.log("success")
      setSelected(null)
      setIsModalVisible(false)
      getAllCategory()
   
    }}
catch(err){
  console.log(err)
}  }
  return (
    <div>
       
        <Layout>
        <div className='container-fluid'>
          <div className='container p-5 border'>
    <div className='row'>
    <div className='col-md-3 '>
        <AdminMenu></AdminMenu>
    </div>
    <div className='col-md-9 text-center'>
        <h3>Create category</h3>
<CategoryForm handleSubmit={handleSubmit} categoryname={categoryname} setCategoryname={setCategoryname}></CategoryForm>
       
        <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((item) => (
                    <>
                      <tr>
                        <td key={item._id}>{item.categoryname}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={()=>handleEdit(item,item._id,item.categoryname)}
                            
                            
                            >edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(item._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
     
    </div>

    <Modal
  open={isModalVisible}
  onCancel={()=>  setIsModalVisible(false)}
  footer={null}
> 
 <CategoryForm categoryname={updatedname} setCategoryname={setUpdatedname} handleSubmit={handleUpdate}></CategoryForm>
</Modal>
    
</div>
</div>

</div>


</Layout>   
        
        
    </div>
  )
}

export default CreateCategory