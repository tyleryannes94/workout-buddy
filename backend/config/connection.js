const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/workout-buddy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongoose.connection;
