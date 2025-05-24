/**
 * ========================================
 * Authentication Middleware
 * Protects routes by verifying JWT token and attaching user info to request object.
 * ========================================
 */

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Middleware to protect routes - verifies JWT token.
 * On success, attaches the user object to req.user.
 * On failure, responds with 401 Unauthorized.
 */
export const protect = async (req, res, next) => {
  let token;

  try {
    // Extract token from Authorization header 'Bearer <token>'
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided',
      });
    }

    // Verify token using secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB excluding password
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, user not found',
      });
    }

    // Attach user to request for downstream handlers
    req.user = user;

    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);

    // Handle JWT errors explicitly
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token invalid or expired',
      });
    }

    // Pass other errors to error handler middleware
    next(error);
  }
};

/**
 * Admin Authorization Middleware
 * Ensures that the logged-in user has admin privileges.
 */
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    // User is admin, allow access
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied: Admins only',
    });
  }
};
