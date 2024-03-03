const express = require('express');
const router = express.Router();
const goalController = require('../controllers/api/goalController');

router.post('/:userId', goalController.createGoal);
router.get('/user/:userId', goalController.getGoalsByUser);
router.put('/goals/:id', goalController.updateGoal);
router.delete('/goals/:id', goalController.deleteGoal);

module.exports = router;
