import React, { Component } from "react";
import styled from "styled-components/native";

const Root = styled.View`
	backgroundColor: #f2f2f2;
	flex: 1;
	paddingTop: 5;
`;
const Text = styled.Text`
	fontSize: 14;
	fontWeight: 600;
	color: ${props => props.theme.LIGHT_GRAY};
`;
export default class ProfileScreen extends Component {
	static navigationOptions = {
		tabBarLabel: "Details"
	};
	render() {
		return (
			<Root>
				<Text> Hello There </Text>
			</Root>
		);
	}
}
