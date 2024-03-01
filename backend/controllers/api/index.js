const express = require('express');
const userRoutes = require('../../routes/userRoutes'); 
const workoutRoutes = require('../../routes/workoutRoutes');
const workoutPlanRoutes = require('../../routes/workoutPlanRoutes');
const mealPlanRoutes = require('../../routes/mealPlanRoutes');
const mealRoutes = require('../../routes/mealRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes);
router.use('/workoutplans', workoutPlanRoutes);
router.use('/mealplans', mealPlanRoutes);
router.use('/meals', mealRoutes);

module.exports = router;
