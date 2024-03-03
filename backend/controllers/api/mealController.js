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

async function createIndividualMeals(userId, generatedPlan) {
    console.log("Starting to create individual meals for userId:", userId);
    const mealDocs = [];

    // Use a more specific pattern to match the updated meal plan format.
    const mealEntries = generatedPlan.match(/(Breakfast|Lunch|Dinner) - (.+) - Calories: (\d+)/g);

    if (!mealEntries) {
        console.log("No meals found in the generated plan.");
        return [];
    }

    for (const entry of mealEntries) {
        // Directly extract meal type, description, and calories using the updated pattern.
        const [, mealType, description, calories] = entry.match(/(Breakfast|Lunch|Dinner) - (.+) - Calories: (\d+)/);

        try {
            const mealDoc = new Meal({
                description: description.trim(),
                calories: parseInt(calories, 10),
                date_created: new Date(),
                userId: userId,
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

        const meals = await Meal.find({ '_id': { $in: mealIds } });
        console.log(`Fetched ${meals.length} meals from the database.`);

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