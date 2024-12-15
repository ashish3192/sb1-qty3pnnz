const maintenanceController = require('../../../src/controllers/maintenance/maintenanceController');
const { PrismaClient } = require('@prisma/client');
const logger = require('../../../src/utils/logger');

jest.mock('@prisma/client');
jest.mock('../../../src/utils/logger');

describe('MaintenanceController', () => {
  let mockPrisma;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockPrisma = {
      maintenanceRecord: {
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

  describe('createRecord', () => {
    it('should create a maintenance record successfully', async () => {
      const mockRecord = {
        description: 'Oil Change',
        status: 'pending',
        cost: 50.0,
        vehicleId: '123',
        driverId: '456'
      };
      mockReq.body = mockRecord;
      mockPrisma.maintenanceRecord.create.mockResolvedValue({ id: '1', ...mockRecord });

      await maintenanceController.createRecord(mockReq, mockRes);

      expect(mockPrisma.maintenanceRecord.create).toHaveBeenCalledWith({
        data: mockRecord,
        include: {
          vehicle: true,
          reportedBy: true
        }
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(logger.info).toHaveBeenCalled();
    });
  });

  describe('getRecordById', () => {
    it('should return 404 for non-existent record', async () => {
      mockPrisma.maintenanceRecord.findUnique.mockResolvedValue(null);
      mockReq.params.id = '999';

      await maintenanceController.getRecordById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Maintenance record not found' });
    });
  });
});