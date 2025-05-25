import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import '../../styles/pages/review.css';

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

    useEffect(() => {
    if (!bookId) return; 

    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/reviews?book=${bookId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        setReviews(data.data || []);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
        setError('Failed to load reviews');
      }
    };


    fetchReviews();
  }, [bookId]);

  if (error) return <div>{error}</div>;

  return (
    <div className="review-list">
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))
      )}
    </div>
  );
};

export default ReviewList;
