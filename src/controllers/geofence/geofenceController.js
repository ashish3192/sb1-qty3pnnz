const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('../../utils/asyncHandler');
const logger = require('../../utils/logger');

const prisma = new PrismaClient();

const geofenceController = {
  getAllGeofences: asyncHandler(async (req, res) => {
    const geofences = await prisma.geofence.findMany({
      include: {
        logs: {
          take: 10,
          orderBy: { timestamp: 'desc' }
        }
      }
    });
    res.json(geofences);
  }),

  createGeofence: asyncHandler(async (req, res) => {
    const geofence = await prisma.geofence.create({
      data: req.body
    });
    logger.info(`New geofence created: ${geofence.id}`);
    res.status(201).json(geofence);
  }),

  logGeofenceEvent: asyncHandler(async (req, res) => {
    const log = await prisma.geofenceLog.create({
      data: req.body,
      include: {
        driver: true,
        vehicle: true,
        geofence: true
      }
    });
    logger.info(`New geofence event logged: ${log.id}`);
    res.status(201).json(log);
  }),

  getGeofenceLogs: asyncHandler(async (req, res) => {
    const logs = await prisma.geofenceLog.findMany({
      where: { geofenceId: req.params.geofenceId },
      include: {
        driver: true,
        vehicle: true
      },
      orderBy: { timestamp: 'desc' },
      take: 100
    });
    res.json(logs);
  })
};

module.exports = geofenceController;