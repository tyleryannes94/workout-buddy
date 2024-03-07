import React, { useState, useEffect } from 'react';
import WorkoutBlock from './WorkoutBlock'; 
import Navbar from './Navbar';

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
      <h1>Workout Plans</h1>
      <button onClick={generateNewWorkoutPlan} disabled={isLoading || isGenerating}>
        {isGenerating ? 'Adding more workouts...' : 'Create more workouts'}
      </button>
      {isGenerating && <div>Generating new workouts...</div>}
      {error && <div>Error: {error}</div>}
      {isLoading && !isGenerating && <div>Loading...</div>}
      {workouts.length > 0 ? (
        workouts.map((workout) => (
          <WorkoutBlock key={workout._id} workout={workout} />
        ))
      ) : (

      // {isLoading ? (
      //   <div>Loading...</div>
      // ) : error ? (
      //   <div>Error: {error}</div>
      // ) : workouts.length > 0 ? (
      //   workouts.map((workout) => (
      //     <WorkoutBlock key={workout._id} workout={workout} />
      //   ))
        <p>No workout plans available. Try generating new ones.</p>
      )}
    </div>
  );
};

export default CreateWorkouts;