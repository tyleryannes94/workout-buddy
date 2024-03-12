import React, { useState } from 'react';

function ManualMeal() {
  const [mealData, setMealData] = useState({
    mealType: '',
    description: '',
    calories: '',
    ingredients: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealData({ ...mealData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');; 
    try {
        const response = await fetch(`/api/meals/meal/${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mealData), 
        });
        if (!response.ok) throw new Error('Failed to log a new meal');
        console.log("Meal submitted successfully");
      } catch (error) {
        console.error('Error generating new meal plan:', error);
        // Update your state or UI based on the error
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="date_logged"
        value={mealData.date_logged}
        onChange={handleChange}
        placeholder="Date"
      />
    <input
        name="mealType"
        value={mealData.mealType}
        onChange={handleChange}
        placeholder="Meal Type"
    /> 
     <input
        name="calories"
        value={mealData.calories}
        onChange={handleChange}
        placeholder="Total Calories"
    />     
    <button type="submit">Submit Meal</button>
    </form>
  );
}

export default ManualMeal;
