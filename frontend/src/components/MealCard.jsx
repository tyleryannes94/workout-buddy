import React from 'react';
import MealBlock from './MealBlock'; 


const MealCard = ({ mealPlans, isLoading, isGenerating, error }) => {
  return (
    <div className="meal-card">
      {isGenerating && <div>Generating new meals...</div>}
      {error && <div>Error: {error}</div>}
      {isLoading && !isGenerating && <div>Loading...</div>}
      {mealPlans.length > 0 ? (
        mealPlans.map((meal) => (
          <MealBlock key={meal._id} meal={meal} />
        ))
      ) : (
        <p>No meal plans available. Try generating new ones.</p>
      )}
    </div>
  );
};

export default MealCard;