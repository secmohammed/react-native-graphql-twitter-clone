import React, { Component } from "react";
import styled from "styled-components/native";
import ProfileHeader from '../components/ProfileHeader.js'
import GET_USER_TWEETS_QUERY from "../graphql/queries/getUserTweets.js";
import { graphql } from "react-apollo";
import Loading from '../components/Loading.js'
import {  FlatList } from "react-native";

import FeedCard from '../components/FeedCard/FeedCard.js'
const Root = styled.View`
	flex: 1;
	backgroundColor: #f1f6f8;

`;
const Text = styled.Text`
	fontSize: 14;
	fontWeight: 600;
	color: ${props => props.theme.LIGHT_GRAY};
`;
class ProfileScreen extends Component {
	static navigationOptions = {
		tabBarLabel: "Details"
	};
	_renderItem = ({ item }) => <FeedCard {...item} />;

	render() {
		const { me, loading } = this.props.user;
		if (loading) {
			return <Loading />;
		}
		const tweetCount = me.tweets.length
		return (
			<Root>
				<ProfileHeader {...me} tweetCount={tweetCount} />
				<FlatList
					contentContainerStyle={{ alignSelf: "stretch" }}
					data={me.tweets}
					keyExtractor={item => item._id}
					renderItem={this._renderItem}
				/>
			</Root>
		);
	}
}
export default graphql(GET_USER_TWEETS_QUERY, { name: "user", options: { fetchPolicy: "network-only" } })(ProfileScreen);
