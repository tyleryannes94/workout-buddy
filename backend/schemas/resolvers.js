const { Meal } = require('../models/Meal');
const { Workout } = require('../models/Workout');
const { User } = require('../models/User');
const { Friend } = require('../models/Friend');

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
      return User.findById(id);
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
