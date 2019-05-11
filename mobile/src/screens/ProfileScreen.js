import React, { Component } from "react";
import styled from "styled-components/native";
import ProfileHeader from '../components/ProfileHeader.js'
import GET_PROFILE_TWEETS_QUERY from "../graphql/queries/profile.js";
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
		const { getUser, loading } = this.props.data;
		if (loading) {
			return <Loading />;
		}
		const tweetCount = getUser.tweets.length
		return (
			<Root>
				<ProfileHeader {...getUser} tweetCount={tweetCount} />
				<FlatList
					contentContainerStyle={{ alignSelf: "stretch" }}
					data={getUser.tweets}
					keyExtractor={item => item._id}
					renderItem={this._renderItem}
				/>
			</Root>
		);
	}
}
export default graphql(GET_PROFILE_TWEETS_QUERY, {
 	options: (props) => ({ variables: { id: props.navigation.getParam('_id') } }) 
})(ProfileScreen);
