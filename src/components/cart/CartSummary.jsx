import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import './CartSummary.css';

const CartSummary = ({ cart }) => {
  const navigate = useNavigate();
  

  const subtotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99; 
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  const handleContinueShopping = () => {
    navigate('/products');
  };
  
  return (
    <div className="cart-summary">
      <h2 className="cart-summary__title">Order Summary</h2>
      
      <div className="cart-summary__details">
        <div className="cart-summary__row">
          <span className="cart-summary__label">Subtotal</span>
          <span className="cart-summary__value">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="cart-summary__row">
          <span className="cart-summary__label">Shipping</span>
          <span className="cart-summary__value">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="cart-summary__row">
          <span className="cart-summary__label">Tax (8%)</span>
          <span className="cart-summary__value">${tax.toFixed(2)}</span>
        </div>
        
        <div className="cart-summary__row cart-summary__row--total">
          <span className="cart-summary__label">Total</span>
          <span className="cart-summary__value">${total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="cart-summary__actions">
        <Button
          variant="primary"
          size="large"
          onClick={handleCheckout}
          disabled={cart.items.length === 0}
          fullWidth
        >
          Proceed to Checkout
        </Button>
        
        <Button
          variant="secondary"
          size="large"
          onClick={handleContinueShopping}
          fullWidth
        >
          Continue Shopping
        </Button>
      </div>
      
      <div className="cart-summary__info">
        <p>We accept credit cards, PayPal, and bank transfers.</p>
        <p>Free shipping on orders over $50</p>
      </div>
    </div>
  );
};

export default CartSummary;