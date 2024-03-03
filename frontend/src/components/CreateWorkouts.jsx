import React, { useState, useEffect } from 'react';
import WorkoutBlock from './WorkoutBlock'; 

const CreateWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    setIsLoading(true);
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

  return (
    <div>
      <h1>Workout Plans</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : workouts.length > 0 ? (
        workouts.map((workout) => (
          <WorkoutBlock key={workout._id} workout={workout} />
        ))
      ) : (
        <p>No workout plans available.</p>
      )}
    </div>
  );
};

export default CreateWorkouts;
