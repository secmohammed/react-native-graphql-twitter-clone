import React from "react";

import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

import { colors } from "../utils/constants.js";

const Root = styled.View`
	flex: ;
	justifycontent: center;
	alignitems: center;
`;

export default function Loading({ color = colors.PRIMARY, size = "large" }) {
	return (
		<Root>
			<ActivityIndicator size={size} color={color} />
		</Root>
	);
}
