const { body } = require('express-validator');

const driverValidation = {
  createDriver: [
    body('name').notEmpty().trim(),
    body('phone').notEmpty().matches(/^\+?[\d\s-]+$/),
    body('email').isEmail().normalizeEmail(),
    body('licenseNumber').notEmpty().trim(),
    body('licenseExpiry').isISO8601(),
    body('status').isIn(['on-duty', 'off-duty']),
    body('password').isLength({ min: 6 })
  ],
  
  updateDriver: [
    body('name').optional().trim(),
    body('phone').optional().matches(/^\+?[\d\s-]+$/),
    body('email').optional().isEmail().normalizeEmail(),
    body('licenseNumber').optional().trim(),
    body('licenseExpiry').optional().isISO8601(),
    body('status').optional().isIn(['on-duty', 'off-duty'])
  ]
};

module.exports = driverValidation;