/**
 * ========================================
 * Users Routes
 * Defines RESTful endpoints for user profile retrieval and update.
 * Authentication required for protected routes.
 * ========================================
 */

import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  deleteUser
} from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';  
import { check } from 'express-validator';

const router = express.Router();

// Update user profile validation
const userUpdateValidation = [
  check('username')
    .optional()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric'),
  check('email')
    .optional()
    .isEmail()
    .withMessage('Email must be valid')
    .normalizeEmail(),
];

// GET /users/:id - Retrieve user profile by ID (protected)
router.get('/:id', protect, getUserProfile);

// PUT /users/:id - Update user profile by ID (protected, user can only update own profile)
router.put('/:id', protect, userUpdateValidation, validateRequest, updateUserProfile);

// DELETE /users/:id - Delete user account (protected)
router.delete('/:id', protect, deleteUser);


export default router;
