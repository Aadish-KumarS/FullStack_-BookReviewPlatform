/**
 * ===============================
 * Reviews API Tests
 * Tests protected POST /api/reviews endpoint with validation
 * ===============================
 */

import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';
import User from '../models/User.js';
import Book from '../models/Book.js';
import jwt from 'jsonwebtoken';

let mongoServer;
let userToken;
let bookId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Create user (consider hashing password or bypassing auth middleware in tests)
  const user = new User({
    name: 'reviewer123',
    email: 'reviewer@gmail.com',
    password: 'reviewpass123',
  });
  await user.save();

  // Create JWT token for the user
  userToken = jwt.sign(
    { id: user._id, admin: 'user' },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '1h' }
  );

  // Create a book to review
  const book = new Book({
      title: 'Test Book',
      author: 'Test Author',
      genre: 'Fiction',
      description: 'A compelling story of adventure.',
  });
  await book.save();
  bookId = book._id.toString();
  
  
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /api/reviews', () => {
  it('should allow authenticated user to submit a review', async () => {
    
    const res = await request(app)
      .post('/api/reviews')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        book: bookId,
        rating: 4,
        comment: 'Great book!',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('rating', 4);
  });

  it('should reject unauthenticated users', async () => {
    const res = await request(app).post('/api/reviews').send({
      bookId,
      rating: 5,
    });

    expect(res.statusCode).toEqual(401);
  });

  it('should validate rating range', async () => {
    const res = await request(app)
      .post('/api/reviews')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        book: bookId,
        rating: 10, // invalid rating, assuming max 5
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0]).toHaveProperty('message', expect.stringContaining('Rating must be an integer between 1 and 5'));
  });

  it('should reject if required fields missing', async () => {
    const res = await request(app)
      .post('/api/reviews')
      .set('Authorization', `Bearer ${userToken}`)
      .send({});

    expect(res.statusCode).toEqual(400);
  });
});
