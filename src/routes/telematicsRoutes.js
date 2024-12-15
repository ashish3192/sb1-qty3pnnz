const express = require('express');
const telematicsController = require('../controllers/telematics/telematicsController');
const telematicsValidation = require('../controllers/telematics/telematicsValidation');
const { validateRequest } = require('../middleware/validateRequest');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/vehicle/:vehicleId', telematicsController.getVehicleTelematics);
router.get('/vehicle/:vehicleId/latest', telematicsController.getLatestTelematics);
router.post('/', telematicsValidation.createEntry, validateRequest, telematicsController.createTelematicsEntry);

module.exports = router;