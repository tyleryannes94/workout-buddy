// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const routes = require('./routes/index');
// const path = require('path');
// const cors = require('cors');
// const { graphqlHTTP } = require('graphql-http');

// //this is for the friend request feature
// const http = require('http'); 
// const { Server } = require("socket.io"); 

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Connect to MongoDB
// mongoose.connect(process.env.DATABASE_URL)
// .then(() => console.log('Connected to MongoDB database'))
// .catch(err => console.error('MongoDB connection error:', err));

// app.use(cors({
//     origin: '*', 
//     credentials: true, 
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../frontend/dist')));

// app.use('/', routes);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
// });

// //this is for the friend request feature
// const server = http.createServer(app);

// const io = new Server(server);

// io.on('connection', (socket) => {
//     console.log('A user connected');
  
//     // Listen for a 'send_friend_request' event from clients
//     socket.on('send_friend_request', (data) => {
//       // Assuming 'data' contains the receiver's user ID and the sender's information
//       // You could emit an event back to the sender for a confirmation
//       // And/or emit an event to the receiver if you know their socket ID
//       io.emit('friend_request_received', data);
//     });
  
//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });
  


// // Start the server
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const http = require('http'); 
const { Server } = require("socket.io");
const socketUtils = require('./utils/socket'); // Adjust the path as necessary

const app = express();

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB database'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] }});

socketUtils.init(io); // Initialize Socket.IO

// Import and use routes after Socket.IO initialization
const routes = require('./routes/index'); // Adjust path as necessary
app.use('/', routes);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/dist/index.html')));

server.listen(process.env.PORT || 3001, () => console.log(`Server running on port ${process.env.PORT || 3001}`));

