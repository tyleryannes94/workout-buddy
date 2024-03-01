require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log('Connected to MongoDB database'))
.catch(err => console.error('MongoDB connection error:', err));

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

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
