// AddProductModal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './addprooduct.css'
import { Box, Modal } from '@mui/material';


function AddProductModal({ open, handleClose, triggerMessage,fetchData }) {
  const [categories, setCategories] = useState([]);
   
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    image: null,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('categoryId', product.categoryId);
    formData.append('image', product.image);

    console.log(product.categoryId);
    try {
     const response= await axios.post('http://localhost:4000/products/addproduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        } 
      }

    )
    if (response.status==201) {
      fetchData()
      triggerMessage('Product Added Successfully','success')
      handleClose()
      
    }
    else if(response.status==202){
      triggerMessage('Product Already Exists','error')
      
    }else{
      triggerMessage('Product Not Added','error')
      handleClose()
    }
      console.log(response);
    } catch (error) {
      console.log(error)
    }


  }


  const fetchCategories = async () => {
    const response = await axios.get('http://localhost:4000/categories');
    setCategories(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Modal open={open} onClose={handleClose} >
      <Box className='boxModel'>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}  className='AddProductForm'>
          <div>
            <label htmlFor="">Name :</label>
            <input type="text" name="name" value={product.name} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="">Price :</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} required />
          </div>


          <div>
            <label htmlFor=''>Category :</label>
            <select name="categoryId" value={product.categoryId} onChange={handleChange}
             defaultValue={'veg'} required>
              {categories.map((category, index) => (
                <option key={index} value={category._id} >{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="">Image :</label>
            <input type="file" name="image" onChange={handleFileChange} required />
          </div>

          <div>
            <button type='submit' className='saveBtn' >
              Save Product
            </button>

          </div>
        </form>
      </Box>
    </Modal >
  );
}

export default AddProductModal
