/* eslint-disable no-console */
import express from "express";

import "./config/db";
import constants from "./config/constants";
import mocks from "./mocks";
import { middlewares } from "./config/middlewares.js";
import { schema } from "./graphql/schema.js";

const app = express();

const { httpServer, server } = middlewares(app);

// mocks().then(() => {
httpServer.listen(constants.PORT, () => {
	console.log(
		`🚀 Server ready at http://localhost:${constants.PORT}${server.graphqlPath}`
	);
	console.log(
		`🚀 Subscriptions ready at ws://localhost:${constants.PORT}${
			server.subscriptionsPath
		}`
	);
});
// });
