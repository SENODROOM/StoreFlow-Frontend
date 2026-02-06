import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PurchasedProducts = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order =>
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerAddress.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [searchQuery, orders]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/orders');
      if (response.data.success) {
        setOrders(response.data.data);
        setFilteredOrders(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${id}`);
        fetchOrders();
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Error deleting order. Please try again.');
      }
    }
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
          placeholder="Search by customer name, phone, product, or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-orders">
          {searchQuery ? 'No orders found matching your search.' : 'No orders yet. Place your first order!'}
        </div>
      ) : (
        <div className="orders-grid">
          {filteredOrders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-product">{order.product}</div>
                <div className="order-time">{formatDate(order.orderTime)}</div>
              </div>
              
              <div className="order-details">
                <div className="order-detail-item">
                  <span className="detail-label">Customer:</span>
                  <span className="detail-value">{order.customerName}</span>
                </div>
                
                <div className="order-detail-item">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{order.customerPhone}</span>
                </div>
                
                <div className="order-detail-item">
                  <span className="detail-label">Address:</span>
                  <span className="detail-value">{order.customerAddress}</span>
                </div>
              </div>

              <button 
                className="delete-btn"
                onClick={() => handleDelete(order._id)}
              >
                Delete Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchasedProducts;
