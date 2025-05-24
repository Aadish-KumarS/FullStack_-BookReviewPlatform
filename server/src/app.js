/**
 * ========================================
 * Express App Configuration
 * Sets up middleware, routing, and global error handlers.
 * ========================================
 */

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import booksRoutes from './routes/books.routes.js';
import reviewsRoutes from './routes/reviews.routes.js';
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';

// import errorHandler from './middleware/errorHandler.js';

const app = express();

dotenv.config();
// --------------------
// Global Middleware
// --------------------
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON
app.use(morgan('dev')); // Log HTTP requests in dev mode

// --------------------
// Health Check Route
// --------------------
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Book Review API is up and running!',
    status: 'success',
  });
});


/**
 * ======================
 * Routes Registration
 * ======================
 */

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/reviews', reviewsRoutes);

// --------------------
// 404 Handler
// --------------------
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `🔍 Route not found: ${req.originalUrl}`,
  });
});


/**
 * ======================
 * Error Handling Middleware
 * ======================
 */

// Catch all unmatched routes and respond with 404
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Centralized error handler middleware
// app.use(errorHandler);

// --------------------
// Global Error Handler (To be enhanced later)
// --------------------
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

export default app;
