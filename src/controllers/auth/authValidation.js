const { body } = require('express-validator');

const authValidation = {
  login: [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  
  register: [
    body('name').notEmpty().trim(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('phone').matches(/^\+?[\d\s-]+$/),
    body('licenseNumber').notEmpty().trim(),
    body('licenseExpiry').isISO8601()
  ]
};

module.exports = authValidation;