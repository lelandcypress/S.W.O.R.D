const router = require('express').Router();
const userRoutes = require('./userRoutes');
const missionRoutes = require('./missionRoutes');
const dataRoutes = require('./dataRoutes');


router.use('/users', userRoutes);
router.use('/missions', missionRoutes);
router.use('/data', dataRoutes);

module.exports = router;
