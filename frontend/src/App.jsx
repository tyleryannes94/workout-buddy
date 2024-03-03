import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';


function App() {
  return (
  <Router>
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignupForm />} />
    <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
  )
}

export default App
