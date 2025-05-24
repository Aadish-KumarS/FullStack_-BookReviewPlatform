/**
 * ========================================
 * 🛢️ MongoDB Connection Configuration
 * Connects to MongoDB using Mongoose ORM.
 * Handles connection success, error, and resilience.
 * ========================================
 */

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // MongoDB connection string from environment
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    // Connect to MongoDB
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);

    // Optional: Retry logic (basic, can be extended)
    setTimeout(() => {
      console.log('🔁 Retrying MongoDB connection...');
      connectDB(); // Try again
    }, 3000);
  }
};

export default connectDB;
