import React from 'react';

function MealBlock({ meal }) {
  console.log('MealBlock props:', meal);
  return (
    <div>
      <h3>Meal</h3>
      <p>Description: {meal.description}</p>
      <p>Calories: {meal.calories}</p>
    </div>
  );
}

export default MealBlock;
