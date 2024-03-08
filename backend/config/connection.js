const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/workout-buddy')
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose.connection;
