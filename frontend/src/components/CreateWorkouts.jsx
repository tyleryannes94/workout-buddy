import React, { useState, useEffect } from 'react';
import WorkoutBlock from './WorkoutBlock'; 
import Navbar from './Navbar';
import ManualWorkout from './ManualWorkout';
import WorkoutCard from './WorkoutCard';

const CreateWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    if (!isGenerating) setIsLoading(true); 
      try {
      const response = await fetch(`/api/workouts/user/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch workouts');
      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const generateNewWorkoutPlan = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(`/api/workouts/plan/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to generate new workout plan');
      await fetchWorkouts(); 
    } catch (error) {
      console.error('Error generating new workout plan:', error);
      setError(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
        <Navbar/>
      <h1 className='customSerif-bold'>Workout Plans</h1>
      {/* <h3>Log your workout</h3> */}
      <div className="buttons-container">
      <button onClick={generateNewWorkoutPlan} disabled={isLoading || isGenerating}>
        {isGenerating ? 'Adding more workouts...' : 'Need some gym inspo?'}
      </button>
      <ManualWorkout/>
      </div>

      <div className="workout-card">
        <WorkoutCard workouts={workouts} isGenerating={isGenerating} error={error} isLoading={isLoading}/>
      </div>
      
    </div>
  );
};

export default CreateWorkouts;
