import React, { useState } from 'react';
import Button from '../common/Button';
import Loader from '../common/Loader';
import { cartApi } from '../../api/cartApi';
import './ProductDetails.css';

const ProductDetails = ({ product, loading, error }) => {
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addToCartError, setAddToCartError] = useState(null);
  
  if (loading) {
    return (
      <div className="product-details__loading">
        <Loader size="large" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="product-details__error">
        <p>{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="product-details__not-found">
        <p>Product not found.</p>
      </div>
    );
  }
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      setAddToCartError(null);
      await cartApi.addItem(product, quantity);
      setAddingToCart(false);
    } catch (err) {
      setAddToCartError('Failed to add to cart. Please try again.');
      setAddingToCart(false);
    }
  };
  
  return (
    <div className="product-details">
      <div className="product-details__left">
        <div className="product-details__image-container">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-details__image" 
          />
        </div>
      </div>
      
      <div className="product-details__right">
        <h1 className="product-details__name">{product.name}</h1>
        <p className="product-details__price">${product.price.toFixed(2)}</p>
        
        <div className="product-details__description">
          <h2 className="product-details__section-title">Description</h2>
          <p>{product.description}</p>
        </div>
        
        {product.features && (
          <div className="product-details__features">
            <h2 className="product-details__section-title">Features</h2>
            <ul className="product-details__features-list">
              {product.features.map((feature, index) => (
                <li key={index} className="product-details__feature-item">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="product-details__actions">
          <div className="product-details__quantity">
            <label htmlFor="quantity" className="product-details__quantity-label">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="product-details__quantity-input"
            />
          </div>
          
          <Button
            variant="primary"
            size="large"
            onClick={handleAddToCart}
            disabled={addingToCart}
            fullWidth
          >
            {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
          </Button>
          
          {addToCartError && (
            <p className="product-details__error-message">{addToCartError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;