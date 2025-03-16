import React, { useState } from 'react';
import ProductList from '../components/product/ProductList';
import ProductFilters from '../components/product/ProductFilters';
import './ProductsPage.css';

const ProductsPage = () => {
  const [filters, setFilters] = useState({});
  
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="products-page">
      <div className="products-page__header">
        <h1 className="products-page__title">Products</h1>
      </div>
      
      <div className="products-page__content">
        <aside className="products-page__sidebar">
          <ProductFilters onApplyFilters={handleApplyFilters} />
        </aside>
        
        <main className="products-page__main">
          <ProductList 
            category={filters.category} 
            searchQuery={filters.search}
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
          />
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;