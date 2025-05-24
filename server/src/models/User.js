/**
 * ========================================
 * User Model
 * Defines the schema for application users, including
 * credentials, role, and timestamps.
 * ========================================
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// ---------------------------
// User Schema Definition
// ---------------------------
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Prevents password from being returned in queries
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// ---------------------------
// Password Hash Middleware
// ---------------------------
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if changed
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ---------------------------
// Instance Method: Compare Password
// ---------------------------
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ---------------------------
// Export the User Model
// ---------------------------
const User = mongoose.model('User', userSchema);
export default User;
