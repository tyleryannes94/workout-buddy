import React from 'react';
import WorkoutBlock from './WorkoutBlock'; 


const WorkoutCard = ({ workouts, isGenerating, error, isLoading }) => {
  return (
    <div className="workout-card">
      {isGenerating && <div>Generating new workouts...</div>}
      {error && <div>Error: {error}</div>}
      {isLoading && !isGenerating && <div>Loading...</div>}
      {workouts.length > 0 ? (
        workouts.map((workout) => (
          <WorkoutBlock key={workout._id} workout={workout} />
        ))
      ) : (
        <p>No workout plans available. Try generating new ones.</p>
      )}
    </div>
  );
};

export default WorkoutCard;