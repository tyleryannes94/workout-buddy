const express = require('express');
const userRoutes = require('../../routes/userRoutes'); 
const workoutRoutes = require('../../routes/workoutRoutes');
const mealRoutes = require('../../routes/mealRoutes');
const goalRoutes = require('../../routes/goalRoutes');
const friendRoutes = require('../../routes/friendRoutes')

const router = express.Router();

router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes);
router.use('/meals', mealRoutes);
router.use('/goals', goalRoutes);
router.use('/friends', friendRoutes)

module.exports = router;
