const express = require('express');
const userRoutes = require('../../routes/userRoutes'); 
const workoutRoutes = require('../../routes/workoutRoutes');
const mealRoutes = require('../../routes/mealRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes);
router.use('/meals', mealRoutes);

module.exports = router;
