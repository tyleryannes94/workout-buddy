import React, { useState, useEffect } from 'react';

const DashboardGoalProgress = () => {
  const [workoutsCompleted, setWorkoutsCompleted] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(0); // Updated to be fetched

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchGoal = async () => {
      try {
        // Adjust the endpoint as necessary to fetch the specific workout goal
        const response = await fetch(`/api/goals/user/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch goal');
        const goals = await response.json();

        // Assuming the server returns an array of goals, find the first workout goal
        const workoutGoal = goals.find(goal => goal.goalType === 'workouts');
        if (workoutGoal) {
          setWeeklyGoal(workoutGoal.targetValue);
        }
      } catch (error) {
        console.error('Error fetching goal:', error);
      }
    };

    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`/api/workouts/user/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch workouts');
        const data = await response.json();
        const workoutsInLastWeek = data.filter(workout => {
          const workoutDate = new Date(workout.date);
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          return workoutDate >= oneWeekAgo;
        });
        setWorkoutsCompleted(workoutsInLastWeek.length);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchGoal();
    fetchWorkouts();
  }, []);

  const progressPercentage = Math.min((workoutsCompleted / weeklyGoal) * 100, 100);

  return (
    <div>
      <h2>Weekly Workout Goal Progress</h2>
      <div style={{ width: '100%', backgroundColor: '#e0e0de', borderRadius: '5px' }}>
        <div
          style={{
            height: '24px',
            width: `${progressPercentage}%`,
            backgroundColor: progressPercentage === 100 ? '#4caf50' : '#2196f3',
            borderRadius: '5px',
            textAlign: 'center',
            color: 'white',
            lineHeight: '24px',
          }}
        >
          {`${workoutsCompleted}/${weeklyGoal}`}
        </div>
      </div>
    </div>
  );
};

export default DashboardGoalProgress;
