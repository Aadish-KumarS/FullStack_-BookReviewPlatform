/**
 * ========================================
 * Books Routes
 * Defines RESTful endpoints for book operations.
 * Routes are protected where necessary.
 * ========================================
 */

import express from 'express';
import { getBooks, getBookById, createBook,deleteBook } from '../controllers/book.controller.js';
import { protect, admin } from '../middleware/auth.js';
import { bookCreateValidation, validateRequest } from '../middleware/validation.js';

const router = express.Router();

// GET /books - Retrieve all books with pagination and optional filters
router.get('/', getBooks);

// GET /books/:id - Retrieve a specific book by ID
router.get('/:id', getBookById);

// POST /books - Add a new book (admin only)
router.post('/', protect, admin, bookCreateValidation, validateRequest, createBook);

// DELETE /book - Delete a new book (admin only)
router.delete('/:id', protect, admin, deleteBook);

export default router;
