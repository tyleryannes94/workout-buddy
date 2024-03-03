const Goal = require('../../models/Goal');
const User = require('../../models/User');

exports.createGoal = async (req, res) => {
    try {
        const goal = new Goal(req.body);
        await goal.save();
        res.status(201).json(goal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getGoalsByUser = async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.params.userId });
        res.status(200).json(goals);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }
        res.status(200).json(goal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findByIdAndDelete(req.params.id);
        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }
        res.status(204).send(); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
