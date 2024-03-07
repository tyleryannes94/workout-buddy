const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLSchema } = require('graphql');
const { User } = require('./models');

// Resolver functions
const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    analytics: {
      type: Analytics,
      args: {
        username: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { username }) => {
        try {
          // Retrieve the user's data from the database
          const user = await User.findOne({ username });
          if (!user) {
            throw new Error('User not found');
          }

          // Extract analytics data from the user object
          const { totalMealsLogged, totalCaloriesEaten, totalWorkoutsCompleted, totalCaloriesBurned } = user.analytics;

          return {
            username,
            totalMealsLogged,
            totalCaloriesEaten,
            totalWorkoutsCompleted,
            totalCaloriesBurned
          };
        } catch (error) {
          console.error('Error fetching analytics:', error);
          throw new Error('Failed to fetch analytics');
        }
      }
    }
  }
});

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

// GraphQL schema
const schema = new GraphQLSchema({
  query: Query
});

module.exports = schema;
