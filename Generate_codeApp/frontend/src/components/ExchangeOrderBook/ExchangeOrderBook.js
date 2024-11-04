import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExchangeOrderBook.css';

function ExchangeOrderBook() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    userID: '',
    orderType: '',
    quantity: '',
    price: '',
    status: ''
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://Generate_codeApp-backend.cloud-stacks.com/api/orders');
      setOrders(response.data);
    } catch (error) {
      alert('Failed to fetch orders');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://Generate_codeApp-backend.cloud-stacks.com/api/orders', form, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      fetchOrders();
    } catch (error) {
      alert('Failed to create order');
    }
  };

  const handleDelete = async (orderID) => {
    try {
      await axios.delete(`https://Generate_codeApp-backend.cloud-stacks.com/api/orders/${orderID}`);
      fetchOrders();
    } catch (error) {
      alert('Failed to delete order');
    }
  };

  return (
    <div className="exchange-order-book">
      <header className="header">
        <h1>Exchange Order Book Data</h1>
      </header>
      <nav className="navigation-tabs">
        <ul>
          <li>Tab 1</li>
          <li>Tab 2</li>
          <li>Tab 3</li>
        </ul>
      </nav>
      <main className="main-content">
        <form className="data-exchange-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="userID">User ID</label>
            <input type="text" id="userID" name="userID" value={form.userID} onChange={handleInputChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="orderType">Order Type</label>
            <input type="text" id="orderType" name="orderType" value={form.orderType} onChange={handleInputChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" name="quantity" value={form.quantity} onChange={handleInputChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" value={form.price} onChange={handleInputChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="status">Status</label>
            <input type="text" id="status" name="status" value={form.status} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="primary-action-button">Initiate Data Exchange</button>
        </form>
        <div className="order-list">
          <h2>Order List</h2>
          <ul>
            {orders.map(order => (
              <li key={order.orderID}>
                {order.userID} - {order.orderType} - {order.quantity} - {order.price} - {order.status}
                <button onClick={() => handleDelete(order.orderID)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="additional-links">
          <a href="#">Resource 1</a>
          <a href="#">Resource 2</a>
        </div>
      </main>
      <footer className="footer">
        <div className="footer-links">
          <a href="#">Contact Us</a>
          <a href="#">Legal Disclaimer</a>
        </div>
      </footer>
    </div>
  );
}

export default ExchangeOrderBook;
