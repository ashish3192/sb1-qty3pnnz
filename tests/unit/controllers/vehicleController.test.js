const vehicleController = require('../../../src/controllers/vehicleController');
const { PrismaClient } = require('@prisma/client');
const logger = require('../../../src/utils/logger');

jest.mock('@prisma/client');
jest.mock('../../../src/utils/logger');

describe('VehicleController', () => {
  let mockPrisma;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockPrisma = {
      vehicle: {
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

  describe('getAllVehicles', () => {
    it('should return all vehicles with related data', async () => {
      const mockVehicles = [
        {
          id: '1',
          licensePlate: 'ABC123',
          currentDriver: { name: 'John Doe' },
          maintenanceRecords: []
        }
      ];
      mockPrisma.vehicle.findMany.mockResolvedValue(mockVehicles);

      await vehicleController.getAllVehicles(mockReq, mockRes);

      expect(mockPrisma.vehicle.findMany).toHaveBeenCalledWith({
        include: {
          currentDriver: true,
          maintenanceRecords: true
        }
      });
      expect(mockRes.json).toHaveBeenCalledWith(mockVehicles);
    });

    it('should handle errors properly', async () => {
      const error = new Error('Database error');
      mockPrisma.vehicle.findMany.mockRejectedValue(error);

      await vehicleController.getAllVehicles(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('createVehicle', () => {
    it('should create a new vehicle successfully', async () => {
      const mockVehicle = {
        licensePlate: 'XYZ789',
        make: 'Toyota',
        model: 'Camry'
      };
      mockReq.body = mockVehicle;
      mockPrisma.vehicle.create.mockResolvedValue({ id: '1', ...mockVehicle });

      await vehicleController.createVehicle(mockReq, mockRes);

      expect(mockPrisma.vehicle.create).toHaveBeenCalledWith({
        data: mockVehicle
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });
  });
});