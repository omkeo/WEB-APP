import React, { useState } from 'react'
import axios from 'axios'
import './AddCategory.css'
import MessageBox from '../MessageBox'

function AddCategory({fetchCategories,toggleAddCategory,triggerMessage}) {
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('@@@@@@@', name);
    const response = await axios.post(`http://localhost:4000/categories/getbyname`, { name })


    if (response.status == 201) {
      triggerMessage('Category already exist','error')
    } else {
      const resp = await axios.post('http://localhost:4000/addcategory', { name, status })

      console.log(resp);

      if (resp.status == 200) {
        triggerMessage('Category added successfully','success')
        toggleAddCategory()
        fetchCategories()    
      }
      else {
        triggerMessage('Something went wrong','error')
         
      }

    }



  }

  return (
    <div className='parentContainer'>
      <div className="boxDiv">
        <div className="addCategoryDiv">
          <h2>Add Category</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="categoryName">Category Name :</label>
              <input type="text" value={name} className="form-control" id="categoryName" placeholder="Category Name"
                onChange={
                  (e) => setName(e.target.value)
                }
              /><br /><br />
              <label htmlFor="categoryStatus" className='statusLabel'>status :</label>
              <input type="radio" name="status" value="active" onChange={
                (e) => setStatus(e.target.value)
              } /> Active
              <input type="radio" name="status" value="inactive" onChange={
                (e) => setStatus(e.target.value)
              } /> Inactive <br /><br />
              <button type='submit' className='SaveBtn'>Save</button>

            </div>
          </form>
        </div>
      </div>
      
      

    </div>
  )
}

export default AddCategory
