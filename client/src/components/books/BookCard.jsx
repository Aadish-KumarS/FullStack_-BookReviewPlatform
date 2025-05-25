import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/review/${book._id}`);
  };

  return (
    <div  className="book-card"  onClick={handleClick}>
      <img src={book.image || '/placeholder.jpg'} alt={book.title} />
      <div className="book-card-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <div className="book-rating">⭐ {book.averageRating || 'N/A'}</div>
      </div>
    </div>
  );
};

export default BookCard;
