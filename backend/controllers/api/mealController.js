const Meal = require('../../models/Meal'); 
const User = require('../../models/User'); 
const { generateMealPlan } = require('../../utils/chatGPTMealPlan');


exports.getAllMealsForUser = async (req, res) => {
    try {
        const meals = await Meal.find({ userId: req.params.userId });
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

async function createIndividualMeals(userId, generatedPlan) {
    console.log("Starting to create individual meals for userId:", userId);
    const mealDocs = [];
    const mealEntries = generatedPlan.match(/(Breakfast|Lunch|Dinner) - (.+) - Calories: (\d+) - (.+)/g);

    if (!mealEntries) {
        console.log("No meals found in the generated plan.");
        return [];
    }

    for (const entry of mealEntries) {
        const [, mealType, description, calories, ingredients] = entry.match(/(Breakfast|Lunch|Dinner) - (.+) - Calories: (\d+) - (.+)/);

        try {
            const mealDoc = new Meal({
                mealType,
                description: description.trim(),
                calories: parseInt(calories, 10),
                date_created: new Date(),
                userId,
                ingredients: ingredients.replace(/^Ingredients:\s*/, '').split(', ').map(ingredient => ingredient.trim()),
            });

            const savedMeal = await mealDoc.save();
            console.log(`Saved meal ID: ${savedMeal._id}`);
            mealDocs.push(savedMeal._id);
        } catch (error) {
            console.log("Error saving meal:", error);
        }
    }

    console.log("Completed creating individual meals. Total meals created:", mealDocs.length);
    return mealDocs;
}

exports.createMealPlanForUser = async (req, res) => {
    const { userId } = req.params;
    console.log("Attempting to create a meal plan for userId:", userId);

    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log("User not found.");
            return res.status(404).json({ message: 'User not found.' });
        }

        console.log("Generating meal plan...");
        const generatedPlan = await generateMealPlan(userId);
        if (!generatedPlan) {
            console.log("Failed to generate meal plan.");
            return res.status(400).json({ message: 'Failed to generate meal plan.' });
        }

        console.log("Creating individual meals...");
        const mealIds = await createIndividualMeals(userId, generatedPlan);
        console.log(`Created meals with IDs: ${mealIds.join(", ")}`);

        const meals = await Meal.find({ userId: req.params.userId });
        console.log(`Fetched ${meals.length} meals from the database.`);
        user.meals.push(...mealIds);
        await user.save();

        res.status(201).json(meals);
    } catch (error) {
        console.error('Error creating meal plan:', error);
        res.status(500).json({ message: 'Internal server error.' });
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

exports.createManualMealForUser = async (req, res) => {
    const { userId } = req.params;
    const { date_logged, mealType, calories } = req.body;

    if (!userId) {
        return res.status(404).json({ message: 'User ID is required.' });
    }

    try {
        const newMeal = new Meal({
            userId,
            date_logged: new Date(date_logged),
            mealType,
            calories: parseInt(calories, 10),
        });

        const savedMeal = await newMeal.save();
        res.status(201).json(savedMeal);
    } catch (error) {
        console.error('Error creating manual meal:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
