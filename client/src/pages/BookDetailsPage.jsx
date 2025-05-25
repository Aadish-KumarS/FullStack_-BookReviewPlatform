// src/pages/BookDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/reviews/ReviewForm';
import ReviewList from '../components/reviews/ReviewList';
import '../styles/pages/book.css';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        const data = await res.json();
        if (data.success) {
          setBook(data.data);
        } else {
          setError('Book not found');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching the book');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p className="book-loading">Loading...</p>;
  if (error) return <p className="book-error">{error}</p>;

  return (
    <div className="book-details-page">
      <div className="book-info">
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p className="book-description">{book.description}</p>
        <p><strong>Rating:</strong> {book.averageRating || 'No ratings yet'}</p>
      </div>

      <ReviewForm bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
};

export default BookDetailsPage;
