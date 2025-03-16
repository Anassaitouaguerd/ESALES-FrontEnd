import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { productApi } from '../../api/productApi';
import './ProductFilters.css';

const ProductFilters = ({ onApplyFilters }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await productApi.getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    
    fetchCategories();
  }, []);
  
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleApplyFilters = () => {
    const filters = {
      category: selectedCategory,
      minPrice: priceRange.min !== '' ? Number(priceRange.min) : undefined,
      maxPrice: priceRange.max !== '' ? Number(priceRange.max) : undefined,
      search: searchTerm
    };
    
    onApplyFilters(filters);
  };
  
  const handleResetFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSearchTerm('');
    onApplyFilters({});
  };
  
  return (
    <div className="product-filters">
      <h2 className="product-filters__title">Filters</h2>
      
      <div className="product-filters__section">
        <h3 className="product-filters__section-title">Search</h3>
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="product-filters__section">
        <h3 className="product-filters__section-title">Categories</h3>
        <select 
          className="product-filters__select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="product-filters__section">
        <h3 className="product-filters__section-title">Price Range</h3>
        <div className="product-filters__price-inputs">
          <Input
            type="number"
            placeholder="Min"
            name="min"
            value={priceRange.min}
            onChange={handlePriceChange}
            min="0"
          />
          <span className="product-filters__price-separator">-</span>
          <Input
            type="number"
            placeholder="Max"
            name="max"
            value={priceRange.max}
            onChange={handlePriceChange}
            min="0"
          />
        </div>
      </div>
      
      <div className="product-filters__actions">
        <Button 
          variant="primary" 
          onClick={handleApplyFilters}
          fullWidth
        >
          Apply Filters
        </Button>
        <Button 
          variant="secondary" 
          onClick={handleResetFilters}
          fullWidth
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;