const express = require('express');
const mealController = require('../controllers/api/mealController'); 
const router = express.Router();

router.get('/user/:userId', mealController.getAllMealsForUser);
router.get('/:mealId', mealController.getMealById);
router.post('/plan/:userId', mealController.createMealPlanForUser);
router.patch('/:mealId', mealController.updateMeal);
router.delete('/:mealId', mealController.deleteMeal);
router.post('/meal/:userId', mealController.createManualMealForUser);

module.exports = router;