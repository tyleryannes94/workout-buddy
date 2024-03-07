import React, { useState, useEffect } from 'react';
import WorkoutBlock from './WorkoutBlock';
import MealBlock from './MealBlock';
import DashboardGoalProgress from './DashboardGoalProgress';
import Navbar from './Navbar';

function Dashboard() {
    const [workouts, setWorkouts] = useState([]);
    const [meals, setMeals] = useState([]);
    const [goals, setGoals] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const goalResponse = await fetch(`/api/goals/user/${userId}`);
                const goalData = await goalResponse.json();
                setGoals(goalData.slice(-3));

                const workoutsResponse = await fetch(`/api/workouts/user/${userId}`);
                const workoutsData = await workoutsResponse.json();
                setWorkouts(workoutsData.slice(-3));

                const mealsResponse = await fetch(`/api/meals/user/${userId}`);
                const mealsData = await mealsResponse.json();
                setMeals(mealsData.slice(-3));
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        if (userId) {
            fetchData();
        }
    }, [userId]); 

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Navbar/>
            <h2>Progress</h2>
            <DashboardGoalProgress goals={goals} />

            <h2>Workout Suggestions</h2>
            {workouts.map(workout => <WorkoutBlock key={workout._id} workout={workout} />)}

            <h2>Meals For Your Diet</h2>
            {meals.map(meal => <MealBlock key={meal._id} meal={meal} />)}
        </div>
    );
}

export default Dashboard;
