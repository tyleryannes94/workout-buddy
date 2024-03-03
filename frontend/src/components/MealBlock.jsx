import React from 'react';

function MealBlock({ meal }) {
  console.log('MealBlock props:', meal);
  return (
    <div>
      <h3>{meal.mealType}</h3>
      <p>Description: {meal.description}</p>
      <p>Calories: {meal.calories}</p>
      {meal.ingredients && (
        <>
          <p>Ingredients:</p>
          <ul>
            {meal.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default MealBlock;

