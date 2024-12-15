const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('../../utils/asyncHandler');
const logger = require('../../utils/logger');

const prisma = new PrismaClient();

const telematicsController = {
  getVehicleTelematics: asyncHandler(async (req, res) => {
    const telematics = await prisma.telematics.findMany({
      where: { vehicleId: req.params.vehicleId },
      orderBy: { timestamp: 'desc' },
      take: 100
    });
    res.json(telematics);
  }),

  createTelematicsEntry: asyncHandler(async (req, res) => {
    const entry = await prisma.telematics.create({
      data: req.body
    });
    logger.info(`New telematics entry created for vehicle: ${entry.vehicleId}`);
    res.status(201).json(entry);
  }),

  getLatestTelematics: asyncHandler(async (req, res) => {
    const latest = await prisma.telematics.findFirst({
      where: { vehicleId: req.params.vehicleId },
      orderBy: { timestamp: 'desc' }
    });
    if (!latest) {
      return res.status(404).json({ error: 'No telematics data found' });
    }
    res.json(latest);
  })
};

module.exports = telematicsController;