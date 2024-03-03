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
        required: false,
    },
    workout_length: {
        type: Number,
        required: false
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
    workout_description: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date_created: {
        type: Date, 
        default: null, 
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
