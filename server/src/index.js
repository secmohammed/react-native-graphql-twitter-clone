/* eslint-disable no-console */
import express from "express";

import "./config/db";
import constants from "./config/constants";
import mocks from "./mocks";
import { middlewares } from "./config/middlewares.js";
const app = express();

const { httpServer, server } = middlewares(app);
// mocks().then(() => {
httpServer.listen(constants.PORT, constants.IP_ADDRESS, () => {
	console.log(
		`🚀 Server ready at http://${constants.IP_ADDRESS}:${constants.PORT}${server.graphqlPath}`
	);
	console.log(
		`🚀 Subscriptions ready at ws://localhost:${constants.PORT}${
			server.subscriptionsPath
		}`
	);
});
// });
