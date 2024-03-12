import React from 'react';
import analytics from './analytics'; 


const AnalyticsCard = ({ totalWorkouts, totalMeals, totalCaloriesEaten, totalCaloriesBurned, isLoading, error }) => {
  return (
    <div className="analytics-card">
        {isLoading ? 
        (<div>Loading...</div>) : (
            <div>
            <p>Total Workouts Logged: {totalWorkouts}</p>
            <p>Total Meals Logged: {totalMeals}</p>
            <p>Total Calories Eaten: {totalCaloriesEaten}</p>
            <p>Total Calories Burned: {totalCaloriesBurned}</p>
            </div>
        )}
    </div>
  );
};

export default AnalyticsCard;