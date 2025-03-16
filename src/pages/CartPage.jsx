import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import { cartApi } from '../api/cartApi';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const cartData = await cartApi.getCart();
      setCart(cartData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart. Please try again.');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCart();
  }, []);
  
  const handleClearCart = async () => {
    try {
      setLoading(true);
      await cartApi.clearCart();
      setCart({ items: [], total: 0 });
      setLoading(false);
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError('Failed to clear cart. Please try again.');
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="cart-page__loading">
        <Loader size="large" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="cart-page__error">
        <p>{error}</p>
        <Button onClick={() => fetchCart()}>Try Again</Button>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <div className="cart-page__header">
        <h1 className="cart-page__title">Your Shopping Cart</h1>
        
        {cart.items.length > 0 && (
          <Button 
            variant="secondary" 
            size="small" 
            onClick={handleClearCart}
          >
            Clear Cart
          </Button>
        )}
      </div>
      
      <div className="cart-page__content">
        <div className="cart-page__items">
          {cart.items.length === 0 ? (
            <div className="cart-page__empty">
              <p>Your cart is empty.</p>
              <Link to="/products" className="cart-page__shop-link">
                <Button variant="primary">Shop Now</Button>
              </Link>
            </div>
          ) : (
            <>
              {cart.items.map(item => (
                <CartItem 
                  key={item.id} 
                  item={item}
                  onUpdateCart={fetchCart}
                />
              ))}
            </>
          )}
        </div>
        
        <div className="cart-page__summary">
          <CartSummary cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;