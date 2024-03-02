const fetch = require('node-fetch');
require('dotenv').config();
const User = require('../models/User'); 

async function generateMealPlan(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error(`User not found with ID: ${userId}`);
      throw new Error('User not found');
    }

    if (!user.diet_type || user.diet_type.length === 0) {
      console.error(`No diet preferences found for user: ${userId}`);
      throw new Error('No diet preferences found');
    }

    const preferencesText = user.diet_type.join(", ").replace(/, (?=[^,]*$)/, " and ");
    const prompt = `Create a detailed 7-day meal plan for someone interested in a ${preferencesText} diet. Include meal descriptions, estimated calories per meal, ensuring the plan is balanced and nutritious, with three meals per day (breakfast, lunch, dinner).`;

    console.log('Sending prompt to OpenAI:', prompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GPT_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": prompt }],
        max_tokens: 3000,
        temperature: 0.5,
      })
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (!response.ok) {
      console.error('API request failed:', data);
      throw new Error(`API request failed with status ${response.status}`);
    }

    if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
      const generatedPlan = data.choices[0].message.content;
      console.log('Generated Meal Plan:', generatedPlan);
      return generatedPlan;
    } else {
      console.error('Failed to generate plan from OpenAI:', data);
      throw new Error('No valid completion found in the response');
    }
  } catch (error) {
    console.error('Error generating meal plan for user:', userId, error);
    throw error;
  }
}

module.exports = { generateMealPlan };
