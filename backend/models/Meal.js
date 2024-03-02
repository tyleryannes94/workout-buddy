const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  date_logged: { 
    type: Date, 
    required: false },
  calories: { 
    type: Number, 
    required: true },
  description: { 
    type: String, 
    required: true },
  date_created: { 
    type: Date, 
    required: false },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' }, 
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;
