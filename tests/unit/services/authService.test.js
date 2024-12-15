const authService = require('../../../src/services/auth/authService');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

jest.mock('@prisma/client');
jest.mock('bcryptjs');

describe('AuthService', () => {
  let mockPrisma;

  beforeEach(() => {
    mockPrisma = {
      driver: {
        findUnique: jest.fn(),
        create: jest.fn()
      }
    };
    PrismaClient.mockImplementation(() => mockPrisma);
  });

  describe('login', () => {
    it('should return token and driver data for valid credentials', async () => {
      const mockDriver = {
        id: '123',
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test Driver'
      };

      mockPrisma.driver.findUnique.mockResolvedValue(mockDriver);
      bcrypt.compare.mockResolvedValue(true);

      const result = await authService.login('test@example.com', 'password');

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('driver');
      expect(result.driver.id).toBe(mockDriver.id);
    });

    it('should throw error for invalid credentials', async () => {
      mockPrisma.driver.findUnique.mockResolvedValue(null);

      await expect(
        authService.login('wrong@example.com', 'password')
      ).rejects.toThrow('Invalid credentials');
    });
  });
});