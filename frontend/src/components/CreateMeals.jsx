import React, { useState, useEffect } from 'react';
import MealBlock from './MealBlock';

const MealPlans = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchMealPlans();
  }, []);

  const fetchMealPlans = async () => {
    setIsLoading(true);
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

  return (
    <div>
      <h1>Meal Plans</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : mealPlans.length > 0 ? (
        mealPlans.map((meal) => (
          <MealBlock key={meal._id} meal={meal} />
        ))
      ) : (
        <p>No meal plans available.</p>
      )}
    </div>
  );
};

export default MealPlans;
