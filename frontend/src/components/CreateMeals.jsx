import React, { useState, useEffect } from 'react';
import MealBlock from './MealBlock';
import Navbar from './Navbar';
import ManualMeal from './ManualMeal';
import MealCard from './MealCard';

const MealPlans = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchMealPlans();
  }, []);

  const fetchMealPlans = async () => {
    if (!isGenerating) setIsLoading(true); 
    try {
      const response = await fetch(`/api/meals/user/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch meal plans');
      const data = await response.json();
      setMealPlans(data);
    } catch (error) {
      console.error('Error fetching meal plans:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const generateNewMealPlan = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(`/api/meals/plan/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to generate new meal plan');
      await fetchMealPlans(); 
    } catch (error) {
      console.error('Error generating new meal plan:', error);
      setError(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <Navbar/>
      <h1>Meal Plans</h1>
      <ManualMeal/>
      <button onClick={generateNewMealPlan} disabled={isLoading || isGenerating}>
        {isGenerating ? 'Adding more meals...' : 'Create more meals'}
      </button>
      <div className="workout-cards">
        <MealCard mealPlans={mealPlans} isGenerating={isGenerating} error={error} isLoading={isLoading}/>
      </div>
    </div>
  );
};

export default MealPlans;


// {isGenerating && <div>Generating new meals...</div>}
//       {error && <div>Error: {error}</div>}
//       {isLoading && !isGenerating && <div>Loading...</div>}
//       {mealPlans.length > 0 ? (
//         mealPlans.map((meal) => (
//           <MealBlock key={meal._id} meal={meal} />
//         ))
//       ) : (
//         <p>No meal plans available. Try generating new ones.</p>
//       )}