import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import config from '../config';

const API_BASE_URL = config.API_URL;

const Inventory = () => {
    const { token } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;
        fetchInventory();
    }, [token]);

    const fetchInventory = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_BASE_URL}/api/products/inventory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                setProducts(res.data.data);
                setDisplayedProducts(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching inventory:', err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
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

    return (
        <div className="inventory-container">
            <div className="inventory-list">
                <div className="inventory-list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>Current Inventory</h2>
                    <div className="search-bar" style={{ width: '300px' }}>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="search-input"
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', color: '#374151' }}
                            onChange={(e) => {
                                const term = e.target.value.toLowerCase();
                                const filtered = products.filter(p =>
                                    p.name.toLowerCase().includes(term) ||
                                    p.category.toLowerCase().includes(term)
                                );
                                setDisplayedProducts(filtered);
                            }}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="loading">Loading inventory...</div>
                ) : displayedProducts.length === 0 ? (
                    <p className="no-items">No products found.</p>
                ) : (
                    <div className="inventory-table-wrapper">
                        <table className="inventory-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedProducts.map(p => (
                                    <tr key={p._id}>
                                        <td>{p.name}</td>
                                        <td>{p.category}</td>
                                        <td>${p.price.toFixed(2)}</td>
                                        <td>{p.quantity}</td>
                                        <td className="actions-cell">
                                            {/* Edit could link to SellProduct with editing ID, but for now let's keep it simple or implement later */}
                                            <button className="delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inventory;
