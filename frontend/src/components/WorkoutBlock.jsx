import React from 'react';

function WorkoutBlock({ workout }) {
  const logWorkout = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workout_date: new Date(), 
      }),
    });

    if (response.ok) {
      console.log("Workout logged successfully");
    } else {
      console.error("Failed to log workout");
    }
  };
  return (
    <div>
      <h3>{workout.workout_type}</h3>
      <p>Description: {workout.workout_description}</p>
      <p>Calories Burned: {workout.calories_burned}</p>
      <p>Exercises:</p>
        {workout.workout_info.map((workout_info, index) => (
          <li key={index}>{workout_info}</li>
        ))}
      <button onClick={logWorkout}>Log Workout</button>

    </div>
  );
}

export default WorkoutBlock;
