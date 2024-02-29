const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutPlanSchema = new Schema({
    workout_type: {
        type: String,
        trim: true
    },
    workout_info: {
        type: [String], 
    },
    workout_description: {
        type: String,
    },
   userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
},
    workouts: [{
        type: Schema.Types.ObjectId,
        ref: 'Workout'
    }],
    }, {
    toJSON: {
        virtuals: true
    },
    id: false
    });

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

module.exports = WorkoutPlan;