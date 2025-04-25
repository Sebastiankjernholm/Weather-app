import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    onSearch(location);
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        className="search-input"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Sök efter en stad"
      />
      <button className="search-button" onClick={handleSearch}>
        Sök
      </button>
    </div>
  );
};

export default Search;