import React from 'react';
import WorkoutBlock from './WorkoutBlock';
import MealBlock from './MealBlock';
import { useState } from 'react';
import { useEffect } from 'react';
import DashboardGoalProgress from './DashboardGoalProgress';
// import { useNavigate } from 'react-router-dom'; for when we add in other urls

function Dashboard() {
    const [workouts, setWorkouts] = useState([]);
    const [meals, setMeals] = useState([]);
  
    useEffect(() => {
      const userId = localStorage.getItem('userId'); 
      
      async function fetchData() {
        const workoutsResponse = await fetch(`/api/workouts/user/${userId}`);
        const workoutsData = await workoutsResponse.json();
        setWorkouts(workoutsData.slice(-3)); 

        const mealsResponse = await fetch(`/api/meals/user/${userId}`);
        const mealsData = await mealsResponse.json();
        setMeals(mealsData.slice(-3));      }
  
      fetchData();
    }, []);
  
    return (
      <div>
         <h2>Progress</h2>
        {workouts.map(workout => <DashboardGoalProgress key={workout._id} workout={workout} />)}
        
        <h2>Workout Suggestions</h2>
        {workouts.map(workout => <WorkoutBlock key={workout._id} workout={workout} />)}
        
        <h2>Meals For Your Diet</h2>
        {meals.map(meal => <MealBlock key={meal._id} meal={meal} />)}
      </div>
    );
  }

export default Dashboard;