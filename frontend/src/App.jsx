import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignupForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';
import CreateMeals from './components/CreateMeals';
import CreateWorkouts from './components/CreateWorkouts';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CalendarView from './components/CalendarView';
import Friend from './components/Friend';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meals" element={<CreateMeals />} />
        <Route path="/workouts" element={<CreateWorkouts />} />
        <Route path="/calendar" element={<CalendarView />} /> 
        <Route path="/friends" element={<Friend />} /> 
      </Routes>
    </Router>
  );
}

export default App;
