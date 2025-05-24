/**
 * ========================================
 * Book Model
 * Defines the schema for books including metadata,
 * ratings, and timestamps.
 * ========================================
 */

import mongoose from 'mongoose';

// ---------------------------
// Book Schema Definition
// ---------------------------
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
      index: true, // Indexed for faster search
    },

    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      index: true,
    },

    description: {
      type: String,
      required: [true, 'Book description is required'],
      trim: true,
    },

    genre: {
      type: String,
      required: [true, 'Genre is required'],
      trim: true,
      index: true,
    },

    publishedYear: {
      type: Number,
      min: [0, 'Published year cannot be negative'],
      max: [new Date().getFullYear(), 'Published year cannot be in the future'],
    },

    averageRating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5'],
      // Will be updated programmatically based on reviews
    },

    ratingsCount: {
      type: Number,
      default: 0,
      min: [0, 'Ratings count cannot be negative'],
    },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

// ---------------------------
// Export the Book Model
// ---------------------------
const Book = mongoose.model('Book', bookSchema);
export default Book;
