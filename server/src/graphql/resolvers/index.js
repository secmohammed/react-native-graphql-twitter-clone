import GraphQLDate from "graphql-date";

import TweetResolvers from "./tweet-resolvers";
import UserResolvers from "./user-resolvers";
import User from "../../Models/User";

export default {
	Date: GraphQLDate,
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
