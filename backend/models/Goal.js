const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    goalType: {
        type: String,
        enum: ['workouts', 'diet'],
        required: true,
    },
    targetValue: {
        type: Number,
        required: false,
    },
    startDate: {
        type: Date,
        required: false,
    },
    endDate: {
        type: Date,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
