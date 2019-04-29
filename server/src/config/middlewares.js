/* eslint-disable no-param-reassign */
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from '../graphql/schema';
import resolvers from '../graphql/resolvers';
import { decodeToken } from '../services/auth.js';
import graphql from 'graphql';
import cors from 'cors';
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { status } = err;
  res.status(status).json(err);
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    user: req.user,
  }),
});

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (token != null) {
      const user = await decodeToken(token);
      req.user = user;
    } else {
      req.user = null;
    }
    return next();
  } catch (e) {
    throw e;
  }
}
export default app => {
  app.use(bodyParser.json());
  app.use(errorHandler);
  app.use(cors());
  app.use(auth);
  server.applyMiddleware({ app });
};
