import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignupForm from './components/SignupForm';


function App() {
  return (
  <Router>
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignupForm />} />
    </Routes>
  </Router>
  )
}

export default App
