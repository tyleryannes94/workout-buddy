const WorkoutPlan = require('../../models/WorkoutPlan'); 
const User = require('../../models/User');
const Workout = require('../../models/Workout');

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
   //will need to have this work with chatgpt prompt

};

