import GraphQLDate from "graphql-date";

import TweetResolvers from "./tweet-resolvers";
import UserResolvers from "./user-resolvers";
import User from "../../Models/User";
import Tweet from "../../Models/Tweet";

export default {
	Date: GraphQLDate,
	User : {
		tweets: ({ _id }) => Tweet.find({ user: _id }).populate('user').sort({ createdAt: -1 })
	},
	Query: {
		getTweet: TweetResolvers.getTweet,
		getTweets: TweetResolvers.getTweets,
		getUserTweets: TweetResolvers.getUserTweets,
		me: UserResolvers.me
	},
	Mutation: {
		createTweet: TweetResolvers.createTweet,
		updateTweet: TweetResolvers.updateTweet,
		deleteTweet: TweetResolvers.deleteTweet,
		favoriteTweet: TweetResolvers.favoriteTweet,
		signup: UserResolvers.signup,
		signin: UserResolvers.signin
	},
	Subscription: {
		tweetAdded: TweetResolvers.tweetAdded
	}
};
