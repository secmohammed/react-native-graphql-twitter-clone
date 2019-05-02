import React, { Component } from "react";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import Touchable from "@appandflow/touchable";
import { Platform, Keyboard } from "react-native";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import { compose } from "redux";

import { colors } from "../../utils/constants.js";
import { login } from "../../store/actions/authActions";
import SIGNIN_MUTATION from "../../graphql/mutations/signin";
import Loading from "../../components/Loading";

const Root = styled(Touchable).attrs({
	feedback: "none"
})`
	flex: 1;
	position: relative;
	justifycontent: center;
	alignitems: center;
`;
const Wrapper = styled.View`
	alignself: stretch;
	alignitems: center;
	justifycontent: center;
	flex: 1;
`;
const BackButton = styled.View`
	justifycontent: center;
	alignitems: center;
	position: absolute;
	top: 5%;
	zindex: 1;
	left: 5%;
`;
const ButtonConfirm = styled(Touchable).attrs({
	feedback: "opacity"
})`
	position: absolute;
	bottom: 15%;
	width: 70%;
	height: 50;
	backgroundcolor: ${props => props.theme.PRIMARY};
	borderradius: 10;
	justifycontent: center;
	alignitems: center;
	shadowcolor: #000;
	shadowopacity: 0.2;
	shadowradius: 5;
	shadowoffset: 0px 2px;
	elevation: 2;
`;
const ButtonConfirmText = styled.Text`
	color: ${props => props.theme.WHITE};
	fontweight: 600;
`;
const InputWrapper = styled.View`
	height: 50;
	width: 70%;
	borderbottomwidth: 2;
	marginvertical: 5;
	justifycontent: flex-end;
	borderbottomcolor: ${props => props.theme.LIGHT_GRAY};
`;
const Input = styled.TextInput.attrs({
	placeholderTextColor: colors.LIGHT_GRAY,
	selectionColor: Platform.OS === "ios" ? colors.WHITE : undefined,
	autoCorrect: false
})`
	height: 30;
`;

class SigninForm extends Component {
	componentWillMount() {
		if (this.props.isAuthenticated) {
			this.props.navigation.navigate("home");
		}
	}
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			loading: false
		};
	}
	_onChangeText = (text, type) =>
		this.setState({
			[type]: text
		});

	_onOutsidePress = () => Keyboard.dismiss();
	_onPressSignin = async () => {
		this.setState({
			loading: true
		});
		const { email, password } = this.state;

		const { data, error } = await this.props.mutate({
			variables: {
				email,
				password
			}
		});
		try {
			await this.props.login({
				token: data.signin.token
			});
			this.setState({
				loading: false
			});
			this.props.navigation.navigate("Home");
		} catch (err) {
			throw err;
		}
	};
	render() {
		if (this.state.loading) {
			return <Loading />;
		}
		return (
			<Root onPress={this._onOutsidePress}>
				<BackButton>
					<MaterialIcons color={colors.WHITE} size={30} name="arrow-back" />
				</BackButton>
				<Wrapper>
					<InputWrapper>
						<Input
							onChangeText={text => this._onChangeText(text, "email")}
							placeholder="Email"
							autoCapitalize="none"
							keyboardType="email-address"
						/>
					</InputWrapper>
					<InputWrapper>
						<Input
							placeholder="Password"
							secureTextEntry
							onChangeText={text => this._onChangeText(text, "password")}
						/>
					</InputWrapper>
					<ButtonConfirm onPress={this._onPressSignin}>
						<ButtonConfirmText>Sign in</ButtonConfirmText>
					</ButtonConfirm>
				</Wrapper>
			</Root>
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
			login
		}
	),
	graphql(SIGNIN_MUTATION)
)(SigninForm);
