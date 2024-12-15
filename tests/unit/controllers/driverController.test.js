const driverController = require('../../../src/controllers/driver/driverController');
const { PrismaClient } = require('@prisma/client');
const { NotFoundError } = require('../../../src/utils/errors');

jest.mock('@prisma/client');

describe('DriverController', () => {
  let mockPrisma;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockPrisma = {
      driver: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      }
    };
    PrismaClient.mockImplementation(() => mockPrisma);

    mockReq = {
      params: {},
      body: {}
    };
    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  describe('getAllDrivers', () => {
    it('should return all drivers', async () => {
      const mockDrivers = [{ id: '1', name: 'Test Driver' }];
      mockPrisma.driver.findMany.mockResolvedValue(mockDrivers);

      await driverController.getAllDrivers(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockDrivers);
    });
  });

  describe('getDriverById', () => {
    it('should return driver by id', async () => {
      const mockDriver = { id: '1', name: 'Test Driver' };
      mockPrisma.driver.findUnique.mockResolvedValue(mockDriver);
      mockReq.params.id = '1';

      await driverController.getDriverById(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockDriver);
    });

    it('should return 404 if driver not found', async () => {
      mockPrisma.driver.findUnique.mockResolvedValue(null);
      mockReq.params.id = '999';

      await driverController.getDriverById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });
});