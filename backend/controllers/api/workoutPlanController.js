const WorkoutPlan = require('../../models/WorkoutPlan'); 
const User = require('../../models/User');
const Workout = require('../../models/Workout');
const { generateWorkoutPlan } = require('../../utils/chatGPTWorkoutPlan');


exports.getAllWorkoutPlansForUser = async (req, res) => {
    try {
      const workoutPlans = await WorkoutPlan.find({ userId: req.params.userId });
      res.json(workoutPlans);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getWorkoutPlanById = async (req, res) => {
    try {
      const { userId, id } = req.params;
      const workoutPlan = await WorkoutPlan.findOne({ _id: id, userId: userId });
      if (!workoutPlan) {
        return res.status(404).json({ message: 'Workout plan not found' });
      }
      res.json(workoutPlan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.deleteWorkoutPlanForUser = async (req, res) => {
    try {
      const { id } = req.params;
      const workoutPlan = await WorkoutPlan.findById(id);
      if (!workoutPlan) {
        return res.status(404).json({ message: 'Workout plan not found' });
      }
      await workoutPlan.remove();
      res.json({ message: 'Workout plan deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  exports.createWorkoutPlanForUser = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found.');
  
      const generatedPlan = await generateWorkoutPlan(userId);
      if (!generatedPlan) throw new Error('Failed to generate workout plan.');
  
      const newWorkoutPlan = new WorkoutPlan({
        user: userId,
        workout_type: "Custom",
        workout_info: [], 
        workout_description: "Generated workout plan",
      });
  
      const savedWorkoutPlan = await newWorkoutPlan.save();
      
      res.status(201).json(savedWorkoutPlan);
    } catch (error) {
      console.error('Error creating workout plan:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };