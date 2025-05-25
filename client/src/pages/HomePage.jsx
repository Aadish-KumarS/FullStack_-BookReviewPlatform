// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/home.css';
import BookList from '../components/books/BookList';

const HomePage = () => {
  return (
    <main className="home-container">
      <section className="hero-section">
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">✨ Discover Your Next Favorite</div>
          <h1>Welcome to <span className="brand-highlight">Book Review</span></h1>
          <p>Your premium destination to explore, review, and rate books you love. Join thousands of readers in building the ultimate literary community.</p>
          <div className="hero-actions">
            <Link to="/books" className="hero-btn primary">
              <span>Browse Books</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/register" className="hero-btn secondary">Join Community</Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Books</div>
            </div>
            <div className="stat">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Reviews</div>
            </div>
            <div className="stat">
              <div className="stat-number">25K+</div>
              <div className="stat-label">Readers</div>
            </div>
          </div>
        </div>
      </section>

      <section className="highlight-section">
        <div className="section-header">
          <h2>Top Picks for You</h2>
          <p>Curated recommendations based on trending reads and community favorites</p>
        </div>
        <BookList highlight={true} />
      </section>
    </main>
  );
};

export default HomePage;