import  { useEffect, useState } from 'react';
import BookCard from '../components/books/BookCard';
import '../../styles/pages/admin.css';

const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [notification, setNotification] = useState(null);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    publishedYear: '',
    image: '',
  });

  const fetchBooks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/books');
      const data = await res.json();
      if (data.success) {
        setBooks(data.data);
      }
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const genres = [...new Set(books.map(book => book.genre))];
  
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newBook),
      });
      const data = await res.json();
      if (data.success) {
        setNewBook({
          title: '',
          author: '',
          description: '',
          genre: '',
          publishedYear: '',
          image: '',
        });
        setShowForm(false);
        fetchBooks();
        showNotification('Book added successfully!');
      } else {
        showNotification(data.message, 'error');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      showNotification('Failed to add book', 'error');
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setBooks(books.filter((book) => book._id !== id));
        showNotification('Book deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      showNotification('Failed to delete book', 'error');
    }
  };

  return (
    <div className="admin-page">
      {/* Animated Background Elements */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="admin-container">
        {/* Header Section */}
        <div className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Manage your book collection with style</p>
        </div>

        {/* Action Bar */}
        <div className="action-bar">
          <div className="search-filter-group">
            <div className="search-box">
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-dropdown">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="genre-select"
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>

          <button 
            className="add-book-btn"
            onClick={() => setShowForm(!showForm)}
          >
            <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Book
          </button>
        </div>

        {/* Add Book Form */}
        <div className={`form-container ${showForm ? 'form-visible' : ''}`}>
          <div className="form-wrapper">
            <div className="form-header">
              <h3>Add New Book</h3>
              <button 
                className="close-form-btn"
                onClick={() => setShowForm(false)}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="add-book-form" onSubmit={handleAddBook}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    placeholder="Enter book title"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Author</label>
                  <input
                    name="author"
                    value={newBook.author}
                    onChange={handleInputChange}
                    placeholder="Enter author name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Genre</label>
                  <input
                    name="genre"
                    value={newBook.genre}
                    onChange={handleInputChange}
                    placeholder="Enter genre"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Published Year</label>
                  <input
                    name="publishedYear"
                    type="number"
                    value={newBook.publishedYear}
                    onChange={handleInputChange}
                    placeholder="YYYY"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  name="description"
                  value={newBook.description}
                  onChange={handleInputChange}
                  placeholder="Enter book description"
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-group full-width">
                <label>Image URL</label>
                <input
                  name="image"
                  value={newBook.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL (optional)"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Books Grid */}
        <section className="admin-books">
          <div className="books-header">
            <h2>Book Collection</h2>
            <span className="books-count">{filteredBooks.length} books</span>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading books...</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="empty-state">
              <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3>No books found</h3>
              <p>Try adjusting your search or add a new book to get started.</p>
            </div>
          ) : (
            <div className="books-grid">
              {filteredBooks.map((book) => (
                <div key={book._id} className="admin-book-card">
                  <BookCard book={book} />
                  <div className="card-actions">
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteBook(book._id)}
                      title="Delete book"
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {notification && (
        <div className={`notification ${notification.type}`}>
          <div className="notification-content">
            <svg className="notification-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {notification.type === 'success' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              )}
            </svg>
            <span>{notification.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;