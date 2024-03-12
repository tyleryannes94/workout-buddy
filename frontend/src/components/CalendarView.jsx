import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from './Navbar';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const userId = localStorage.getItem('userId');
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedEvent, setSelectedEvent] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      const mealsURL = `/api/meals/user/${userId}`;
      const workoutsURL = `/api/workouts/user/${userId}`;

      try {
        const [mealsResponse, workoutsResponse] = await Promise.all([
          fetch(mealsURL),
          fetch(workoutsURL),
        ]);

        const [mealsData, workoutsData] = await Promise.all([
          mealsResponse.json(),
          workoutsResponse.json(),
        ]);

        const mealEvents = mealsData.map((meal) => ({
          title: `${meal.mealType} - ${meal.calories} cal`,
          start: new Date(meal.scheduled_date || meal.date_logged),
          end: new Date(meal.scheduled_date || meal.date_logged),
          allDay: true,
          resource: meal,
          color: meal.scheduled_date ? 'blue' : 'green', 
        }));

        const workoutEvents = workoutsData.map((workout) => ({
          title: `${workout.workout_type} - ${workout.calories_burned} cal burned`,
          start: new Date(workout.scheduled_date || workout.workout_date),
          end: new Date(workout.scheduled_date || workout.workout_date),
          allDay: true,
          resource: workout,
          color: workout.scheduled_date ? 'red' : 'orange', 
        }));

        setEvents([...mealEvents, ...workoutEvents]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = event.color || 'blue';
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style: style,
    };
  };
  
  const ModalComponent = () => (
    <div className="modal" style={{ position: 'fixed', top: '20%', left: '30%', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
      <div className="modal-content">
        <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
        {selectedEvent && selectedEvent.mealType ? (
          <div>
            <h3>{selectedEvent.mealType}</h3>
            <p>Description: {selectedEvent.description}</p>
            <p>Calories: {selectedEvent.calories}</p>
            {selectedEvent.ingredients && (
              <>
                <p>Ingredients:</p>
                <ul>
                  {selectedEvent.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ) : (
          <div>
            <h3>{selectedEvent.workout_type}</h3>
            <p>Description: {selectedEvent.workout_description}</p>
            <p>Calories Burned: {selectedEvent.calories_burned}</p>
            <p>Exercises:</p>
            {selectedEvent.workout_info.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
  return (
    <>
      <Navbar/>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        style={{ height: '100vh' }}
        onSelectEvent={event => {
          setSelectedEvent(event.resource);
          setIsModalOpen(true);
        }}
      />
      {isModalOpen && <ModalComponent />}
    </>
  );
};

export default CalendarView;
