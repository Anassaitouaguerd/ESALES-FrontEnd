import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { cartApi } from '../../api/cartApi';
import './CartItem.css';

const CartItem = ({ item, onUpdateCart }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [updating, setUpdating] = useState(false);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const handleUpdateQuantity = async () => {
    if (quantity === item.quantity) return;
    
    try {
      setUpdating(true);
      await cartApi.updateItemQuantity(item.id, quantity);
      onUpdateCart();
      setUpdating(false);
    } catch (err) {
      console.error('Error updating quantity:', err);
      setUpdating(false);
      setQuantity(item.quantity);
    }
  };
  
  const handleRemoveItem = async () => {
    try {
      setUpdating(true);
      await cartApi.removeItem(item.id);
      onUpdateCart();
      setUpdating(false);
    } catch (err) {
      console.error('Error removing item:', err);
      setUpdating(false);
    }
  };
  
  return (
    <div className="cart-item">
      <div className="cart-item__image-container">
        <Link to={`/products/${item.id}`}>
          <img 
            src={item.image} 
            alt={item.name} 
            className="cart-item__image" 
          />
        </Link>
      </div>
      
      <div className="cart-item__details">
        <Link to={`/products/${item.id}`} className="cart-item__name-link">
          <h3 className="cart-item__name">{item.name}</h3>
        </Link>
        <p className="cart-item__price">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="cart-item__quantity">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          onBlur={handleUpdateQuantity}
          disabled={updating}
          className="cart-item__quantity-input"
        />
        
        <Button
          variant="secondary"
          size="small"
          onClick={handleUpdateQuantity}
          disabled={updating || quantity === item.quantity}
        >
          Update
        </Button>
      </div>
      
      <div className="cart-item__subtotal">
        <p className="cart-item__subtotal-label">Subtotal:</p>
        <p className="cart-item__subtotal-value">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      
      <div className="cart-item__actions">
        <Button
          variant="danger"
          size="small"
          onClick={handleRemoveItem}
          disabled={updating}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;