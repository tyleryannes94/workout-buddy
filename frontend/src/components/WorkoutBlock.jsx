import React from 'react';

function WorkoutBlock({ workout }) {
  console.log('WorkoutBlock props:', workout);

  return (
    <div>
      <h3>{workout.workout_type}</h3>
      <p>Description: {workout.workout_description}</p>
      <p>Calories Burned: {workout.calories_burned}</p>
      <p>Exercises:</p>
        {workout.workout_info.map((workout_info, index) => (
          <li key={index}>{workout_info}</li>
        ))}
    </div>
  );
}

export default WorkoutBlock;
