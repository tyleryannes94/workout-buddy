import React from 'react';
import { useState } from 'react';

function MealBlock({ meal }) {
  const [scheduledDate, setScheduledDate] = useState('');
  const scheduleMeal = async () => {
    const response = await fetch(`/api/meals/${meal._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scheduled_date: scheduledDate }),
    });

    if (response.ok) {
      console.log("Meal scheduled successfully");
    } else {
      console.error("Failed to schedule meal");
    }
  };

  const logMeal = async () => {
    const response = await fetch(`/api/meals/${meal._id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date_logged: new Date(), 
      }),
    });

    if (response.ok) {
      console.log("Meal logged successfully");
    } else {
      console.error("Failed to log meal");
    }
  };
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
          <input
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            placeholder="Schedule meal"
          />
          <button onClick={scheduleMeal}>Schedule Meal</button>
          <button onClick={logMeal}>Log Meal</button>
        </>
      )}
    </div>
  );
}

export default MealBlock;

