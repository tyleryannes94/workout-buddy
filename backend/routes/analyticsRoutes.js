const express = require('express');
const router = express.Router();

// Define route handler for '/analytics' path
router.get('/', (req, res) => {
  // Here you can send the index.html file or render your React app
  res.send('This is the analytics page'); // For testing purposes, you can send a simple response
});

module.exports = router;
