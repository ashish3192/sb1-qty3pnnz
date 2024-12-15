const { body } = require('express-validator');

const geofenceValidation = {
  createGeofence: [
    body('name').notEmpty().trim(),
    body('coordinates').isArray(),
    body('coordinates.*.latitude').isFloat({ min: -90, max: 90 }),
    body('coordinates.*.longitude').isFloat({ min: -180, max: 180 }),
    body('radius').isFloat({ min: 0 })
  ],

  logEvent: [
    body('driverId').notEmpty().isUUID(),
    body('vehicleId').notEmpty().isUUID(),
    body('geofenceId').notEmpty().isUUID(),
    body('event').isIn(['check-in', 'check-out', 'breach'])
  ]
};

module.exports = geofenceValidation;