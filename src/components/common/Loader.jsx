import React from 'react';
import './Loader.css';

const Loader = ({ size = 'medium', className = '' }) => {
  const loaderClasses = `loader loader--${size} ${className}`;
  
  return (
    <div className="loader-container">
      <div className={loaderClasses}>
        <div className="loader-spinner"></div>
      </div>
    </div>
  );
};

export default Loader;