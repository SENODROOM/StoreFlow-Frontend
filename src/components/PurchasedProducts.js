import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const API_BASE_URL = 'https://store-flow-api.vercel.app';

const PurchasedProducts = () => {
  const [orders, setOrders] = useState([]);
  const [groupedOrders, setGroupedOrders] = useState({});
  const [filteredCustomers, setFilteredCustomers] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editFormData, setEditFormData] = useState({
    products: [],
    customerName: '',
    customerPhone: '',
    customerAddress: ''
  });
  const { token } = useContext(AuthContext);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error.response?.data || error.message);
      alert('Error loading orders. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [fetchOrders, token]);

  useEffect(() => {
    const grouped = orders.reduce((acc, order) => {
      const customerKey = order.customerName;
      if (!acc[customerKey]) {
        acc[customerKey] = {
          customerName: order.customerName,
          customerPhone: order.customerPhone,
          customerAddress: order.customerAddress,
          orders: []
        };
      }
      acc[customerKey].orders.push(order);
      return acc;
    }, {});

    Object.keys(grouped).forEach(key => {
      grouped[key].orders.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
    });

    setGroupedOrders(grouped);
    setFilteredCustomers(grouped);
  }, [orders]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCustomers(groupedOrders);
    } else {
      const filtered = Object.keys(groupedOrders).reduce((acc, key) => {
        const customer = groupedOrders[key];
        if (
          customer.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.customerPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.customerAddress.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          acc[key] = customer;
        }
        return acc;
      }, {});
      setFilteredCustomers(filtered);
    }
  }, [searchQuery, groupedOrders]);

  const calculateOrderTotal = (order) => {
    if (!order.products || !Array.isArray(order.products)) return 0;
    return order.products.reduce((total, product) => {
      return total + (product.price || 0) * (product.quantity || 0);
    }, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        fetchOrders();
      } catch (error) {
        console.error('Error deleting order:', error.response?.data || error.message);
        alert('Error deleting order. Please try again.');
      }
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setEditFormData({
      products: order.products || [],
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerAddress: order.customerAddress
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...editFormData.products];
    updatedProducts[index][field] = value;
    setEditFormData(prev => ({
      ...prev,
      products: updatedProducts
    }));
  };

  const addProduct = () => {
    setEditFormData(prev => ({
      ...prev,
      products: [...prev.products, { name: '', quantity: 1, price: 0 }]
    }));
  };

  const removeProduct = (index) => {
    if (editFormData.products.length > 1) {
      const updatedProducts = editFormData.products.filter((_, i) => i !== index);
      setEditFormData(prev => ({
        ...prev,
        products: updatedProducts
      }));
    }
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/api/orders/${editingOrder._id}`, editFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setEditingOrder(null);
      fetchOrders();
      alert('Order updated successfully!');
    } catch (error) {
      console.error('Error updating order:', error.response?.data || error.message);
      alert('Error updating order. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
    setEditFormData({
      products: [],
      customerName: '',
      customerPhone: '',
      customerAddress: ''
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const calculateTotal = (orders) => {
    return orders.length;
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="purchased-container">
      <div className="purchased-header">
        <h2>Purchased Products - Bills</h2>
        <input
          type="text"
          className="search-bar"
          placeholder="Search by customer name, phone, or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {Object.keys(filteredCustomers).length === 0 ? (
        <div className="no-orders">
          {searchQuery ? 'No customers found matching your search.' : 'No orders yet. Place your first order!'}
        </div>
      ) : (
        <div className="customers-list">
          {Object.keys(filteredCustomers).map((customerKey) => {
            const customer = filteredCustomers[customerKey];
            return (
              <div key={customerKey} className="customer-section">
                <div className="customer-header">
                  <div className="customer-info">
                    <h3 className="customer-name">{customer.customerName}</h3>
                    <div className="customer-contact">
                      <span className="phone">{customer.customerPhone}</span>
                      <span className="separator">•</span>
                      <span className="address">{customer.customerAddress}</span>
                    </div>
                    <div className="total-orders">
                      Total Orders: {calculateTotal(customer.orders)}
                    </div>
                  </div>
                </div>

                <div className="orders-list">
                  {customer.orders.map((order) => (
                    <div key={order._id} className="order-item">
                      <div className="order-item-header">
                        <div className="order-item-content">
                          <div className="product-list">
                            {order.products && Array.isArray(order.products) ? (
                              order.products.map((product, idx) => (
                                <div key={idx} className="product-item">
                                  <div className="product-details">
                                    <span className="product-name">{product.name}</span>
                                    <span className="product-quantity">Qty: {product.quantity}</span>
                                    <span className="product-price">PKR {product.price.toFixed(2)}</span>
                                  </div>
                                  <span className="product-subtotal-price">
                                    PKR {(product.price * product.quantity).toFixed(2)}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <div className="product-item">
                                <span className="product-name">{order.product || 'N/A'}</span>
                              </div>
                            )}
                          </div>

                          {order.products && Array.isArray(order.products) && (
                            <div className="order-total-price">
                              <strong>Total: PKR {calculateOrderTotal(order).toFixed(2)}</strong>
                            </div>
                          )}

                          <div className="order-date">{formatDate(order.orderTime)}</div>
                        </div>

                        <div className="order-actions">
                          <button
                            className="edit-btn-small"
                            onClick={() => handleEdit(order)}
                            title="Edit Order"
                          >
                            ✎
                          </button>
                          <button
                            className="delete-btn-small"
                            onClick={() => handleDelete(order._id)}
                            title="Delete Order"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Modal */}
      {editingOrder && (
        <div className="modal-overlay" onClick={handleCancelEdit}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Order</h3>
              <button className="modal-close" onClick={handleCancelEdit}>✕</button>
            </div>
            <form onSubmit={handleUpdateOrder} className="edit-form">
              <div className="form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={editFormData.customerName}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Customer Phone</label>
                <input
                  type="text"
                  name="customerPhone"
                  value={editFormData.customerPhone}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Customer Address</label>
                <textarea
                  name="customerAddress"
                  value={editFormData.customerAddress}
                  onChange={handleEditChange}
                  required
                  rows="3"
                />
              </div>

              <div className="products-section">
                <div className="products-header">
                  <h3>Products</h3>
                  <button type="button" className="add-product-btn" onClick={addProduct}>
                    + Add Product
                  </button>
                </div>

                {editFormData.products.map((product, index) => (
                  <div key={index} className="product-row">
                    <div className="product-fields">
                      <div className="form-group product-name-group">
                        <label>Product Name</label>
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group product-quantity-group">
                        <label>Quantity</label>
                        <input
                          type="number"
                          min="1"
                          value={product.quantity}
                          onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group product-price-group">
                        <label>Price (PKR)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={product.price}
                          onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group product-total-group">
                        <label>Subtotal</label>
                        <div className="product-subtotal">
                          PKR {((parseFloat(product.price) || 0) * (parseInt(product.quantity) || 0)).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    {editFormData.products.length > 1 && (
                      <button
                        type="button"
                        className="remove-product-btn"
                        onClick={() => removeProduct(index)}
                        title="Remove product"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchasedProducts;