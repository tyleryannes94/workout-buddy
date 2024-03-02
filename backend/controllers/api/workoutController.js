const Workout = require('../../models/Workout'); 
const User = require('../../models/User');

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
        const workouts = await Workout.find({ user: req.params.userId });
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

exports.createWorkoutPlanForUser = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found.' });
  
      const generatedPlan = await generateWorkoutPlan(userId);
      if (!generatedPlan) return res.status(400).json({ message: 'Failed to generate workout plan.' });
  
      const workoutIds = await createIndividualWorkouts(userId, generatedPlan);
      const workouts = await Workout.find({ '_id': { $in: workoutIds } });
  
      res.status(201).json(workouts);
    } catch (error) {
      console.error('Error creating workout plan:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
};