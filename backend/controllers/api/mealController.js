const Meal = require('../../models/Meal'); 
const User = require('../../models/User'); 

exports.getAllMealsForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const meals = await Meal.find({ user: userId });
        res.json(meals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMealById = async (req, res) => {
    try {
        const { mealId } = req.params;
        const meal = await Meal.findById(mealId);
        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        res.json(meal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createMeal = async (req, res) => {
    try {
        const { userId } = req.body;
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newMeal = new Meal({
            ...req.body,
            user: userId,
        });
        const savedMeal = await newMeal.save();
        res.status(201).json(savedMeal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateMeal = async (req, res) => {
    try {
        const { mealId } = req.params;
        const meal = await Meal.findByIdAndUpdate(mealId, req.body, { new: true });
        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        res.json(meal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteMeal = async (req, res) => {
    try {
        const { mealId } = req.params;
        const meal = await Meal.findByIdAndDelete(mealId);
        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        res.json({ message: 'Meal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
