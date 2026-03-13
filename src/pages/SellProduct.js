import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import config from '../config';

const API_BASE_URL = config.API_URL;

const InventoryManager = () => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    quantity: '', 
    category: '', 
    image: '' 
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetchInventory();
  }, [token]);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products/inventory`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setProducts(res.data.data);
        setDisplayedProducts(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching inventory:', err.response?.data || err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      const file = files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.price === '' || formData.quantity === '' || !formData.category) {
      setMessage({ type: 'error', text: 'Name, price, quantity, and category are required.' });
      return;
    }
    setLoading(true);

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('price', formData.price);
    submitData.append('quantity', formData.quantity);
    submitData.append('category', formData.category);
    if (imageFile) {
      submitData.append('image', imageFile);
    } else if (formData.image && typeof formData.image === 'string') {
      submitData.append('image', formData.image);
    }

    try {
      if (editingId) {
        const res = await axios.put(`${API_BASE_URL}/api/products/${editingId}`, submitData, {
          headers: { 
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'multipart/form-data' 
          }
        });
        if (res.data.success) {
          setMessage({ type: 'success', text: 'Product updated successfully.' });
          const newProducts = products.map(p => p._id === editingId ? res.data.data : p);
          setProducts(newProducts);
          setDisplayedProducts(newProducts);
          setEditingId(null);
          setFormData({ name: '', price: '', quantity: '', category: '', image: '' });
          setImageFile(null);
          setImagePreview('');
        }
      } else {
        const res = await axios.post(`${API_BASE_URL}/api/products`, submitData, {
          headers: { 
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'multipart/form-data' 
          }
        });
        if (res.data.success) {
          setMessage({ type: 'success', text: 'Product added successfully.' });
          setFormData({ name: '', price: '', quantity: '', category: '', image: '' });
          setImageFile(null);
          setImagePreview('');
          const newProducts = [res.data.data, ...products];
          setProducts(newProducts);
          setDisplayedProducts(newProducts);
        }
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to save product. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      image: product.image || ''
    });
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const newProducts = products.filter(p => p._id !== id);
      setProducts(newProducts);
      setDisplayedProducts(newProducts);
    } catch (err) {
      alert('Could not delete product.');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', price: '', quantity: '', category: '', image: '' });
  };

  return (
    <div className="inventory-container">
      <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      <form className="inventory-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Product Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
              <option value="Groceries">Groceries</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Price ($) *</label>
            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Quantity *</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group image-upload-group">
          <label>Product Image</label>
          <div className="file-input-wrapper">
            <input 
              type="file" 
              name="image" 
              accept="image/*" 
              onChange={handleChange} 
              className="file-input"
              id="product-image"
            />
            <label htmlFor="product-image" className="file-label">
              {imageFile ? imageFile.name : 'Choose a photo...'}
            </label>
          </div>
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <button type="button" onClick={() => { setImageFile(null); setImagePreview(''); }} className="remove-img">×</button>
            </div>
          )}
          {!imagePreview && formData.image && typeof formData.image === 'string' && (
            <div className="image-preview">
              <img src={formData.image.startsWith('/') ? `${API_BASE_URL}${formData.image}` : formData.image} alt="Current" />
            </div>
          )}
        </div>
        <div className="form-actions">
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Saving...' : (editingId ? 'Update Product' : 'Add Product')}
          </button>
          {editingId && <button type="button" className="cancel-btn" onClick={cancelEdit}>Cancel</button>}
        </div>
      </form>
    </div>
  );
};

export default InventoryManager;
