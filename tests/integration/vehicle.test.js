const request = require('supertest');
const app = require('../../src/server');
const { PrismaClient } = require('@prisma/client');
const { generateTestToken } = require('../utils/testHelpers');

const prisma = new PrismaClient();

describe('Vehicle Integration Tests', () => {
  let testVehicle;
  let authToken;

  beforeAll(async () => {
    // Create test admin and get auth token
    authToken = generateTestToken({ role: 'admin' });

    // Create test vehicle
    testVehicle = await prisma.vehicle.create({
      data: {
        licensePlate: 'TEST999',
        make: 'Toyota',
        model: 'Camry',
        year: 2023,
        ownershipType: 'owned',
        insuranceExpiry: new Date('2024-12-31'),
        status: 'active'
      }
    });
  });

  afterAll(async () => {
    await prisma.vehicle.delete({ where: { id: testVehicle.id } });
    await prisma.$disconnect();
  });

  describe('GET /api/vehicles', () => {
    it('should return all vehicles for authenticated user', async () => {
      const res = await request(app)
        .get('/api/vehicles')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.some(v => v.id === testVehicle.id)).toBe(true);
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/vehicles');
      expect(res.status).toBe(401);
    });
  });
});