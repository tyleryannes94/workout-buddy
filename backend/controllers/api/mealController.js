const Meal = require('../../models/Meal'); 
const User = require('../../models/User'); 
const { generateMealPlan } = require('../../utils/chatGPTMealPlan');


exports.getAllMealsForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('meals');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.meals);
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

function parseGeneratedPlanToMeals(generatedPlanRaw) {
    const meals = [];
    const days = generatedPlanRaw.split('Day ').slice(1); 
    days.forEach(day => {
        const mealEntries = day.split('\n').slice(1); 
        mealEntries.forEach(entry => {
            const parts = entry.match(/(Breakfast|Lunch|Dinner): (.+) \((\d+) calories\)/);
            if (parts) {
                const [, mealType, description, calories] = parts;
                meals.push({
                    mealType,
                    description,
                    calories: parseInt(calories, 10),
                    date_created: new Date(), 
                    userId: userId,
                });
            }
        });
    });

    return meals;
}

exports.createMeal = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const generatedPlanRaw = await generateMealPlan(userId);
        const mealDescriptions = parseGeneratedPlanToMeals(generatedPlanRaw);

        let createdMeals = [];
        for (const mealData of mealDescriptions) {
            const meal = new Meal({ ...mealData, userId: user._id });
            await meal.save();
            createdMeals.push(meal);
        }

        user.meals.push(...createdMeals.map(meal => meal._id));
        await user.save();

        res.status(201).json(user.meals);
    } catch (error) {
        console.error('Error creating meal:', error);
        res.status(500).json({ message: 'Internal server error' });
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