import User from "../../Models/User";
import FavoriteTweet from '../../Models/FavoriteTweet.js'
import { requireAuth } from "../../services/auth";

export default {
	signup: async (_, { fullName, ...rest }) => {
		try {
			const [firstName, ...lastName] = fullName.split(" ");
			// fix lastName.
			const user = await User.create({ firstName, ...rest });
			await FavoriteTweet.create({ userId: user._id});
			return {
				token: user.createToken()
			};
		} catch (error) {
			throw error;
		}
	},

	signin: async (_, { email, password }) => {
		try {
			const user = await User.findOne({ email });

			if (!user) {
				throw new Error("User not exist!");
			}

			if (!user.verifyPassword(password)) {
				throw new Error("Password not match!");
			}

			return {
				token: user.createToken()
			};
		} catch (error) {
			throw error;
		}
	},

	me: async (_, args, { user }) => {
		try {
			return await requireAuth(user);
		} catch (error) {
			throw error;
		}
	}
};
