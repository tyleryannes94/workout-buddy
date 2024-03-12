import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import WorkoutBlock from './WorkoutBlock';
import MealBlock from './MealBlock';
import DashboardGoalProgress from './DashboardGoalProgress';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

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

            {/* contains all component cards */}
            <div className='card-grid'>
                <Link to='/workouts'>
                   <Cards title="Workout Plans"></Cards> 
                </Link>
              
                <Link to='/meals'>
                   <Cards title="Meal Plans"></Cards> 
                </Link>

                <Link to=''>
                   <Cards title="Log A Meal"></Cards> 
                </Link>

                <Link to=''>
                   <Cards title="Log A Workout"></Cards> 
                </Link>
            </div>

            
        </div>
    );
}

export default Dashboard;
