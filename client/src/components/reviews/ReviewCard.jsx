// src/components/reviews/ReviewCard.jsx
import '../../styles/components/reviewCard.css';

const ReviewCard = ({ review }) => {
  const { user = {}, rating, comment, createdAt } = review;
  const displayName = user.name || 'Anonymous';

  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="review-card">
      <div className="review-header">
        <h4>{displayName}</h4>
        <span className="rating">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
      </div>
      <p className="review-comment">{comment}</p>
      <span className="review-date">{formattedDate}</span>
    </div>
  );
};

export default ReviewCard;
