const express = require('express');
const router = express.Router();
const mealPlanController = require('../controllers/api/mealPlanController');

router.get('/user/:userId', mealPlanController.getAllMealPlansForUser);
router.get('/:userId/:id', mealPlanController.getMealPlanById);
router.post('/:userId', mealPlanController.createMealPlanForUser);
router.delete('/:id', mealPlanController.deleteMealPlanForUser);

module.exports = router;
