// SearchFilter.jsx
import { useState } from 'react';
import '../../styles/components/searchFilter.css'

const SearchFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  genre, 
  setGenre, 
  sortBy, 
  setSortBy, 
  sortOrder, 
  setSortOrder 
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const genres = [
    'Fiction', 'Sci-Fi', 'Biography', 'Mystery', 'Fantasy', 
    'Romance', 'Thriller', 'History', 'Science', 'Philosophy'
  ];

  const clearFilters = () => {
    setSearchTerm('');
    setGenre('');
    setSortBy('title');
    setSortOrder('asc');
  };

  return (
    <div className="search-filter-container">
      <div className="search-filter">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <input
            type="text"
            placeholder="Search books, authors, genres..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          )}
        </div>

        <div className="filter-controls">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="genre-select"
          >
            <option value="">All Genres</option>
            {genres.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <button 
            className="advanced-toggle"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M7 12h10M12 18h5" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Advanced
          </button>

          {(searchTerm || genre) && (
            <button className="clear-all-btn" onClick={clearFilters}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Clear All
            </button>
          )}
        </div>
      </div>

      {isAdvancedOpen && (
        <div className="advanced-filters">
          <div className="filter-group">
            <label>Sort by</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="rating">Rating</option>
              <option value="date">Publication Date</option>
            </select>
          </div>
                    
          <div className="filter-group">
            <label>Order</label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div className="filter-tags">
            {searchTerm && (
              <span className="filter-tag">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm('')}>×</button>
              </span>
            )}
            {genre && (
              <span className="filter-tag">
                Genre: {genre}
                <button onClick={() => setGenre('')}>×</button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;