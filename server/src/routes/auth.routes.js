/**
 * ========================================
 * Authentication Routes
 * Handles user registration, login, and logout.
 * Uses JWT for authentication.
 * ========================================
 */

import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';
import { userCreateValidation, userLoginValidation, validateRequest } from '../middleware/validation.js';

const router = express.Router();

// POST /auth/register - Register a new user
router.post('/register', userCreateValidation, validateRequest, registerUser);

// POST /auth/login - Login user and return JWT token
router.post('/login', userLoginValidation, validateRequest, loginUser);

// POST /auth/logout - Logout user (optional token blacklist or client-side token removal)
router.post('/logout', protect, logoutUser);

// GET /auth/me - Get currently logged-in user's profile (token required)
router.get('/me', protect, getCurrentUser);

export default router;
