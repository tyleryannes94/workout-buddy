import React from 'react';
import WorkoutBlock from './WorkoutBlock';
import MealBlock from './MealBlock';
import { useState } from 'react';
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; for when we add in other urls

function Dashboard() {
    const [workouts, setWorkouts] = useState([]);
    const [meals, setMeals] = useState([]);
  
    useEffect(() => {
      const userId = localStorage.getItem('userId'); 
      
      async function fetchData() {
        const workoutsResponse = await fetch(`/api/workouts/user/${userId}`);
        const workoutsData = await workoutsResponse.json();
        setWorkouts(workoutsData);
  
        const mealsResponse = await fetch(`/api/meals/plan/${userId}`);
        const mealsData = await mealsResponse.json();
        setMeals(mealsData);
      }
  
      fetchData();
    }, []);
  
    return (
      <div>
        <h2>My Workouts</h2>
        {workouts.map(workout => <WorkoutBlock key={workout._id} workout={workout} />)}
        
        <h2>My Meals</h2>
        {meals.map(meal => <MealBlock key={meal._id} meal={meal} />)}
      </div>
    );
  }

export default Dashboard;