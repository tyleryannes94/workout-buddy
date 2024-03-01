const MealPlan = require('../../models/MealPlan');
const Meal = require('../../models/Meal');
const User = require('../../models/User');

exports.getAllMealPlansForUser = async (req, res) => {
    try {
        const mealPlans = await MealPlan.find({ userId: req.params.userId }).populate('meals');
        res.json(mealPlans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMealPlanById = async (req, res) => {
    try {
        const { userId, id } = req.params;
        const mealPlan = await MealPlan.findOne({ _id: id, userId: userId }).populate('meals');
        if (!mealPlan) {
            return res.status(404).json({ message: 'Meal plan not found' });
        }
        res.json(mealPlan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createMealPlanForUser = async (req, res) => {

};

exports.deleteMealPlanForUser = async (req, res) => {
    try {
        const { id } = req.params;
        const mealPlan = await MealPlan.findById(id);
        if (!mealPlan) {
            return res.status(404).json({ message: 'Meal plan not found' });
        }
        await mealPlan.remove();
        res.json({ message: 'Meal plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateMeal = async (req, res) => {
  const { mealId } = req.params;
  const updateData = req.body; 
  try {

      const mealPlan = await MealPlan.findOne({ "meals._id": mealId });

      if (!mealPlan) {
          return res.status(404).json({ message: 'Meal plan containing the specified meal not found.' });
      }

      const meal = mealPlan.meals.id(mealId); 
      if (!meal) {
          return res.status(404).json({ message: 'Meal not found.' });
      }

      Object.keys(updateData).forEach((key) => {
          meal[key] = updateData[key]; 
      });

      await mealPlan.save(); 

      res.json({ message: 'Meal updated successfully', meal: meal });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
