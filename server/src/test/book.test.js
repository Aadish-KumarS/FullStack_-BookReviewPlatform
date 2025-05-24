/**
 * ===============================
 * Books API Tests
 * Tests admin protected POST /books endpoint
 * ===============================
 */

import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

let mongoServer;
let adminToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Create admin user with hashed password if needed
  const adminUser = new User({
    name: 'admin',
    email: 'admin@example.com',
    password: 'adminpass123',
    role: 'admin',
  });
  await adminUser.save();

  // Generate JWT token for admin user
  adminToken = jwt.sign(
    { id: adminUser._id, isAdmin: true },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '1h' }
  );
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /books', () => {
  it('should allow admin to create a book', async () => {
    const res = await request(app)
      .post('/api/books') // Use correct endpoint
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Test Book',
        author: 'Author Name',
        genre: 'Adventure',
        description: 'A test book description',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('title', 'Test Book');
  });

  it('should reject if no token provided', async () => {
    const res = await request(app).post('/api/books').send({
      title: 'Book Without Auth',
      author: 'Someone',
    });

    expect(res.statusCode).toEqual(401);
  });

  it('should reject if user is not admin', async () => {
    // Create non-admin user
    const user = new User({
      name: 'normaluser', // consistent field name
      email: 'user@example.com',
      password: 'userpass123',
      isAdmin: false,
    });
    await user.save();

    const userToken = jwt.sign(
      { id: user._id, isAdmin: false },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        title: 'Unauthorized Book',
        author: 'Unauthorized Author',
      });

    expect(res.statusCode).toEqual(403);
  });
});
