const express = require('express');
const mealController = require('../controllers/api/mealController'); 
const router = express.Router();

router.get('/user/:userId', mealController.getAllMealsForUser);
router.get('/:mealId', mealController.getMealById);
router.post('/:userId', mealController.createMeal);
router.patch('/:mealId', mealController.updateMeal);
router.delete('/:mealId', mealController.deleteMeal);

module.exports = router;