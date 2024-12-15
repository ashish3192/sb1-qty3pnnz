const { body } = require('express-validator');

const telematicsValidation = {
  createEntry: [
    body('vehicleId').notEmpty().isUUID(),
    body('gpsCoordinates').isArray(),
    body('gpsCoordinates.*.latitude').isFloat({ min: -90, max: 90 }),
    body('gpsCoordinates.*.longitude').isFloat({ min: -180, max: 180 }),
    body('gpsCoordinates.*.timestamp').isISO8601(),
    body('speed').isFloat({ min: 0 }),
    body('fuelLevel').isFloat({ min: 0, max: 100 }),
    body('engineStatus').isIn(['running', 'stopped'])
  ]
};

module.exports = telematicsValidation;