import React, { useState } from 'react';
import axios from 'axios';
import './ExchangeOrderBookPage.css';

function ExchangeOrderBookPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please upload a data file.');
      return;
    }

    const formData = new FormData();
    formData.append('dataFile', file);

    try {
      const response = await axios.post('https://Generate_codeApp-backend.cloud-stacks.com/api/orders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Data exchange initiated successfully!');
    } catch (error) {
      setMessage('Failed to initiate data exchange.');
    }
  };

  return (
    <div className="exchange-order-book-page">
      <header className="header">
        <h1>Exchange Order Book Data</h1>
      </header>
      <nav className="navigation-tabs">
        <ul>
          <li><button>Tab 1</button></li>
          <li><button>Tab 2</button></li>
          <li><button>Tab 3</button></li>
        </ul>
      </nav>
      <main className="content">
        <section className="form-section">
          <form onSubmit={handleSubmit}>
            <label htmlFor="dataFile">Upload Data File:</label>
            <input type="file" id="dataFile" name="dataFile" onChange={handleFileChange} />
            <button type="submit" className="primary-action-button">Initiate Data Exchange</button>
          </form>
          {message && <p>{message}</p>}
        </section>
        <section className="additional-resources">
          <ul>
            <li><a href="#">Resource Link 1</a></li>
            <li><a href="#">Resource Link 2</a></li>
          </ul>
        </section>
      </main>
      <footer className="footer">
        <ul>
          <li><a href="#">Contact Information</a></li>
          <li><a href="#">Legal Disclaimer</a></li>
        </ul>
      </footer>
    </div>
  );
}

export default ExchangeOrderBookPage;
