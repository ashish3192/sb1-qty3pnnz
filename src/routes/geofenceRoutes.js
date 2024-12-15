const express = require('express');
const geofenceController = require('../controllers/geofence/geofenceController');
const geofenceValidation = require('../controllers/geofence/geofenceValidation');
const { validateRequest } = require('../middleware/validateRequest');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', geofenceController.getAllGeofences);
router.post('/', geofenceValidation.createGeofence, validateRequest, geofenceController.createGeofence);
router.get('/:geofenceId/logs', geofenceController.getGeofenceLogs);
router.post('/log', geofenceValidation.logEvent, validateRequest, geofenceController.logGeofenceEvent);

module.exports = router;