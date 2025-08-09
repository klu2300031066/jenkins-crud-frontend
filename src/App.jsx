import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    os: '',
    price: ''
  });

  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
const BASE_URL = 'http://localhost:9090/springapp1';
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${BASE_URL}/update`, product);
        alert('Update successful');
        setIsEditing(false);
      } else {
        await axios.post(`${BASE_URL}/insert`, product);
        alert('Insert successful');
      }
      setProduct({ id: '', name: '', os: '', price: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error:', error);
      alert('Operation failed');
    }
  };

  const fetchProducts = async () => {
    const res = await axios.get(`${BASE_URL}/display`);
    setProducts(res.data);
  };

  const editProduct = (p) => {
    setProduct(p);
    setIsEditing(true);
  };

  /*
  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await axios.delete(`${BASE_URL}/delete/${id}`);
      alert('Delete successful');
      fetchProducts();
    }
  };
  */

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Product Management</h1>
        <p className="page-subtitle">Manage your product inventory with ease</p>
      </div>

      <div className="form-container fade-in">
        <h2 className="form-title">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-row">
              <label htmlFor="id" className="form-label">ID:</label>
              <input
                type="number"
                name="id"
                id="id"
                className="form-input"
                value={product.id}
                onChange={handleChange}
                required
                disabled={isEditing}
                placeholder="Enter product ID"
              />
            </div>
          </div>
          
          <div className="form-group">
            <div className="form-row">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-input"
                value={product.name}
                onChange={handleChange}
                required
                placeholder="Enter product name"
              />
            </div>
          </div>
          
          <div className="form-group">
            <div className="form-row">
              <label htmlFor="os" className="form-label">OS:</label>
              <input
                type="text"
                name="os"
                id="os"
                className="form-input"
                value={product.os}
                onChange={handleChange}
                required
                placeholder="Enter operating system"
              />
            </div>
          </div>
          
          <div className="form-group">
            <div className="form-row">
              <label htmlFor="price" className="form-label">Price:</label>
              <input
                type="text"
                name="price"
                id="price"
                className="form-input"
                value={product.price}
                onChange={handleChange}
                required
                placeholder="Enter price (e.g., $99.99)"
              />
            </div>
          </div>
          
          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              {isEditing ? '✏️ Update Product' : '➕ Add Product'}
            </button>
            {isEditing && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setIsEditing(false);
                  setProduct({ id: '', name: '', os: '', price: '' });
                }}
              >
                ❌ Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-container fade-in">
        <div className="table-header">
          <h3 className="table-title">Product Inventory</h3>
          <span className="table-count">{products.length} Products</span>
        </div>
        
        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <h4 className="empty-state-title">No Products Found</h4>
            <p className="empty-state-description">
              Start by adding your first product using the form above.
            </p>
          </div>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Operating System</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td><strong>#{p.id}</strong></td>
                  <td>{p.name}</td>
                  <td>{p.os}</td>
                  <td><strong>{p.price}</strong></td>
                  <td className="actions-cell">
                    <button
                      className="btn btn-warning"
                      onClick={() => editProduct(p)}
                      title="Edit this product"
                    >
                      ✏️ Edit
                    </button>
                    {/*
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteProduct(p.id)}
                      title="Delete this product"
                    >
                      🗑️ Delete
                    </button>
                    */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
