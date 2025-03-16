import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { cartApi } from '../../api/cartApi';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleAddToCart = async () => {
    try {
      setLoading(true);
      setError(null);
      await cartApi.addItem(product, 1);
      setLoading(false);
    } catch (err) {
      setError('Failed to add to cart');
      setLoading(false);
    }
  };
  
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-card__link">
        <div className="product-card__image-container">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-card__image" 
          />
        </div>
        
        <div className="product-card__info">
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__price">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      
      <div className="product-card__actions">
        <Button 
          variant="primary" 
          size="small" 
          onClick={handleAddToCart}
          disabled={loading}
          fullWidth
        >
          {loading ? 'Adding...' : 'Add to Cart'}
        </Button>
        
        {error && <p className="product-card__error">{error}</p>}
      </div>
    </div>
  );
};

export default ProductCard;