import Tweet from "../../Models/Tweet";
import { requireAuth } from "../../services/auth";

const TWEET_ADDED = "TWEET_ADDED";
export default {
	getTweet: async (_, { _id }, { user }) => {
		try {
			await requireAuth(user);
			return Tweet.findById(_id);
		} catch (error) {
			throw error;
		}
	},
	getTweets: async (_, args, { user }) => {
		try {
			return await Tweet.find({}).sort({ createdAt: -1 });
		} catch (error) {
			throw error;
		}
	},
	getUserTweets: async (_, args, { user }) => {
		try {
			await requireAuth(user);
			return Tweet.find({ user: user._id }).sort({ createdAt: -1 });
		} catch (error) {
			throw error;
		}
	},
	createTweet: async (_, args, { user, pubsub }) => {
		try {
			await requireAuth(user);
			const tweet = Tweet.create({ ...args, user: user._id });
			await pubsub.publish(TWEET_ADDED, { tweet });
			return tweet;
		} catch (error) {
			throw error;
		}
	},
	updateTweet: async (_, { _id, ...rest }, { user }) => {
		try {
			await requireAuth(user);
			const tweet = await Tweet.findOne({ _id, user: user._id });

			if (!tweet) {
				throw new Error("Not found!");
			}

			Object.entries(rest).forEach(([key, value]) => {
				tweet[key] = value;
			});

			return tweet.save();
		} catch (error) {
			throw error;
		}
	},
	deleteTweet: async (_, { _id }, { user }) => {
		try {
			await requireAuth(user);
			const tweet = await Tweet.findOne({ _id, user: user._id });

			if (!tweet) {
				throw new Error("Not found!");
			}
			await tweet.remove();
			return {
				message: "Delete Success!"
			};
		} catch (error) {
			throw error;
		}
	},
	tweetAdded: {
		subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(TWEET_ADDED)
	}
};
