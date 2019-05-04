/* eslint-disable no-param-reassign */
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import graphql from "graphql";
import cors from "cors";
import { createServer } from "http";
import { PubSub } from "graphql-subscriptions";

import typeDefs from "../graphql/schema";
import resolvers from "../graphql/resolvers";
import { auth } from "../services/auth.js";

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
		req,
		res,
		user: req.user,
		pubsub: new PubSub()
	})
});

export const middlewares = app => {
	app.use(bodyParser.json());
	app.use(errorHandler);
	app.use(cors());
	app.use(auth);
	server.applyMiddleware({ app });
	const httpServer = createServer(app);
	server.installSubscriptionHandlers(httpServer);
	return { httpServer, server };
};
