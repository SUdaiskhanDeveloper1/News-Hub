import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const category  = useParams();
  
  return (
    <div className="category-page">
      <div className="container">
        <div className="category-header">
          <h1 className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
          <p className="category-description">Latest news and updates in {category}</p>
        </div>
        <div className="coming-soon">
          <h2>Category Page Coming Soon</h2>
          <p>This section will show news specific to {category} category.</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;