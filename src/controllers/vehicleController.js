const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const vehicleController = {
  // Get all vehicles
  async getAllVehicles(req, res) {
    try {
      const vehicles = await prisma.vehicle.findMany({
        include: {
          currentDriver: true,
          maintenanceRecords: true,
        },
      });
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get vehicle by ID
  async getVehicleById(req, res) {
    try {
      const vehicle = await prisma.vehicle.findUnique({
        where: { id: req.params.id },
        include: {
          currentDriver: true,
          maintenanceRecords: true,
        },
      });
      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      res.json(vehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new vehicle
  async createVehicle(req, res) {
    try {
      const vehicle = await prisma.vehicle.create({
        data: req.body,
      });
      res.status(201).json(vehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update vehicle
  async updateVehicle(req, res) {
    try {
      const vehicle = await prisma.vehicle.update({
        where: { id: req.params.id },
        data: req.body,
      });
      res.json(vehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete vehicle
  async deleteVehicle(req, res) {
    try {
      await prisma.vehicle.delete({
        where: { id: req.params.id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = vehicleController;