import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';
import { productApi } from '../api/productApi';
import './HomePage.css';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const featured = await productApi.getProducts({ featured: true, limit: 4 });
        setFeaturedProducts(featured);
        
        const newProducts = await productApi.getProducts({ sort: 'newest', limit: 8 });
        setNewArrivals(newProducts);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching home page products:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  return (
    <div className="home-page">
      {/* Hero section */}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Welcome to ESALES</h1>
          <p className="hero__subtitle">
            Your one-stop shop for all your e-commerce needs
          </p>
          <Link to="/products">
            <Button variant="primary" size="large">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Featured products section */}
      <section className="featured-products">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <Link to="/products?featured=true" className="section-link">
            View All
          </Link>
        </div>
        
        <div className="product-grid">
          {loading ? (
            <p>Loading featured products...</p>
          ) : featuredProducts.length === 0 ? (
            <p>No featured products available.</p>
          ) : (
            featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>
      
      {/* Categories section */}
      <section className="categories">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
        </div>
        
        <div className="categories-grid">
          <Link to="/products?category=electronics" className="category-card">
            <div className="category-card__icon">🖥️</div>
            <h3 className="category-card__title">Electronics</h3>
          </Link>
          
          <Link to="/products?category=clothing" className="category-card">
            <div className="category-card__icon">👕</div>
            <h3 className="category-card__title">Clothing</h3>
          </Link>
          
          <Link to="/products?category=home" className="category-card">
            <div className="category-card__icon">🏠</div>
            <h3 className="category-card__title">Home & Kitchen</h3>
          </Link>
          
          <Link to="/products?category=books" className="category-card">
            <div className="category-card__icon">📚</div>
            <h3 className="category-card__title">Books</h3>
          </Link>
        </div>
      </section>
      
      {/* New arrivals section */}
      <section className="new-arrivals">
        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <Link to="/products?sort=newest" className="section-link">
            View All
          </Link>
        </div>
        
        <div className="product-grid">
          {loading ? (
            <p>Loading new arrivals...</p>
          ) : newArrivals.length === 0 ? (
            <p>No new arrivals available.</p>
          ) : (
            newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>
      
      <section className="promo-banner">
        <div className="promo-banner__content">
          <h2 className="promo-banner__title">Special Offer</h2>
          <p className="promo-banner__text">
            Get 20% off on all products with code: ESALES20
          </p>
          <Link to="/products">
            <Button variant="secondary" size="medium">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;