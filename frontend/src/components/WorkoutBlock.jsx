import React from 'react';
import { useState } from 'react';

function WorkoutBlock({ workout }) {
  const [scheduledDate, setScheduledDate] = useState('');
  const scheduleWorkout = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scheduled_date: scheduledDate }),
    });

    if (response.ok) {
      console.log("Workout scheduled successfully");
    } else {
      console.error("Failed to schedule workout");
    }
  };

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
    <div className="border-accent">
      <h3>{workout.workout_type}</h3>
      {workout.workout_description && workout.workout_description.trim() !== '' && (
      <p>Description: {workout.workout_description}</p>)}  
      <p>Calories Burned: {workout.calories_burned}</p>
      <p>Exercises:</p>
      {workout.workout_info && workout.workout_info.length > 0 && (
        <ul>
          {workout.workout_info.map((info, index) => (
            <li key={index}>{info}</li>
          ))}
        </ul>
      )}
      <input
        type="date"
        value={scheduledDate}
        onChange={(e) => setScheduledDate(e.target.value)}
      />
      <button onClick={scheduleWorkout}>Schedule Workout</button>
      <button onClick={logWorkout}>Log Workout</button>
    
    </div>
  );
}

export default WorkoutBlock;
