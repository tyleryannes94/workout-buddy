const express = require('express');
const workoutController = require('../controllers/api/workoutController'); 

const router = express.Router();

router.get('/:id', workoutController.getWorkoutById);
router.get('/user/:userId', workoutController.getAllWorkoutsForUser);
router.delete('/:id', workoutController.deleteWorkout);
router.patch('/:id', workoutController.updateWorkout);
router.post('/plan/:userId', workoutController.createWorkoutPlanForUser);

module.exports = router;