const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; 

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
        type: [String], 
        trim: true,
    },
    workout_preferences: {
        type: [String], 
        trim: true,
    },
    diet_type: {
        type: [String], 
        trim: true
    },
    goals: [{
        type: Schema.Types.ObjectId,
        ref: 'Goal'
    }],
    workouts: [{
        type: Schema.Types.ObjectId,
        ref: 'Workout'
    }],
    workoutPlans: [{
        type: Schema.Types.ObjectId,
        ref: 'WorkoutPlan'
    }],
    meals: [{
        type: Schema.Types.ObjectId,
        ref: 'Meal'
    }],
    meals_logged: {
        type: Number,
        default: 0
    },
    workouts_completed: {
        type: Number,
        default: 0
    },
    calories_consumed: {
        type: Number,
        default: 0
    },
    calories_burned: {
        type: Number,
        default: 0
    }
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
