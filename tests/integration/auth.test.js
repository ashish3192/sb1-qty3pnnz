const request = require('supertest');
const app = require('../../src/server');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

describe('Auth Integration Tests', () => {
  let testDriver;

  beforeAll(async () => {
    // Create test driver
    testDriver = await prisma.driver.create({
      data: {
        name: 'Test Driver',
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
        phone: '+1234567890',
        licenseNumber: 'TEST123',
        licenseExpiry: new Date('2024-12-31'),
        status: 'off-duty'
      }
    });
  });

  afterAll(async () => {
    // Cleanup
    await prisma.driver.delete({ where: { id: testDriver.id } });
    await prisma.$disconnect();
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.driver).toHaveProperty('id');
      expect(res.body.driver.email).toBe('test@example.com');
    });

    it('should fail with invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(res.status).toBe(401);
    });
  });
});