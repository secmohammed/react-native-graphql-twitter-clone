import React, { Component } from "react";
import styled from "styled-components/native";
import { graphql } from "react-apollo";
import FeedCard from "../components/FeedCard/FeedCard.js";
import GET_TWEETS_QUERY from "../graphql/queries/getTweets.js";
import { ActivityIndicator, FlatList } from "react-native";
import TWEET_ADDED_SUBSCRIPTION from "../graphql/subscriptions/tweetAdded.js";
import { connect } from "react-redux";
import { compose } from "redux";

const Root = styled.View`
	backgroundColor: #f2f2f2;
	flex: 1;
	paddingTop: 5;
`;
const List = styled.ScrollView``;
class HomeScreen extends Component {
	componentWillMount() {
	  if(!this.props.isAuthenticated) {
	  	this.props.navigation.navigate('Login')
	  }
	}
	_renderItem = ({ item }) => <FeedCard {...item} />;
	// componentDidMount() {
	// 	this.props.tweets.subscribeToMore({
	// 		document: TWEET_ADDED_SUBSCRIPTION,
	// 		updateQuery: (prev, { subscriptionData }) => {
	// 			if (!subscriptionData) {
	// 				return prev;
	// 			}
	// 			const newTweet = subscriptionData.data.tweetAdded;
	// 			if (!prev.getTweets.find(t => t._id === newTweet._id)) {
	// 				return {
	// 					...prev,
	// 					getTweets: [{ ...newTweet }, ...prev.getTweets]
	// 				};
	// 			}
	// 		},
	// 		onError: err => console.error(err)
	// 	});
	// }
	render() {
		if (this.props.tweets.loading) {
			return (
				<Root>
					<ActivityIndicator />
				</Root>
			);
		}
		return (
			<Root>
				<FlatList
					contentContainerStyle={{ alignSelf: "stretch" }}
					data={this.props.tweets.getTweets}
					keyExtractor={item => item._id}
					renderItem={this._renderItem}
				/>
			</Root>
		);
	}
}
const mapResultsToProps = ({ data }) => {
	return {
		tweets: data
	};
};
const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
};

export default compose(
    graphql(GET_TWEETS_QUERY, {
		name: "tweets",
		options: { fetchPolicy: "cache-and-network" }
	}),
	connect(
		mapStateToProps
	),

)(HomeScreen);
