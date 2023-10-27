import React from 'react'

const CategoryForm = ({handleSubmit,categoryname,setCategoryname}) => {
  return (
     <form onSubmit={handleSubmit}>
     <div className="mb-3">
       <input
         type="text"
         className="form-control"
         placeholder="Enter new category"
         value={categoryname}
         onChange={(e) => setCategoryname(e.target.value)}
       />
     </div>

     <button type="submit" className="btn btn-primary">
   Submit
     </button>
   </form>
  )
}

export default CategoryForm