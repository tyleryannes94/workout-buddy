import React, { useState } from 'react';

function ManualWorkout() {
  const [workoutData, setWorkoutData] = useState({
    workout_date: '',
    workout_type: '',
    calories_burned: '',
    workout_info: [''],
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "workout_info") {
      const updatedInfo = [...workoutData.workout_info];
      updatedInfo[index] = value;
      setWorkoutData({ ...workoutData, workout_info: updatedInfo });
    } else {
      setWorkoutData({ ...workoutData, [name]: value });
    }
  };

  const addWorkoutInfo = () => {
    setWorkoutData({ ...workoutData, workout_info: [...workoutData.workout_info, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`/api/workouts/workout/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutData),
      });
      if (!response.ok) throw new Error('Failed to log a manual workout');
      alert("Workout successfully logged");
      setShowForm(false); 
    } catch (error) {
      console.error('Error logging a workout:', error);
    }
  };

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            name="workout_date"
            value={workoutData.workout_date}
            onChange={handleChange}
            placeholder="Workout Date"
          />
          <select
            name="workout_type"
            value={workoutData.workout_type}
            onChange={handleChange}
          >
            <option value="">Select Workout Type</option>
            <option value="Weightlifting">Weightlifting</option>
            <option value="Yoga">Yoga</option>
            <option value="Running">Running</option>
            <option value="Spin">Spin</option>
            <option value="Boxing">Boxing</option>
            <option value="Sauna">Sauna</option>
            <option value="Swimming">Swimming</option>
            <option value="HIIT">HIIT</option>
          </select>
          {workoutData.workout_info.map((info, index) => (
            <input
              key={index}
              type="text"
              name="workout_info"
              value={info}
              onChange={(e) => handleChange(e, index)}
              placeholder="Exercise(s)"
            />
          ))}
          <button type="button" onClick={addWorkoutInfo}>+</button>
          <input
            type="number"
            name="calories_burned"
            value={workoutData.calories_burned}
            onChange={handleChange}
            placeholder="Calories Burned"
          />
          <button type="submit">Submit Workout</button>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}>Add Workout</button>
      )}
    </div>
  );
}

export default ManualWorkout;
