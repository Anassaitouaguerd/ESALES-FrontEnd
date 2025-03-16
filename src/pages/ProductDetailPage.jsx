import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetails from '../components/product/ProductDetails';
import Button from '../components/common/Button';
import { productApi } from '../api/productApi';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProduct = await productApi.getProductById(productId);
        setProduct(fetchedProduct);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again.');
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId]);
  
  const handleBackToProducts = () => {
    navigate('/products');
  };
  
  return (
    <div className="product-detail-page">
      <div className="product-detail-page__header">
        <Button 
          variant="secondary" 
          size="small" 
          onClick={handleBackToProducts}
        >
          &larr; Back to Products
        </Button>
      </div>
      
      <div className="product-detail-page__content">
        <ProductDetails 
          product={product}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;