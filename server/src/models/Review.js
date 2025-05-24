/**
 * ========================================
 * Review Model
 * Defines the schema for book reviews including
 * rating, comments, user reference, and timestamps.
 * ========================================
 */

import mongoose from 'mongoose';

// ---------------------------
// Review Schema Definition
// ---------------------------
const reviewSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'Associated book is required'],
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review author is required'],
      index: true,
    },

    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },

    comment: {
      type: String,
      trim: true,
      default: '',
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// ---------------------------
// Compound Index to Prevent Duplicate Reviews by Same User on a Book
// ---------------------------
reviewSchema.index({ book: 1, user: 1 }, { unique: true });

// ---------------------------
// Export the Review Model
// ---------------------------
const Review = mongoose.model('Review', reviewSchema);
export default Review;
