const express = require('express');
const authController = require('../controllers/auth/authController');
const authValidation = require('../controllers/auth/authValidation');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

router.post('/login', authValidation.login, validateRequest, authController.login);
router.post('/register', authValidation.register, validateRequest, authController.register);

module.exports = router;