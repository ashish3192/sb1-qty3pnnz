const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('../../utils/asyncHandler');
const logger = require('../../utils/logger');

const prisma = new PrismaClient();

const maintenanceController = {
  getAllRecords: asyncHandler(async (req, res) => {
    const records = await prisma.maintenanceRecord.findMany({
      include: {
        vehicle: true,
        reportedBy: true
      }
    });
    res.json(records);
  }),

  getRecordById: asyncHandler(async (req, res) => {
    const record = await prisma.maintenanceRecord.findUnique({
      where: { id: req.params.id },
      include: {
        vehicle: true,
        reportedBy: true
      }
    });
    if (!record) {
      return res.status(404).json({ error: 'Maintenance record not found' });
    }
    res.json(record);
  }),

  createRecord: asyncHandler(async (req, res) => {
    const record = await prisma.maintenanceRecord.create({
      data: req.body,
      include: {
        vehicle: true,
        reportedBy: true
      }
    });
    logger.info(`New maintenance record created: ${record.id}`);
    res.status(201).json(record);
  }),

  updateRecord: asyncHandler(async (req, res) => {
    const record = await prisma.maintenanceRecord.update({
      where: { id: req.params.id },
      data: req.body,
      include: {
        vehicle: true,
        reportedBy: true
      }
    });
    logger.info(`Maintenance record updated: ${record.id}`);
    res.json(record);
  }),

  deleteRecord: asyncHandler(async (req, res) => {
    await prisma.maintenanceRecord.delete({
      where: { id: req.params.id }
    });
    logger.info(`Maintenance record deleted: ${req.params.id}`);
    res.status(204).send();
  })
};

module.exports = maintenanceController;