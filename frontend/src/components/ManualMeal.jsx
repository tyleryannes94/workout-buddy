import React, { useState } from 'react';

function ManualMeal() {
  const [mealData, setMealData] = useState({
    date_logged: '',
    mealType: '',
    calories: '',
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealData({ ...mealData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    try {
        const response = await fetch(`/api/meals/meal/${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mealData), 
        });
        if (!response.ok) throw new Error('Failed to log a new meal');
        
        alert("Meal logged successfully"); 
        setShowForm(false);
        setMealData({ date_logged: '', mealType: '', calories: '' });
      } catch (error) {
        console.error('Error logging new meal:', error);
      }
  };

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <label>
            Date:
            <input
              type="date" 
              name="date_logged"
              value={mealData.date_logged}
              onChange={handleChange}
            />
          </label>
          <label>
            Meal Type:
            <select 
              name="mealType"
              value={mealData.mealType}
              onChange={handleChange}>
              <option value="">Select Meal Type</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </label>
          <label>
            Calories:
            <input
              type="number" 
              name="calories"
              value={mealData.calories}
              onChange={handleChange}
              placeholder="Total Calories"
            />
          </label>
          <button type="submit">Submit Meal</button>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}>Add Meal</button> 
      )}
    </div>
  );
}

export default ManualMeal;
