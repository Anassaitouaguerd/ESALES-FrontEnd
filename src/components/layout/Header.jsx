import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '../../api/userApi';
import { cartApi } from '../../api/cartApi';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    const fetchCartCount = async () => {
      try {
        const cart = await cartApi.getCart();
        const count = cart.items.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(count);
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };
    
    fetchCartCount();
  }, []);
  
  const handleLogout = () => {
    userApi.logout();
    setUser(null);
    navigate('/login');
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/" className="header__logo-link">
            ESALES
          </Link>
        </div>
        
        <button 
          className="header__mobile-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="header__mobile-icon"></span>
        </button>
        
        <nav className={`header__nav ${mobileMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/" className="header__nav-link">Home</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/products" className="header__nav-link">Products</Link>
            </li>
          </ul>
        </nav>
        
        <div className="header__actions">
          <Link to="/cart" className="header__cart-link">
            <span className="header__cart-icon">🛒</span>
            {cartItemCount > 0 && (
              <span className="header__cart-count">{cartItemCount}</span>
            )}
          </Link>
          
          {user ? (
            <div className="header__user-menu">
              <button className="header__user-toggle">
                {user.firstName}
              </button>
              <div className="header__user-dropdown">
                <Link to="/profile" className="header__dropdown-link">
                  My Profile
                </Link>
                <Link to="/orders" className="header__dropdown-link">
                  My Orders
                </Link>
                <button 
                  className="header__dropdown-link header__dropdown-link--button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="header__login-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;