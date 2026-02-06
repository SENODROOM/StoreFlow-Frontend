import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const PurchasedProducts = () => {
  const [orders, setOrders] = useState([]);
  const [groupedOrders, setGroupedOrders] = useState({});
  const [filteredCustomers, setFilteredCustomers] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editFormData, setEditFormData] = useState({
    product: '',
    customerName: '',
    customerPhone: '',
    customerAddress: ''
  });
  const { token } = useContext(AuthContext);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    // Group orders by customer name
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

    // Sort orders by date (newest first) for each customer
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchOrders();
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Error deleting order. Please try again.');
      }
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setEditFormData({
      product: order.product,
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

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/orders/${editingOrder._id}`, editFormData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditingOrder(null);
      fetchOrders();
      alert('Order updated successfully!');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
    setEditFormData({
      product: '',
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
                        <div className="product-name">{order.product}</div>
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
                      <div className="order-date">{formatDate(order.orderTime)}</div>
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
                <label>Product Name</label>
                <input
                  type="text"
                  name="product"
                  value={editFormData.product}
                  onChange={handleEditChange}
                  required
                />
              </div>
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