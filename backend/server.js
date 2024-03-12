// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const routes = require('./routes/index');
// const path = require('path');
// const cors = require('cors');
// const { graphqlHTTP } = require('graphql-http');

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

// // Start the server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const routes = require('./routes/index');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware, 
});


async function startApolloServer() {
  await server.start();
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use('/', routes);
  app.use(cors());
  
  app.use('/graphql', expressMiddleware(server));
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
}

startApolloServer();
