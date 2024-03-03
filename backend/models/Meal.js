const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  date_logged: { 
    type: Date, 
    required: false },
  mealType: { 
    type: String, 
    required: false },
  ingredients: { 
    type: [String], 
    required: false },
  calories: { 
    type: Number, 
    required: false },
  description: { 
    type: String, 
    required: false },
  date_created: { 
    type: Date, 
    required: false },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' }, 
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;
