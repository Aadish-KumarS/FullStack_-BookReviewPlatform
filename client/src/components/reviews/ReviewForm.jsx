// src/components/reviews/ReviewForm.jsx
import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import '../../styles/pages/review.css';

const ReviewForm = ({ bookId }) => {
  const { user, token } = useContext(AppContext);

  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!user) return <p className="info-message">Please log in to submit a review.</p>;

  const validate = () => {
    const errors = {};
    if (!rating || rating < 1 || rating > 5) errors.rating = 'Rating must be between 1 and 5';
    if (!comment.trim()) errors.comment = 'Review comment is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch(`http://localhost:5000/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId, rating, comment }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg('Review submitted successfully!');
        setRating('');
        setComment('');
      } else {
        setErrors({ submit: data.message || 'Failed to submit review' });
      }
    } catch (err) {
      setErrors({ submit: 'Server error. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit} noValidate>
      <h3>Submit Your Review</h3>

      <label htmlFor="rating">Rating (1 to 5):</label>
      <input
        id="rating"
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        aria-invalid={errors.rating ? 'true' : 'false'}
      />
      {errors.rating && <p className="error-msg">{errors.rating}</p>}

      <label htmlFor="comment">Review:</label>
      <textarea
        id="comment"
        rows="4"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        aria-invalid={errors.comment ? 'true' : 'false'}
      />
      {errors.comment && <p className="error-msg">{errors.comment}</p>}

      {errors.submit && <p className="error-msg submit-error">{errors.submit}</p>}
      {successMsg && <p className="success-msg">{successMsg}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
