import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Analytics = () => {
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalMeals, setTotalMeals] = useState(0);
  const [totalCaloriesEaten, setTotalCaloriesEaten] = useState(0);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // For testing purposes, setting fake data

    // MAKE SURE THAT WE CHANGE THIS TO ACTUALLY PULL THE INFO FROM THE USER

    const fakeData = {
      totalWorkouts: Math.floor(Math.random() * 100), // Generate a random number between 0 and 100
      totalMeals: Math.floor(Math.random() * 10), // Generate a random number between 0 and 10
      totalCaloriesEaten: Math.floor(Math.random() * 3000), // Generate a random number between 0 and 3000
      totalCaloriesBurned: Math.floor(Math.random() * 1000), // Generate a random number between 0 and 1000
    };
    setTotalWorkouts(fakeData.totalWorkouts);
    setTotalMeals(fakeData.totalMeals);
    setTotalCaloriesEaten(fakeData.totalCaloriesEaten);
    setTotalCaloriesBurned(fakeData.totalCaloriesBurned);
    setIsLoading(false);
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Analytics Page</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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

export default Analytics;
