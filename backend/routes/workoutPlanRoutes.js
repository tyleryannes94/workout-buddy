const express = require('express');
const workoutPlanController = require('../controllers/api/workoutPlanController');
const router = express.Router();

router.get('/:userId', workoutPlanController.getAllWorkoutPlansForUser);
router.get('/:userId/:id', workoutPlanController.getWorkoutPlanById);
router.post('/:userId', workoutPlanController.createWorkoutPlanForUser);
router.delete('/:userId/:id', workoutPlanController.deleteWorkoutPlanForUser);

module.exports = router;