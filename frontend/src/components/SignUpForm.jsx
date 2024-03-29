import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../App.css';
import '../index.css'

function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    healthGoals: '',
    workoutPreferences: '',
    dietType: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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

      if (!signupResponse.ok) {
        throw new Error('Signup failed');
      }

      const signupData = await signupResponse.json(); 
      console.log('Signup successful', signupData);
     localStorage.setItem('userId', signupData.userId);
       navigate('/dashboard');
       
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed: ' + error.message);
    }
    <h1>First, a little about yourself... </h1>
  };

  return (
    <div className='responsive-margin'>
      <h1 className='customYellow'>First, </h1>
      <h1 className='customSerif-bold'>a little about yourself...</h1>
      <form id='signupForm' onSubmit={handleSubmit}>
        <input id='firstOfInputs' className='input' type='text' name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
        <input className='input' type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
        <input className='input' type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input className='input' type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />

        <div className='responsive-margin'>
          <h3>My Health Goal:</h3>
          <select name="healthGoals" value={formData.healthGoals} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="lose weight">Lose Weight</option>
            <option value="gain muscle">Gain Muscle</option>
            <option value="general wellness">General Wellness</option>
            <option value="improve strength">Improve Strength</option>
            <option value="improve running time">Improve Running Time</option>
            <option value="improve flexibility">Improve Flexibility</option>
            <option value="improve diet">Improve Diet</option>
            <option value="I need it all">I Need It All</option>
          </select>
        </div>

        <div className='responsive-margin'>
          <h3>Favorite Workouts:</h3>
          <select name="workoutPreferences" value={formData.workoutPreferences} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="free weights">Free Weights</option>
            <option value="hypertrophy">Hypertrophy</option>
            <option value="strength">Strength</option>
            <option value="running">Running</option>
            <option value="cardio machines">Cardio Machines</option>
            <option value="swimming">Swimming</option>
            <option value="yoga">Yoga</option>
            <option value="HIIT">HIIT</option>
            <option value="group classes">Group Classes</option>
            <option value="spin class">Spin Class</option>
          </select>
        </div>

        <div className='responsive-margin'>
          <h3>Diet Preferences:</h3>
          <select name="dietType" value={formData.dietType} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="paleo">Paleo</option>
            <option value="keto">Keto</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="high calorie">High Calorie</option>
            <option value="low calorie">Low Calorie</option>
            <option value="low carb">Low Carb</option>
            <option value="high protein">High Protein</option>
            <option value="I just want to eat healthier">I Just Want to Eat Healthier</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;