const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  date_logged: { 
    type: Date, 
    required: true },
  calories: { 
    type: Number, 
    required: true },
  description: { 
    type: String, 
    required: true },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' }, // Reference to the user
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;
