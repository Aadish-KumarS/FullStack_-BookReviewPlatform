/**
 * ========================================
 * Review Controller
 * Handles logic for retrieving and submitting reviews.
 * Includes checks to prevent duplicate reviews.
 * ========================================
 */

import Review from '../models/Review.js';
import Book from '../models/Book.js';

// GET /reviews?book=bookId
// Retrieve all reviews for a given book ID
export const getReviewsByBook = async (req, res, next) => {
  try {
    const { book } = req.query;

    if (!book) {
      return res.status(400).json({ success: false, message: 'Book ID is required' });
    }

    const reviews = await Review.find({ book })
      .populate('user', 'name') // Populate reviewer name only
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

// POST /reviews
// Submit a new review (one per user per book)
// Also updates the book's average rating and rating count
export const createReview = async (req, res, next) => {
  try {
    const { bookId, rating, comment } = req.body;
    console.log(bookId, rating, comment);

    const userId = req.user._id;

    // Validate input presence
    if (!bookId || !rating) {
      return res.status(400).json({ success: false, message: 'Book and rating are required' });
    }

    // Prevent duplicate review by same user for same book
    const existingReview = await Review.findOne({ book: bookId, user: userId });
    if (existingReview) {
      return res.status(409).json({ success: false, message: 'You have already reviewed this book' });
    }

    // Create new review document
    const newReview = new Review({
      book: bookId,
      user: userId,
      rating,
      comment: comment || '',
    });

    await newReview.save();

    // Update book's averageRating and ratingsCount atomically
    const reviews = await Review.find({ book: bookId });

    const ratingsCount = reviews.length;
    const averageRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / ratingsCount;

    await Book.findByIdAndUpdate(bookId, {
      ratingsCount,
      averageRating,
    });

    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    next(error);
  }
};
