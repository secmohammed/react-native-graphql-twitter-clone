import GraphQLDate from "graphql-date";

import TweetResolvers from "./tweet-resolvers";
import UserResolvers from "./user-resolvers";
import FollowResolvers from "./follow-resolvers";
import SearchResolvers from "./search-resolvers";
import CommentResolvers from "./comment-resolvers";
import User from "../../Models/User";
import Comment from "../../Models/Comment";
import Tweet from "../../Models/Tweet";
import FollowingUser from "../../Models/FollowingUser";

export default {
	Date: GraphQLDate,
	Tweet: {
		user: ({ user }) => {
			if (typeof user == Object) {
				return user;
			}
			return User.findById(user);
		}
	},
	User : {
		tweets: ({ _id }) => Tweet.find({ user: _id }).populate('user').sort({ createdAt: -1 }),
		followings: async ({ _id }) => { 
			const followings = await FollowingUser.findOne({ user: _id }).populate('followings')
			if (followings) {
				return followings.followings
			}
		},
		followers: async ({ _id }) => {
			const followers = await FollowingUser.find({ followings: _id }).populate('user').sort({ createdAt: -1 });
			if (followers) {
				return followers.map(follower => follower.user);
			}
		},
		followingsCount: async ({ _id }) => { 
			const followings = await FollowingUser.findOne({ user: _id }).populate('followings')
			if (followings) {
				return followings.followings.length
			}
			return 0;
		},
		followersCount: async ({_id}) => {
			const followers = await FollowingUser.find({ followings: _id }).populate('user').sort({ createdAt: -1 });
			if (followers) {
				return followers.length;
			}
			return 0;

		}
	},
	Query: {
		getTweet: TweetResolvers.getTweet,
		getTweets: TweetResolvers.getTweets,
		getUserTweets: TweetResolvers.getUserTweets,
		me: UserResolvers.me,
		getUser: UserResolvers.getUser,
		search: SearchResolvers.search,
		getComments: CommentResolvers.comments
	},
	Mutation: {
		createTweet: TweetResolvers.createTweet,
		updateTweet: TweetResolvers.updateTweet,
		deleteTweet: TweetResolvers.deleteTweet,
		favoriteTweet: TweetResolvers.favoriteTweet,
		signup: UserResolvers.signup,
		signin: UserResolvers.signin,
		follow: FollowResolvers.follow,
		unfollow: FollowResolvers.unfollow,
		createComment: CommentResolvers.createComment,
		updateComment: CommentResolvers.updateComment
	},
	Subscription: {
		tweetAdded: TweetResolvers.tweetAdded
	}
};
