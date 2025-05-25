/**
 * ========================================
 * Validation Middleware using express-validator
 * Defines reusable validation chains and error handling for request validation.
 * ========================================
 */

import {validationResult } from 'express-validator';
import { check } from 'express-validator';

/**
 * Middleware to check for validation errors from express-validator
 * If errors exist, respond with 400 Bad Request and error details.
 */
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Format error messages for clarity
    const extractedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg,
    }));

    return res.status(400).json({
      success: false,
      errors: extractedErrors,
    });
  }

  next();
};

/**
 * Validation rules for creating a new user
 */
export const userCreateValidation = [
  // username: required, alphanumeric, 3-30 chars
  check('name')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric'),

  // email: required, valid email format
  check('email')
    .isEmail()
    .withMessage('Email must be valid')
    .normalizeEmail(),

  // password: required, minimum 6 chars
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

/**
 * Validation rules for login
 */
export const userLoginValidation = [
  check('email')
    .isEmail()
    .withMessage('Email must be valid')
    .normalizeEmail(),

  check('password')
    .exists()
    .withMessage('Password is required'),
];

/**
 * Validation rules for adding a new book (admin only)
 */
export const bookCreateValidation = [
  check('title')
    .trim()
    .notEmpty()
    .withMessage('Book title is required'),

  check('author')
    .trim()
    .notEmpty()
    .withMessage('Author name is required'),

  check('publishedDate')
    .optional()
    .isISO8601()
    .withMessage('Published date must be a valid date'),

  check('genre')
    .optional()
    .notEmpty()
    .withMessage('Genre is required'),

  check('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
];

/**
 * Validation rules for submitting a review
 */
export const reviewCreateValidation = [
  check('bookId')
    .notEmpty()
    .withMessage('Book ID is required')
    .isMongoId()
    .withMessage('Book ID must be a valid Mongo ID'),

  check('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),

  check('comment')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Comment cannot exceed 500 characters'),
];

