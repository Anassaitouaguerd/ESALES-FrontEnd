import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Loader from '../common/Loader';
import { productApi } from '../../api/productApi';
import './ProductList.css';

const ProductList = ({ category, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const filters = {};
        if (category) filters.category = category;
        if (searchQuery) filters.search = searchQuery;
        
        const fetchedProducts = await productApi.getProducts(filters);
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Please try again.');
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [category, searchQuery]);
  
  if (loading) {
    return (
      <div className="product-list__loading">
        <Loader size="large" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="product-list__error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="product-list__empty">
        <p>No products found. Try a different search or category.</p>
      </div>
    );
  }
  
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;