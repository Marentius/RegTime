import React from 'react';

export default function SearchBar({ onSearch, placeholder }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(e) => onSearch(e.target.value)}
      className="w-full px-3 py-2 bg-white bg-opacity-75 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
    />
  );
} 