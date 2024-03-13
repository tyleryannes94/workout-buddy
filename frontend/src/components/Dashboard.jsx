import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import WorkoutBlock from './WorkoutBlock';
import MealBlock from './MealBlock';
import DashboardGoalProgress from './DashboardGoalProgress';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function Dashboard() {
    

    return (
        <div>
            <Navbar/>
            <h1 className='customSerif-bold'>Welcome, I'm your workout buddy! </h1>
            <DashboardGoalProgress  />

            {/* contains all component cards */}
            <div className='card-grid'>
                <Link to='/workouts' className="hover-special">
                <Cards title="Workout Plans"></Cards> 
                </Link>
            
                <Link to='/meals' className="hover-special">
                <Cards title="Meal Plans"></Cards> 
                </Link>

                <Link to='/calendar' className="hover-special">
                <Cards title="Calendar View"></Cards> 
                </Link>

                <Link to='/friends' className="hover-special">
                <Cards title="View Friends"></Cards> 
                </Link>
            </div>

            
        </div>
    );
}

export default Dashboard;
