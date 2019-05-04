import jwt from "jsonwebtoken";

import constants from "../config/constants.js";
import User from "../Models/User";

export async function decodeToken(token) {
	const arr = token.split(" ");
	if (arr[0] == "Bearer") {
		return await jwt.verify(arr[1], constants.JWT_SECRET);
	}
	throw new Error("Token not valid !");
}

export async function auth(req, res, next) {
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

export async function requireAuth(user) {
	if (!user || !user._id) {
		throw new Error("Unauthorized attempt");
	}

	const me = await User.findById(user._id);

	if (!me) {
		throw new Error("Unauthorized attempt");
	}

	return me;
}
