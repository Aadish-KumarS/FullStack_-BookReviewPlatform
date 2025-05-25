import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReviewForm from '../components/reviews/ReviewForm';
import ReviewList from '../components/reviews/ReviewList';
import '../styles/pages/review.css'

const ReviewPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/books/${bookId}`);
        const data = await res.json();
        setBook(data.data);
      } catch (error) {
        console.error('Failed to fetch book', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="review-page">
      <div className="book-details">
        <img src={book.image} alt={book.title} />
        <h2>{book.title}</h2>
        <p>By {book.author}</p>
        <p>Genre: {book.genre}</p>
      </div>

      <ReviewForm bookId={bookId} />
      <ReviewList bookId={bookId} />
    </div>
  );
};

export default ReviewPage;
