// Must have

// total meals logged - 
// calorie intake - 
// workouts completed - 
// calorie burned - 


// Extras

// count per workout type - 
// count per meal type - 
// calories per meal type - 

const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const Analytics = new GraphQLObjectType({
  name: 'Analytics',
  fields: {
    username: { type: GraphQLString },
    totalMealsLogged: { type: GraphQLInt },
    totalCaloriesEaten: { type: GraphQLInt },
    totalWorkoutsCompleted: { type: GraphQLInt },
    totalCaloriesBurned: { type: GraphQLInt }
  }
});

module.exports = Analytics;
