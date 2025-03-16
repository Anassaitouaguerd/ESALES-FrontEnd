import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section footer__section--about">
          <h3 className="footer__title">About ESALES</h3>
          <p className="footer__text">
            ESALES is your one-stop shop for all your e-commerce needs. 
            We offer a wide range of products with fast shipping and excellent customer service.
          </p>
        </div>
        
        <div className="footer__section footer__section--links">
          <h3 className="footer__title">Quick Links</h3>
          <ul className="footer__links">
            <li className="footer__link-item">
              <Link to="/" className="footer__link">Home</Link>
            </li>
            <li className="footer__link-item">
              <Link to="/products" className="footer__link">Products</Link>
            </li>
            <li className="footer__link-item">
              <Link to="/cart" className="footer__link">Cart</Link>
            </li>
            <li className="footer__link-item">
              <Link to="/login" className="footer__link">Login</Link>
            </li>
            <li className="footer__link-item">
              <Link to="/register" className="footer__link">Register</Link>
            </li>
          </ul>
        </div>
        
        <div className="footer__section footer__section--contact">
          <h3 className="footer__title">Contact Us</h3>
          <address className="footer__contact">
            <p className="footer__contact-item">
              <span className="footer__contact-icon">📍</span>
              123 E-Commerce St, Digital City
            </p>
            <p className="footer__contact-item">
              <span className="footer__contact-icon">📞</span>
              +1 (555) 123-4567
            </p>
            <p className="footer__contact-item">
              <span className="footer__contact-icon">✉️</span>
              support@esales.com
            </p>
          </address>
        </div>
        
        <div className="footer__section footer__section--newsletter">
          <h3 className="footer__title">Newsletter</h3>
          <p className="footer__text">
            Subscribe to our newsletter for the latest updates and promotions.
          </p>
          <form className="footer__newsletter-form">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="footer__newsletter-input" 
              required
            />
            <button type="submit" className="footer__newsletter-button">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      <div className="footer__bottom">
        <p className="footer__copyright">
          &copy; {currentYear} ESALES. All rights reserved.
        </p>
        <div className="footer__legal">
          <Link to="/privacy-policy" className="footer__legal-link">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="footer__legal-link">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;