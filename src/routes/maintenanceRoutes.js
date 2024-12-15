const express = require('express');
const maintenanceController = require('../controllers/maintenance/maintenanceController');
const maintenanceValidation = require('../controllers/maintenance/maintenanceValidation');
const { validateRequest } = require('../middleware/validateRequest');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', maintenanceController.getAllRecords);
router.get('/:id', maintenanceController.getRecordById);
router.post('/', maintenanceValidation.createRecord, validateRequest, maintenanceController.createRecord);
router.put('/:id', maintenanceValidation.updateRecord, validateRequest, maintenanceController.updateRecord);
router.delete('/:id', maintenanceController.deleteRecord);

module.exports = router;