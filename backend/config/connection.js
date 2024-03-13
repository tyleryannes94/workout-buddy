const mongoose = require('mongoose');
require("dotenv").config();

if (!process.env.MONGODB_URI) {
  console.error("Error: MONGODB_URI not found in .env file");
  process.exit(1); 
}

mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log("MongoDB connection established successfully"))
.catch(err => console.error("Error connecting to MongoDB:", err));

module.exports = mongoose.connection;
