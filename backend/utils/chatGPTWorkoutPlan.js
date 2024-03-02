const fetch = require('node-fetch');
require('dotenv').config();
const User = require('../models/User'); 

async function generateWorkoutPlan(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error(`User not found with ID: ${userId}`);
      throw new Error('User not found');
    }

    if (!user.workout_preferences || user.workout_preferences.length === 0) {
      console.error(`No workout preferences found for user: ${userId}`);
      throw new Error('No workout preferences found');
    }

    const preferencesArray = user.workout_preferences;
    const preferencesText = preferencesArray.join(", ").replace(/, (?=[^,]*$)/, " and ");
    const prompt = `Generate a detailed 7-day workout plan for a user interested in ${preferencesText}. Please format each day's plan with the following structure: Day X: [Workout Type] - [Workout Description]. Include estimated calories burned at the end of each day's plan.`;

    console.log('Sending prompt to OpenAI:', prompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GPT_API_KEY}` 
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          "role": "user",
          "content": prompt
        }],
        max_tokens: 3000,
        temperature: 0.5,
      })
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (!response.ok) {
      console.error('API request failed:', data);
      throw new Error(`API request failed with status ${response.status}: ${data.error ? data.error.message : 'Unknown error'}`);
    }

    if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
      const generatedText = data.choices[0].message.content;
      return generatedText;
    } else {
      console.error('Failed to generate plan from OpenAI:', data);
      throw new Error('No valid completion found in the response');
    }
  } catch (error) {
    console.error('Error generating workout plan for user:', userId, error);
    throw error; 
  }
}

module.exports = { generateWorkoutPlan };
