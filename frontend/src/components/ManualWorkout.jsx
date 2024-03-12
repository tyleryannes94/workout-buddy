import React, { useState } from 'react';

function ManualWorkout() {
  const [workoutData, setWorkoutData] = useState({
    workout_type: '',
    workout_description: '',
    calories_burned: '',
    workout_info: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData({ ...workoutData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');; 
    try {
      const response = await fetch(`/api/workouts/workout/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutData),
      });
      if (!response.ok) throw new Error('Failed to log a manual workout');
      console.log("Workout successfully logged");
    } catch (error) {
      console.error('Error logging a workout:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="date_created"
        value={workoutData.date_created}
        onChange={handleChange}
        placeholder="Date"
      />
       <input
        name="workout_type"
        value={workoutData.workout_type}
        onChange={handleChange}
        placeholder="Workout Type"
      />
       <input
        name="workout_info"
        value={workoutData.info}
        onChange={handleChange}
        placeholder="Exercise(s)"
      />
       <input
        name="calories_burned"
        value={workoutData.calories_burned}
        onChange={handleChange}
        placeholder="Calories Burned"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ManualWorkout;
