const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // or another number you prefer

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    health_goals: {
        type: [String], // Array of strings
        trim: true,
    },
    workout_preferences: {
        type: [String], // Array of strings
        trim: true,
    },
    diet_type: {
        type: [String], // Array of strings
        trim: true
    },
    workouts: [{
        type: Schema.Types.ObjectId,
        ref: 'Workout'
    }],
    workoutPlans: [{
        type: Schema.Types.ObjectId,
        ref: 'WorkoutPlan'
    }],
    bodyTrackings: [{
        type: Schema.Types.ObjectId,
        ref: 'BodyTracking'
    }],
    mealPlans: [{
        type: Schema.Types.ObjectId,
        ref: 'MealPlan'
    }],
},
{
    toJSON: {
      virtuals: true
    },
    id: false
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.checkPassword = function(candidatePassword) {
    return candidatePassword === this.password; 
};

const User = mongoose.model('User', userSchema);

module.exports = User;

