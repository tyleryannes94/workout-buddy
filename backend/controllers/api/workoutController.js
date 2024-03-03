const Workout = require('../../models/Workout'); 
const User = require('../../models/User');
const { generateWorkoutPlan } = require('../../utils/chatGPTWorkouts');


exports.getWorkoutById = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.json(workout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllWorkoutsForUser = async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.params.userId });
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        await workout.remove();
        res.json({ message: 'Workout deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateWorkout = async (req, res) => {
    try {
        const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.json(workout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function createIndividualWorkouts(userId, generatedPlan) {
    const workoutDocs = [];
    const days = generatedPlan.split(/Day \d+:/).filter(Boolean);
  
    for (const day of days) {
      const lines = day.trim().split('\n');
      const workoutTypeDescription = lines[0];
      const caloriesBurnedText = lines[lines.length - 1];
  
      const workoutTypeMatch = workoutTypeDescription.match(/^(.+?) - (.+)$/);
      if (!workoutTypeMatch) continue;
  
      const workoutType = workoutTypeMatch[1].trim();
      const workoutDescription = workoutTypeMatch[2].trim();
  
      const caloriesBurnedMatch = caloriesBurnedText.match(/Estimated calories burned: (\d+)/);
      if (!caloriesBurnedMatch) continue;
  
      const caloriesBurned = parseInt(caloriesBurnedMatch[1], 10);
      const workoutInfo = lines.slice(1, -1);
  
      const workoutDoc = new Workout({
        workout_type: workoutType,
        date_created: new Date(),
        workout_length: workoutInfo.length,
        workout_info: workoutInfo,
        calories_burned: caloriesBurned,
        user: userId,
        workout_description: workoutDescription,
      });
  
      const savedWorkout = await workoutDoc.save();
      workoutDocs.push(savedWorkout._id);
    }
    return workoutDocs;
}

async function createIndividualWorkouts(userId, generatedPlan) {
    const workoutDocs = [];
    const days = generatedPlan.split(/Day \d+:/).filter(Boolean);
  
    for (const day of days) {
      const lines = day.trim().split('\n');
      const workoutTypeDescription = lines[0];
      const caloriesBurnedText = lines[lines.length - 1];
  
      const workoutTypeMatch = workoutTypeDescription.match(/^(.+?) - (.+)$/);
      if (!workoutTypeMatch) continue;
  
      const workoutType = workoutTypeMatch[1].trim();
      const workoutDescription = workoutTypeMatch[2].trim();
  
      const caloriesBurnedMatch = caloriesBurnedText.match(/Estimated calories burned: (\d+)/);
      if (!caloriesBurnedMatch) continue;
  
      const caloriesBurned = parseInt(caloriesBurnedMatch[1], 10);
      const workoutInfo = lines.slice(1, -1);
  
      const workoutDoc = new Workout({
        workout_type: workoutType,
        date_created: new Date(),
        workout_length: workoutInfo.length,
        workout_info: workoutInfo,
        calories_burned: caloriesBurned,
        userId: userId,
        workout_description: workoutDescription,
      });
  
      const savedWorkout = await workoutDoc.save();
      workoutDocs.push(savedWorkout._id);
    }
    return workoutDocs;
}

exports.createWorkoutPlanForUser = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found.' });
  
      const generatedPlan = await generateWorkoutPlan(userId);
      if (!generatedPlan) return res.status(400).json({ message: 'Failed to generate workout plan.' });
  
      const workoutIds = await createIndividualWorkouts(userId, generatedPlan);
      // Ensure user is updated after all workouts are created
      await Promise.all(workoutIds.map(id => user.workouts.push(id)));
      await user.save(); 

      const workouts = await Workout.find({ '_id': { $in: workoutIds } });
  
      res.status(201).json(workouts);
    } catch (error) {
      console.error('Error creating workout plan:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
};

