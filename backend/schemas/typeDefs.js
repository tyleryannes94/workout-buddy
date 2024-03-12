const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type Meal {
    id: ID!
    name: String
    calories: Int
    proteins: Float
    carbs: Float
    fats: Float
    mealType: String
    ingredients: [String]
  }

  type Workout {
    id: ID!
    title: String
    description: String
    duration: Int
    intensity: String
    targetedMuscleGroups: [String]
  }

  type Goal {
    id: ID!
    goalType: String
    description: String
    startDate: Date
    endDate: Date
    status: String
  }

  type User {
    id: ID!
    first_name: String
    last_name: String
    email: String
    health_goals: [String]
    workout_preferences: [String]
    diet_type: [String]
    goals: [Goal]
    workouts: [Workout]
    meals: [Meal]
    meals_logged: Int
    workouts_completed: Int
    calories_consumed: Int
    calories_burned: Int
  }

  type Friend {
    id: ID!
    requester: User!
    recipient: User!
    status: String
    createdAt: Date
    updatedAt: Date
  }

  input MealInput {
    name: String
    calories: Int
    proteins: Float
    carbs: Float
    fats: Float
    mealType: String
    ingredients: [String]
  }

  input WorkoutInput {
    title: String
    description: String
    duration: Int
    intensity: String
    targetedMuscleGroups: [String]
  }

  input UserInput {
    first_name: String
    last_name: String
    email: String
    password: String
    health_goals: [String]
    workout_preferences: [String]
    diet_type: [String]
  }

  type Query {
    meals: [Meal]
    meal(id: ID!): Meal
    workouts: [Workout]
    workout(id: ID!): Workout
    users: [User]
    user(id: ID!): User
    friendRequests(userId: ID!): [Friend]
    friends(userId: ID!): [Friend]
  }

  type Mutation {
    addMeal(mealInput: MealInput!): Meal
    updateMeal(id: ID!, mealInput: MealInput!): Meal
    deleteMeal(id: ID!): Meal
    addWorkout(workoutInput: WorkoutInput!): Workout
    updateWorkout(id: ID!, workoutInput: WorkoutInput!): Workout
    deleteWorkout(id: ID!): Workout
    addUser(userInput: UserInput!): User
    updateUser(id: ID!, userInput: UserInput!): User
    deleteUser(id: ID!): User
    sendFriendRequest(requesterId: ID!, recipientId: ID!): Friend
    acceptFriendRequest(requestId: ID!): Friend
    declineFriendRequest(requestId: ID!): Friend
    removeFriend(requestId: ID!): Friend
  }
`;

module.exports = typeDefs;
