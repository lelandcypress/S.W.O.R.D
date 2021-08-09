const router = require('express').Router();
const userRoutes = require('./userRoutes');
const missionRoutes = require('./missionRoutes');


router.use('/users', userRoutes);
router.use('/missions', missionRoutes);

module.exports = router;
