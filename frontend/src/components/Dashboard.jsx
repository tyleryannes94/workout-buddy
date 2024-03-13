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
            <h1 className='customSerif-bold'>Welcome, Buddy. </h1>
            <DashboardGoalProgress  />

            {/* contains all component cards */}
            <div className='card-grid'>
                <Link to='/workouts' className="hover-special">
                <Cards title="Workout Plans"></Cards> 
                </Link>
            
                <Link to='/meals' className="hover-special">
                <Cards title="Meal Plans"></Cards> 
                </Link>

                <Link to='/log-meal' className="hover-special">
                <Cards title="Log A Meal"></Cards> 
                </Link>

                <Link to='/log-workout' className="hover-special">
                <Cards title="Log A Workout"></Cards> 
                </Link>
            </div>

            
        </div>
    );
}

export default Dashboard;
