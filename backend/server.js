require('dotenv').config();

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
// const MongoDBStore = require('connect-mongodb-session')(session);
const routes = require('./routes/index'); // Adjust the path as per your new structure
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const store = new MongoDBStore({
    uri: process.env.DATABASE_URL,
    collection: 'sessions',
  });
  
  store.on('error', function(error) {
    console.error('Session store error:', error);
  });

  app.use(session({
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));

  app.use(cors({
    origin: '*', 
    credentials: true, 
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.use('/', routes);

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });  

  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB database'))
  .catch(err => console.error('MongoDB connection error:', err));
  
  // Start the server
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
