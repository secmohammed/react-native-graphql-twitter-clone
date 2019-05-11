import React, { Component } from "react";
import styled from "styled-components/native";
import ME_QUERY from "../graphql/queries/me.js";
import { graphql } from "react-apollo";
import Loading from "./Loading.js";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { connect } from "react-redux";
import { compose } from "redux";
import { logout } from "../store/actions/authActions";

const AVATAR_SIZE = 30;
const AVATAR_RADUIS = AVATAR_SIZE / 2;
import { navigate } from "../services/navigator.js";
import HeaderButton from "./HeaderButton";
const Avatar = styled.Image`
	height: ${AVATAR_SIZE};
	width: ${AVATAR_SIZE};
	borderRadius: ${AVATAR_RADUIS};
`;
class HeaderAvatar extends Component {
	constructor(props) {
		super(props);
	}
	_onUnauthenticatedPress = () => {
		navigate("Authentication");
	};
	_onOpenActionSheet = () => {
		const options = ["Profile", "Logout", "Cancel"];
		const destructiveButtonIndex = 1;
		this.props.showActionSheetWithOptions(
			{
				options,
				destructiveButtonIndex
			},
			async buttonIndex => {
				if (buttonIndex === 1) {
					await this.props.logout();
				}else if(buttonIndex === 0) {
					navigate('Profile', { _id: this.props.user.me._id})
				}
			}
		);
	};
	render() {
		const { me, loading } = this.props.user;
		if (loading) {
			return (
				<HeaderButton side="left" disabled>
					<Loading size="small" />
				</HeaderButton>
			);
		}
		if (me && this.props.isAuthenticated) {
			return (
				<HeaderButton side="left" onPress={this._onOpenActionSheet}>
					<Avatar source={{ uri: me.avatar }} />
				</HeaderButton>
			);
		}
		return (
			<HeaderButton side="left" onPress={this._onUnauthenticatedPress}>
				<Loading size="small" />
			</HeaderButton>
		);
	}
}
const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
};
export default compose(
	connect(
		mapStateToProps,
		{
			logout
		}
	),
	graphql(ME_QUERY, { name: "user", options: { fetchPolicy: "network-only" } })
)(connectActionSheet(HeaderAvatar));
