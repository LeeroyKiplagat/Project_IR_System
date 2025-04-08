import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let searchUrl = "/dummy-index/_search?pretty";
    if (category) {
      searchUrl += `&q=category:${encodeURIComponent(category)}`;
    }
    if (query) {
      searchUrl += category
        ? ` AND ${encodeURIComponent(query)}`
        : `&q=${encodeURIComponent(query)}`;
    }
    onSearch(searchUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">All Categories</option>
          <option value="Health">Health</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Education">Education</option>
        </select>
        <button
          type="submit"
          className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
