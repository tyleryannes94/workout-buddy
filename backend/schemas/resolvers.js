const { User, Meal, Workout } = require('../models'); // Import your Mongoose models

const resolvers = {
  Query: {
    meals: async () => {
      return Meal.find({});
    },
    meal: async (_, { id }) => {
      return Meal.findById(id);
    },
    workouts: async () => {
      return Workout.find({});
    },
    workout: async (_, { id }) => {
      return Workout.findById(id);
    },
    users: async () => {
      return User.find({});
    },
    user: async (_, { id }) => {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      // Calculate the total number of meals logged by the user
      const mealsLogged = user.meals ? user.meals.length : 0;

      // Calculate the total number of workouts completed by the user
      const workoutsCompleted = user.workouts ? user.workouts.length : 0;

      // Calculate the total calories consumed by summing up calories from all meals
      const caloriesConsumed = user.meals ? user.meals.reduce((totalCalories, meal) => totalCalories + meal.calories, 0) : 0;

      // Calculate the total calories burned by summing up duration from all workouts
      const caloriesBurned = user.workouts ? user.workouts.reduce((totalCalories, workout) => totalCalories + workout.duration, 0) : 0;

      // Return the user object with the additional metrics
      return {
        ...user.toObject(), // Convert Mongoose document to plain JavaScript object
        meals_logged: mealsLogged,
        workouts_completed: workoutsCompleted,
        calories_consumed: caloriesConsumed,
        calories_burned: caloriesBurned
      };
    },
    friendRequests: async (_, { userId }) => {
      return Friend.find({
        $or: [{ requester: userId }, { recipient: userId }],
        status: 'pending'
      }).populate('requester recipient');
    },
    friends: async (_, { userId }) => {
      return Friend.find({
        $or: [
          { requester: userId, status: 'accepted' },
          { recipient: userId, status: 'accepted' }
        ]
      }).populate('requester recipient');
    },
  },
  Mutation: {
    addMeal: async (_, { mealInput }) => {
      return Meal.create(mealInput);
    },
    updateMeal: async (_, { id, mealInput }) => {
      return Meal.findByIdAndUpdate(id, mealInput, { new: true });
    },
    deleteMeal: async (_, { id }) => {
      return Meal.findByIdAndDelete(id);
    },
    addWorkout: async (_, { workoutInput }) => {
      return Workout.create(workoutInput);
    },
    updateWorkout: async (_, { id, workoutInput }) => {
      return Workout.findByIdAndUpdate(id, workoutInput, { new: true });
    },
    deleteWorkout: async (_, { id }) => {
      return Workout.findByIdAndDelete(id);
    },
    addUser: async (_, { userInput }) => {
      return User.create(userInput);
    },
    updateUser: async (_, { id, userInput }) => {
      return User.findByIdAndUpdate(id, userInput, { new: true });
    },
    deleteUser: async (_, { id }) => {
      return User.findByIdAndDelete(id);
    },
    sendFriendRequest: async (_, { requesterId, recipientId }) => {
      const newFriendRequest = new Friend({
        requester: requesterId,
        recipient: recipientId,
        status: 'pending',
      });
      return newFriendRequest.save();
    },
    acceptFriendRequest: async (_, { requestId }) => {
      return Friend.findByIdAndUpdate(requestId, { status: 'accepted' }, { new: true }).populate('requester recipient');
    },
    declineFriendRequest: async (_, { requestId }) => {
      return Friend.findByIdAndUpdate(requestId, { status: 'declined' }, { new: true }).populate('requester recipient');
    },
    removeFriend: async (_, { requestId }) => {
      return Friend.findByIdAndRemove(requestId);
    },
  },
};

module.exports = resolvers;
