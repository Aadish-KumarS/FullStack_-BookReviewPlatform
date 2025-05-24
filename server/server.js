/**
 * ========================================
 * Server Entry Point
 * Initializes environment, connects to DB, starts the server.
 * ========================================
 */

import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/config/database.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Start the server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start listening on the defined port
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1); // Exit with failure
  }
};

startServer();
