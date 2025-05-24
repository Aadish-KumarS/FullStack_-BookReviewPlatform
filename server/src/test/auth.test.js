/**
 * ===============================
 * Auth API Tests
 * Using Jest & Supertest to test /auth endpoints
 * ===============================
 */

import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js'; // Your Express app

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /api/auth/register', () => {
  it('should register a new user successfully', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'testuser123',
      email: 'testuserrr86@gmail.com',
      password: 'password123',
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data.user).toHaveProperty('_id');
    expect(res.body.data.user).toHaveProperty('name', 'testuser123');
  });

  it('should fail registration if email is invalid', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'user2',
      email: 'invalidemail',
      password: 'password123',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body.errors[0]).toHaveProperty('message', expect.stringContaining('Email must be valid'));
  });

  it('should fail registration if password is too short', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'user3',
      email: 'user3@gmail.com',
      password: '123',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body.errors[0]).toHaveProperty('message', expect.stringContaining('Password must be at least 6 characters'));
  });
});
