const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('../../utils/asyncHandler');
const logger = require('../../utils/logger');

const prisma = new PrismaClient();

const driverController = {
  getAllDrivers: asyncHandler(async (req, res) => {
    const drivers = await prisma.driver.findMany({
      include: {
        currentVehicle: true,
        documents: true
      }
    });
    res.json(drivers);
  }),

  getDriverById: asyncHandler(async (req, res) => {
    const driver = await prisma.driver.findUnique({
      where: { id: req.params.id },
      include: {
        currentVehicle: true,
        documents: true,
        issuesReported: true
      }
    });
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.json(driver);
  }),

  createDriver: asyncHandler(async (req, res) => {
    const driver = await prisma.driver.create({
      data: req.body,
      include: {
        currentVehicle: true
      }
    });
    logger.info(`New driver created: ${driver.id}`);
    res.status(201).json(driver);
  }),

  updateDriver: asyncHandler(async (req, res) => {
    const driver = await prisma.driver.update({
      where: { id: req.params.id },
      data: req.body,
      include: {
        currentVehicle: true
      }
    });
    logger.info(`Driver updated: ${driver.id}`);
    res.json(driver);
  }),

  deleteDriver: asyncHandler(async (req, res) => {
    await prisma.driver.delete({
      where: { id: req.params.id }
    });
    logger.info(`Driver deleted: ${req.params.id}`);
    res.status(204).send();
  })
};

module.exports = driverController;