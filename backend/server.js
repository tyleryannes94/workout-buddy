
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

const corsOptions = {
  origin: 'https://workout-buddy-2.onrender.com', 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware, 
});


async function startApolloServer() {
  await server.start();
  // app.use(cors()); //should this be removed?
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use('/', routes);

  
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
