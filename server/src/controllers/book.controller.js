/**
 * ========================================
 * Book Controller
 * Handles business logic for books endpoints.
 * Includes pagination, filtering, and error handling.
 * ========================================
 */

import Book from '../models/Book.js';

// GET /books
// Retrieve all books with optional pagination and filters
export const getBooks = async (req, res, next) => {
  try {
    // Pagination params with defaults
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Search filters
    const { title, author, genre } = req.query;
    const filter = {};

    if (title) filter.title = { $regex: title, $options: 'i' };
    if (author) filter.author = { $regex: author, $options: 'i' };
    if (genre) filter.genre = genre;

    // Count total documents matching filter for pagination metadata
    const total = await Book.countDocuments(filter);

    // Fetch books with filters and pagination, select specific fields including image
    const books = await Book.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .select('title author genre publishedYear averageRating ratingsCount image');

    res.status(200).json({
      success: true,
      data: books,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /books/:id
// Retrieve a single book by ID
export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

// POST /books
// Add a new book (Admin only)
export const createBook = async (req, res, next) => {
  try {
    const { title, author, description, genre, publishedYear, image } = req.body;

    // Basic validation - can be expanded or moved to middleware
    if (!title || !author || !description || !genre) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const newBook = new Book({
      title,
      author,
      description,
      genre,
      publishedYear,
      image
    });

    const savedBook = await newBook.save();

    res.status(201).json({ success: true, data: savedBook });
  } catch (error) {
    next(error);
  }
};

// DELETE /book
// Delete a book (Admin only)
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.status(200).json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};