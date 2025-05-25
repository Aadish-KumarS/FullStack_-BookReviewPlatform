// BookDetails.jsx
import React, { useState } from 'react';

const BookDetails = ({ book, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!book) return (
    <div className="book-loading">
      <div className="loading-spinner"></div>
      <p>Loading book details...</p>
    </div>
  );

  return (
    <div className="book-details-container">
      {onClose && (
        <button className="close-btn" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      )}
      
      <div className="book-details">
        <div className="book-cover-section">
          {!imageLoaded && (
            <div className="book-cover-skeleton">
              <div className="skeleton-shimmer"></div>
            </div>
          )}
          <img
            className="book-cover"
            src={book.image || '/placeholder.jpg'}
            alt={book.title}
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
          <div className="book-actions">
            <button className="btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Add to Favorites
            </button>
            <button className="btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Write Review
            </button>
          </div>
        </div>

        <div className="book-info">
          <div className="book-header">
            <h1 className="title">{book.title}</h1>
            <p className="author">by {book.author}</p>
            <div className="book-badges">
              <span className="badge genre-badge">{book.genre}</span>
              <span className="badge rating-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                {book.averageRating || 'N/A'} Rating
              </span>
              <span className="badge pages-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 19.5A2.5 2.5 0 0 1 1.5 17V7A2.5 2.5 0 0 1 4 4.5h16A2.5 2.5 0 0 1 22.5 7v10a2.5 2.5 0 0 1-2.5 2.5H4z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                {book.pages || '000'} Pages
              </span>
            </div>
          </div>

          <div className="book-tabs">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
            <button 
              className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-content">
                <h3>Description</h3>
                <p className="description">{book.description}</p>
                <div className="book-stats">
                  <div className="stat-item">
                    <span className="stat-label">Published</span>
                    <span className="stat-value">{book.publishedDate || '2023'}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Language</span>
                    <span className="stat-value">{book.language || 'English'}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">ISBN</span>
                    <span className="stat-value">{book.isbn || 'N/A'}</span>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <div className="reviews-summary">
                  <div className="rating-overview">
                    <div className="rating-score">
                      <span className="score">{book.averageRating || '0.0'}</span>
                      <div className="stars">
                        {[1,2,3,4,5].map(star => (
                          <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                      <span className="review-count">{book.reviewCount || '0'} reviews</span>
                    </div>
                  </div>
                </div>
                <div className="reviews-list">
                  <p>Reviews will be displayed here...</p>
                </div>
              </div>
            )}
            
            {activeTab === 'details' && (
              <div className="details-content">
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Publisher</span>
                    <span className="detail-value">{book.publisher || 'Unknown'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Publication Date</span>
                    <span className="detail-value">{book.publishedDate || 'Unknown'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Pages</span>
                    <span className="detail-value">{book.pages || 'Unknown'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Language</span>
                    <span className="detail-value">{book.language || 'English'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">ISBN-10</span>
                    <span className="detail-value">{book.isbn10 || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">ISBN-13</span>
                    <span className="detail-value">{book.isbn13 || 'N/A'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;