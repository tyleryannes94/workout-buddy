import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../App.css';

function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    healthGoals: [],
    workoutPreferences: [],
    dietType: [],
  });

  const navigate = useNavigate(); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    if (checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: [...prevFormData[name], value],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: prevFormData[name].filter((item) => item !== value),
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      health_goals: formData.healthGoals,
      workout_preferences: formData.workoutPreferences,
      diet_type: formData.dietType,
    };

    try {
      const signupResponse = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });

      const signupData = await signupResponse.json();
      if (signupData.error) {
        throw new Error(signupData.message);
      }
      console.log('Signup successful', signupData);

      if (signupData.userId) {
        localStorage.setItem('userId', signupData.userId); 
        navigate('/dashboard');
      } else {
        console.error('User ID not provided in signup response');
        alert('An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed: ' + error.message);
    }
  };

  const renderCheckboxes = (category, options) => {
    return options.map((option) => (
      <label key={option}>
        <input
          type="checkbox"
          name={category}
          value={option}
          checked={formData[category].includes(option)}
          onChange={handleCheckboxChange}
        />
        {option}
      </label>
    ));
  };

  return (
        <form id="signupForm" onSubmit={handleSubmit}>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
          <div>
            <h3>Health Goals</h3>
            {renderCheckboxes('healthGoals', ['lose weight', 'gain muscle', 'general wellness', 'improve strength', 'improve running time', 'improve flexibility', 'improve diet', 'I need it all'])}
          </div>
          <div>
            <h3>Workout Preferences</h3>
            {renderCheckboxes('workoutPreferences', ['free weights', 'hypertrophy', 'strength', 'running', 'cardio machines', 'swimming', 'yoga', 'HIIT', 'group classes', 'spin class'])}
          </div>
          <div>
            <h3>Diet Type</h3>
            {renderCheckboxes('dietType', ['paleo', 'keto', 'vegan', 'vegetarian', 'high calorie', 'low calorie', 'low carb', 'high protein', 'I just want to eat healthier'])}
          </div>
          <button type="submit">Sign Up</button>
        </form>
      );
    }
    
    export default SignupForm;