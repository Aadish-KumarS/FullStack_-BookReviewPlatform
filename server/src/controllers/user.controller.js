/**
 * ========================================
 * User Controller
 * Handles user profile retrieval and update logic.
 * Ensures users can only update their own profiles.
 * ========================================
 */

import User from '../models/User.js';

// GET /users/:id
// Retrieve user profile by ID
export const getUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Only allow user to fetch their own profile or admins (admin check can be added here)
    if (req.user._id.toString() !== id) {
      return res.status(403).json({ success: false, message: 'Unauthorized access' });
    }

    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// PUT /users/:id
// Update user profile by ID (only own profile)
export const updateUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Security: users can update only their own profile
    if (req.user._id.toString() !== id) {
      return res.status(403).json({ success: false, message: 'Unauthorized access' });
    }

    const updateFields = {};
    const allowedUpdates = ['name', 'email', 'password']; // Limit updatable fields

    allowedUpdates.forEach(field => {
      if (req.body[field]) updateFields[field] = req.body[field];
    });

    // If password is updated, hash it (assuming hashing middleware in model or here)
    // Example: await User.hashPassword if implemented; or handled in model pre-save hook

    // Find user and update
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Apply updates
    Object.assign(user, updateFields);
    await user.save();

    // Return updated user without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ success: true, data: userResponse });
  } catch (error) {
    next(error);
  }
};

// DELETE /users/:id
// Deletess user profile by ID 
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Security: User can only delete their own account
    if (req.user._id.toString() !== id) {
      return res.status(403).json({ success: false, message: 'Unauthorized access' });
    }

    // Optional: Clean up related data (e.g., user's reviews)
    await Review.deleteMany({ user: id });

    // Delete user from database
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Optionally: Inform client to clear authentication tokens on frontend

    res.status(200).json({ success: true, message: 'User account deleted successfully' });
  } catch (error) {
    next(error);
  }
};