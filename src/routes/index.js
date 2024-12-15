const express = require('express');
const vehicleRoutes = require('./vehicleRoutes');
const driverRoutes = require('./driverRoutes');
const maintenanceRoutes = require('./maintenanceRoutes');
const telematicsRoutes = require('./telematicsRoutes');
const geofenceRoutes = require('./geofenceRoutes');

const router = express.Router();

router.use('/vehicles', vehicleRoutes);
router.use('/drivers', driverRoutes);
router.use('/maintenance', maintenanceRoutes);
router.use('/telematics', telematicsRoutes);
router.use('/geofences', geofenceRoutes);

module.exports = router;