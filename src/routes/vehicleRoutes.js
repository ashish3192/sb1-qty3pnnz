const express = require('express');
const { body } = require('express-validator');
const vehicleController = require('../controllers/vehicleController');
const { validateRequest } = require('../middleware/validateRequest');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validateVehicle = [
  body('licensePlate').notEmpty().trim(),
  body('make').notEmpty().trim(),
  body('model').notEmpty().trim(),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() + 1 }),
  body('ownershipType').isIn(['owned', 'leased', 'rented']),
  body('insuranceExpiry').isISO8601(),
  validateRequest,
];

// Routes
router.get('/', authenticate, vehicleController.getAllVehicles);
router.get('/:id', authenticate, vehicleController.getVehicleById);
router.post('/', authenticate, validateVehicle, vehicleController.createVehicle);
router.put('/:id', authenticate, validateVehicle, vehicleController.updateVehicle);
router.delete('/:id', authenticate, vehicleController.deleteVehicle);

module.exports = router;