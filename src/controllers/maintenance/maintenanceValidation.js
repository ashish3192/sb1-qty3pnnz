const { body } = require('express-validator');

const maintenanceValidation = {
  createRecord: [
    body('description').notEmpty().trim(),
    body('status').isIn(['pending', 'in-progress', 'completed']),
    body('cost').isFloat({ min: 0 }),
    body('vehicleId').notEmpty().isUUID(),
    body('driverId').notEmpty().isUUID(),
    body('issuePhotos').optional().isArray(),
    body('issuePhotos.*').optional().isURL(),
    body('vendorId').optional().isUUID()
  ],

  updateRecord: [
    body('description').optional().trim(),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']),
    body('cost').optional().isFloat({ min: 0 }),
    body('issuePhotos').optional().isArray(),
    body('issuePhotos.*').optional().isURL(),
    body('vendorId').optional().isUUID()
  ]
};

module.exports = maintenanceValidation;