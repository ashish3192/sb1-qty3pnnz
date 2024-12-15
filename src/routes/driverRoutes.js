const express = require('express');
const driverController = require('../controllers/driver/driverController');
const driverValidation = require('../controllers/driver/driverValidation');
const { validateRequest } = require('../middleware/validateRequest');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', driverController.getAllDrivers);
router.get('/:id', driverController.getDriverById);
router.post('/', driverValidation.createDriver, validateRequest, driverController.createDriver);
router.put('/:id', driverValidation.updateDriver, validateRequest, driverController.updateDriver);
router.delete('/:id', driverController.deleteDriver);

module.exports = router;