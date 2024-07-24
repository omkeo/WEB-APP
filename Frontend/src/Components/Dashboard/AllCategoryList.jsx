import React, { useEffect, useState } from 'react';
import AddCategory from './AddCategory';
import axios from 'axios';
import './AllCategory.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

function AllCategoryList({ triggerMessage }) {
    const [addCategoryForm, setAddCategoryForm] = useState(false);
    const [categories, setCategories] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [newName, setNewName] = useState('');
    const [newStatus, setNewStatus] = useState('');

    const toggleAddCategory = () => {
        setAddCategoryForm(!addCategoryForm);
    };

    const fetchCategories = async () => {
        const response = await axios.get('http://localhost:4000/categories');
        setCategories(response.data);
    };

    useEffect(() => {
        fetchCategories();
    }, [addCategoryForm]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Delete the category?');
        if (confirmed) {
            const response = await axios.delete(`http://localhost:4000/categories/deletecategory/${id}`);
            if (response.status === 200) {
                fetchCategories();
                triggerMessage('Category deleted successfully!', 'success');
            } else {
                alert('Category not deleted');
            }
        }
    };

    const handleEdit = (id) => {
        setEditMode(id);
    };

    const handleSave = async (id) => {
        const category = categories.find(cat => cat._id === id);
        const updatedName = newName || category.name;
        const updatedStatus = newStatus || category.status;

        const response = await axios.put(`http://localhost:4000/categories/updatecategory/${id}`, { name: updatedName, status: updatedStatus });
        if (response.status === 200) {
            fetchCategories();
            setEditMode(null); // Exit edit mode
            triggerMessage('Category updated successfully', 'success');
        } else {
            alert('Failed to update category');
        }
    };

    return (
        <div className="categoryListDiv">
            <button onClick={toggleAddCategory} className="toggleBtn">
                + Add Category
            </button>
            <br /><br />
            <div className="addCategoryForm">
                {addCategoryForm && <AddCategory fetchCategories={fetchCategories} toggleAddCategory={toggleAddCategory} triggerMessage={triggerMessage} />}
            </div>
            {categories.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category._id}>
                                <td>{editMode === category._id ? <input type="text" defaultValue={category.name} onChange={(e) => setNewName(e.target.value)} /> : category.name}</td>
                                <td>{editMode === category._id ? <input type="text" defaultValue={category.status} onChange={(e) => setNewStatus(e.target.value)} /> : category.status}</td>
                                <td>
                                    {editMode === category._id ? (
                                        <IconButton onClick={() => handleSave(category._id)}>
                                            <SaveIcon className="saveIcon" />
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={() => handleEdit(category._id)}>
                                            <EditIcon className="editIcon" />
                                        </IconButton>
                                    )}
                                    <IconButton onClick={() => handleDelete(category._id)}>
                                        <DeleteIcon className="deleteIcon" />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="noCategory">
                    <p>No Categories Available</p>
                </div>
            )}
        </div>
    );
}

export default AllCategoryList;
