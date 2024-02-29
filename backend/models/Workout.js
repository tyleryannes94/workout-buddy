const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    workout_type: {
        type: String,
        required: true,
        trim: true
    },
    workout_date: {
        type: Date,
        required: true,
    },
    workout_length: {
        type: Number,
        required: true
    },
    workout_info: {
        type: [String], 
        trim: true,
    },
    calories_burned: {
        type: Number, 
        trim: true
    },
    step_count: {
        type: Number,
        trim: true
    },
    workout_rating: {
        type: String, 
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date_completed: {
        type: Date, // New field to record when the workout was completed
        default: null, // Default to null indicating not completed
    },
},
{
    toJSON: {
      virtuals: true
    },
    id: false
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
