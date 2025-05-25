// BooksPage.jsx
import { useState } from 'react';
import SearchFilter from '../components/books/SearchFilter';
import BookList from '../components/books/BookList';
import '../styles/pages/book.css';

const BooksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  return (
    <section className="books-page container">
      <h1 className="page-title">All Books</h1>
      <SearchFilter 
        searchTerm={searchQuery}
        setSearchTerm={setSearchQuery}
        genre={genre}
        setGenre={setGenre}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <BookList 
        searchTerm={searchQuery} 
        genre={genre}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    </section>
  );
};

export default BooksPage;