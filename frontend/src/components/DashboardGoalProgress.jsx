import React, { useState, useEffect } from 'react';

const DashboardGoalProgress = () => {
  const [workoutsCompleted, setWorkoutsCompleted] = useState(0);
  const weeklyGoal = 5;

  useEffect(() => {
    const userId = localStorage.getItem('userId');
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
