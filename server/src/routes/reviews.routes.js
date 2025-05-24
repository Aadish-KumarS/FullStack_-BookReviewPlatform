/**
 * ========================================
 * Reviews Routes
 * Defines RESTful endpoints for review operations.
 * User authentication required for posting reviews.
 * ========================================
 */

import express from 'express';
import {
  getReviewsByBook,
  createReview,
} from '../controllers/review.controller.js';
import { protect } from '../middleware/auth.js';
import { reviewCreateValidation, validateRequest } from '../middleware/validation.js';

const router = express.Router();

// GET /reviews?book=bookId - Retrieve reviews for a specific book
router.get('/', getReviewsByBook);

// POST /reviews - Submit a new review (authenticated users only)
router.post('/', protect, reviewCreateValidation, validateRequest, createReview);

export default router;
