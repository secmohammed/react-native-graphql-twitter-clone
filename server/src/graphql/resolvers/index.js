import GraphQLDate from "graphql-date";

import TweetResolvers from "./tweet-resolvers";
import UserResolvers from "./user-resolvers";
import FollowResolver from "./follow-resolvers";
import User from "../../Models/User";
import Tweet from "../../Models/Tweet";
import FollowingUser from "../../Models/FollowingUser";

export default {
	Date: GraphQLDate,
	User : {
		tweets: ({ _id }) => Tweet.find({ user: _id }).populate('user').sort({ createdAt: -1 }),
		followings: async ({ _id }) => { 
			const followings = await FollowingUser.findOne({ user: _id }).populate('followings') 
			if (followings) {
				return followings.followings
			}
		}
	},
	Query: {
		getTweet: TweetResolvers.getTweet,
		getTweets: TweetResolvers.getTweets,
		getUserTweets: TweetResolvers.getUserTweets,
		me: UserResolvers.me,
		getUser: UserResolvers.getUser
	},
	Mutation: {
		createTweet: TweetResolvers.createTweet,
		updateTweet: TweetResolvers.updateTweet,
		deleteTweet: TweetResolvers.deleteTweet,
		favoriteTweet: TweetResolvers.favoriteTweet,
		signup: UserResolvers.signup,
		signin: UserResolvers.signin,
		follow: FollowResolver.follow,
		unfollow: FollowResolver.unfollow
	},
	Subscription: {
		tweetAdded: TweetResolvers.tweetAdded
	}
};
