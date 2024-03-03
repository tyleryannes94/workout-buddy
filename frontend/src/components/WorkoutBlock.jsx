import React from 'react';

function WorkoutBlock({ workout }) {
  const parseExercises = (workoutInfo) => {
    if (typeof workoutInfo !== 'string') {
      return [];
    }
    return workoutInfo.split('- ').filter(Boolean);
  };

  const exercises = parseExercises(workout.workout_info);

  return (
    <div>
      <h3>{workout.workout_type}</h3>
      <p>Description: {workout.workout_description}</p>
      <p>Calories Burned: {workout.calories_burned}</p>
      <p>Exercises:</p>
      <ol>
        {exercises.map((exercise, index) => (
          <li key={index}>{exercise}</li>
        ))}
      </ol>
    </div>
  );
}

export default WorkoutBlock;
