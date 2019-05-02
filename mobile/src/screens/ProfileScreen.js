import React, { Component } from "react";
import styled from "styled-components/native";

const Root = styled.View`
	backgroundcolor: #f2f2f2;
	flex: 1;
	paddingtop: 5;
`;
const Text = styled.Text`
	fontsize: 14;
	fontweight: 600;
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
