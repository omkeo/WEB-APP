import React, { useEffect, useState } from 'react';
import './allproducts.css';
import AddProductModal from './AddProduct';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';




function AllProductList({ triggerMessage }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([])
  const [editedImage, setEditedImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [searchBy, setSearchBy] = useState('')
  const [AllCategory, setAllCategory] = useState([])


  useEffect(() => {
    fetchData();
  }, []);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setEditedImage(file);
  };


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/products/allproducts')
      const response2 = await axios.get('http://localhost:4000/categories');
      setData(response.data);
      setOriginalData(response.data)
      setAllCategory(response2.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = async (id) => {
    const category = data.find(cat => cat._id === id);
    const updatedName = newName === '' ? category.name : newName;
    const updatedPrice = newPrice === '' ? category.price : newPrice;
    const updatedImage = editedImage === null ? category.image : editedImage;
    const updatedProduct = {
      name: updatedName,
      price: updatedPrice,
      image: updatedImage
    }

    try {
      const response = await axios.put(`http://localhost:4000/products/updateproduct/${id}`, updatedProduct, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      )
      if (response.status == 200) {

        triggerMessage('Product updated successfully', 'success');
        setOpen(false);
        setEditingId(null);
        setEditedImage(null);
        setNewName('');
        setNewPrice('');
        fetchData()

      }

    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = confirm('Sure want to delete product, this action delete the product permenently')
    if (confirmed) {
      try {
        const response = await axios.delete(`http://localhost:4000/products/deleteproduct/${id}`
        )
        if (response.status == 200) {
          triggerMessage('Product deleted successfully', 'success');
          setOpen(false);
          fetchData()
        }
      } catch (error) {
        console.error('Error deleting data:', error);

      }
    }




  };




  const handleProductFilter = (id) => {
    console.log('@@@@@@@22222', id)
    if (id ===null) {
      setData(originalData)

    } else {
      const filteredData = (originalData.filter(item =>
        (item.categoryId._id === id)
         
      
        
        
      ))

      setData(filteredData)
    }

  }
  useEffect(()=>{
    searchProducts()

  },[searchBy])

  const searchProducts =()=>{
    const regex = new RegExp(searchBy, 'i');
    setData(originalData.filter(product => regex.test(product.name)));

  }

  return (
    <div>
      <div className="addproductForm">
        <AddProductModal open={open} handleClose={handleClose} triggerMessage={triggerMessage} fetchData={fetchData} />
      </div>
      <div className="container">
        <div className="searchBar">
          <label htmlFor="">Search</label>
          <input type="text" placeholder="Search product" onChange={(e) => { setSearchBy(e.target.value) }} />
          <button className="addProductBtn" onClick={handleOpen}>
            + Add Product
          </button>
        </div>
        <div className="Mainscreen">
          <div className="filterBtnDiv">
            <p>Filter by Category</p>
            <button onClick={() => { handleProductFilter(null) }}>All Products</button>
            {
              AllCategory.map(item => {
                return (
                  <button key={item._id} className="filterBtn" onClick={() => { handleProductFilter(item._id) }}>{item.name}</button>
                )
              })
            }
            <br /><br />
          </div>
          <div className="productsList">
            {data.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => (
                    <tr key={item._id}>
                      <td>
                        {editingId === item._id ? (
                          <input type="text" defaultValue={item.name} onChange={(e) => setNewName(e.target.value)} />
                        ) : (
                          item.name
                        )}
                      </td>
                      <td>
                        {editingId === item._id ? (
                          <input type="number" defaultValue={item.price} onChange={(e) => setNewPrice(e.target.value)} />
                        ) : (
                          item.price
                        )}
                      </td>
                      <td>{item.categoryId ? item.categoryId.name : 'No Category'}</td>
                      <td>
                        {editingId === item._id ? (
                          <div>
                            <input type="file" onChange={handleImageChange} />
                            {editedImage && <img src={URL.createObjectURL(editedImage)} alt="Edited" style={{ width: '45px', height: '45px' }} />}
                          </div>
                        ) : (
                          <img src={item.image} alt={item.name} style={{ width: '45px', height: '45px' }} />
                        )}
                      </td>
                      <td>
                        {editingId === item._id ? (
                          <IconButton onClick={() => handleSave(item._id)}>
                            <SaveIcon className="saveIcon" />
                          </IconButton>
                        ) : (
                          <IconButton onClick={() => handleEdit(item._id)}>
                            <EditIcon className="editIcon" />
                          </IconButton>
                        )}
                        <IconButton onClick={() => handleDelete(item._id)}>
                          <DeleteIcon className="deleteIcon" />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No prooducts available</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default AllProductList;
