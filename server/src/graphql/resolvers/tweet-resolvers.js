import Tweet from "../../Models/Tweet";
import User from "../../Models/User";
import FavoriteTweet from "../../Models/FavoriteTweet";
import FollowingUser from "../../Models/FollowingUser";
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
	getTweets: async (_, { offset, limit }, { user, pubsub }) => {
		try {
			await requireAuth(user);

			const followings = await FollowingUser.findOne({ user: user._id });
			if (!followings) {
				throw new Error(
					"The people you are following, have not posted anything yet."
				);
			}

			const p1 = Tweet.find({
				user: {
					$in: followings.followings
				}
			})
				.limit(limit)
				.skip(offset)
				.populate("user")
				.sort({ createdAt: -1 });

			const p2 = FavoriteTweet.findOne({ user: user._id });

			const [tweets, favorites] = await Promise.all([p1, p2]);

			return tweets.reduce((arr, tweet) => {
				const tw = tweet.toJSON();
				if (favorites.tweets.some(t => t.equals(tweet._id))) {
					arr.push({
						...tw,
						isFavorited: true
					});
				} else {
					arr.push({
						...tw,
						isFavorited: false
					});
				}
				return arr;
			}, []);
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
	      	const tweet = await Tweet.create({ ...args, user: user._id });
	      	const tweetForPublishing = await Tweet.findById(tweet._id).populate('user')
			pubsub.publish(TWEET_ADDED, { tweetAdded: tweetForPublishing });
			
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
	favoriteTweet: async (_, { _id }, { user }) => {
		try {
			await requireAuth(user);
			
			const favorites = await FavoriteTweet.findOne({ user: user._id });
			
			if (!favorites) {
				let favoriteTweet = new FavoriteTweet({
					user: user._id
				});
			
				favoriteTweet.tweets.push(_id);
				await favoriteTweet.save();
				const tweet = await Tweet.incFavoriteCount(_id);

				return {
					isFavorited: true,
					...tweet.toJSON()
				};
			}
			if (favorites.tweets.some(t => t.equals(_id))) {
				favorites.tweets.pull(_id);
				await favorites.save();
				const tweet = await Tweet.decFavoriteCount(_id);

				return {
					isFavorited: false,
					...tweet.toJSON()
				};
			}
			favorites.tweets.push(_id);
			await favorites.save();
			const tweet = await Tweet.incFavoriteCount(_id);

			return {
				isFavorited: true,
				...tweet.toJSON()
			};
		} catch (e) {
			throw e;
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
		subscribe: (_, __, { pubsub }) => pubsub.asyncIterator([TWEET_ADDED])
	}
};
