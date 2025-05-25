// BookList.jsx
import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';

const BookList = ({ 
  highlight = false, 
  searchTerm = '', 
  genre = '', 
  sortBy = 'title', 
  sortOrder = 'asc' 
}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/books');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        let bookList = data.data || [];

        // Apply filters
        if (searchTerm) {
          bookList = bookList.filter(book => 
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.genre.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        if (genre) {
          bookList = bookList.filter(book => book.genre === genre);
        }

        // Apply sorting
        bookList.sort((a, b) => {
          let aValue, bValue;
          
          switch (sortBy) {
            case 'title':
              aValue = a.title.toLowerCase();
              bValue = b.title.toLowerCase();
              break;
            case 'author':
              aValue = a.author.toLowerCase();
              bValue = b.author.toLowerCase();
              break;
            case 'rating':
              aValue = a.rating || 0;
              bValue = b.rating || 0;
              break;
            case 'date':
              aValue = new Date(a.publishedDate || a.createdAt);
              bValue = new Date(b.publishedDate || b.createdAt);
              break;
            default:
              aValue = a.title.toLowerCase();
              bValue = b.title.toLowerCase();
          }

          if (sortBy === 'rating' || sortBy === 'date') {
            // Numeric/Date sorting
            if (sortOrder === 'asc') {
              return aValue - bValue;
            } else {
              return bValue - aValue;
            }
          } else {
            // String sorting
            if (sortOrder === 'asc') {
              return aValue.localeCompare(bValue);
            } else {
              return bValue.localeCompare(aValue);
            }
          }
        });

        // If highlight is true, limit to 6 books
        if (highlight) {
          bookList = bookList.slice(0, 6);
        }

        setBooks(bookList);
      } catch (err) {
        setError('Failed to fetch books');
        console.error('Failed to fetch books', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [highlight, searchTerm, genre, sortBy, sortOrder]);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  if (loading) {
    return (
      <div className="books-loading">
        <div className="loading-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="book-card-skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
                <div className="skeleton-line shorter"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="books-error">
        <div className="error-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="m15 9-6 6m0-6 6 6" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button className="btn-primary" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="books-empty">
        <div className="empty-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <path d="M4 19.5A2.5 2.5 0 0 1 1.5 17V7A2.5 2.5 0 0 1 4 4.5h16A2.5 2.5 0 0 1 22.5 7v10a2.5 2.5 0 0 1-2.5 2.5H4z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9 9h.01M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>
        <h3>No books found</h3>
        <p>Try adjusting your search criteria or browse all books.</p>
      </div>
    );
  }

  return (
    <>
      <div className="book-results-info">
        <p>{books.length} book{books.length !== 1 ? 's' : ''} found</p>
      </div>
      
      <div className="book-grid">
        {books.map(book => (
          <BookCard 
            key={book._id}
            book={book}
            onClick={handleBookClick}
          />
        ))}
      </div>
      
      {selectedBook && (
        <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <BookDetails 
              book={selectedBook}
              onClose={() => setSelectedBook(null)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BookList;