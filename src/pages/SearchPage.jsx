import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-header">
          <h1 className="search-title">Search Results</h1>
          <p className="search-query">Showing results for: "{query}"</p>
        </div>
        <div className="coming-soon">
          <h2>Search Functionality Coming Soon</h2>
          <p>Advanced search features will be implemented here.</p>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;