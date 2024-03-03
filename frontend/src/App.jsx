import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-dom';
import Login from './components/Login';
import SignupForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';
import CreateMeals from './components/CreateMeals';
import CreateWorkouts from './components/CreateWorkouts';
import Navbar from './components/Navbar';


function App() {
  return (
  <Router>
    <Navbar />
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignupForm />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/meals" element={<CreateMeals />} />
    <Route path="/workouts" element={<CreateWorkouts />} />

    </Routes>
  </Router>
  )
}

export default App
