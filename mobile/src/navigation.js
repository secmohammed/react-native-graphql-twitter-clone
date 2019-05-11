import React from "react";
import { FontAwesome, SimpleLineIcons, EvilIcons } from "@expo/vector-icons";
import {
	createStackNavigator,
	createAppContainer,
	createBottomTabNavigator
} from "react-navigation";

import { colors } from "./utils/constants";
import HomeScreen from "./screens/HomeScreen.js";
import HeaderAvatar from "./components/HeaderAvatar.js";
import HeaderButton from "./components/HeaderButton.js";
import ExploreScreen from "./screens/ExploreScreen.js";
import NewTweetScreen from "./screens/NewTweetScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import NotificationScreen from "./screens/NotificationScreen.js";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { AsyncStorage, Keyboard } from "react-native";

import LoginScreen from "./screens/auth/LoginScreen";
const TAB_ICON_SIZE = 20;
const hasToken = async () => await AsyncStorage.getItem("token");
const AuthenticationTabs = createBottomTabNavigator({
	Register: {
		screen: RegisterScreen,
		navigationOptions: () => ({
			tabBarIcon: ({ tintColor }) => (
				<FontAwesome name="home" size={TAB_ICON_SIZE} color={tintColor} />
			)
		})
	},
	Login: {
		screen: LoginScreen,
		navigationOptions: () => ({
			tabBarIcon: ({ tintColor }) => (
				<FontAwesome name="home" size={TAB_ICON_SIZE} color={tintColor} />
			)
		})
	}
});
const Tabs = createBottomTabNavigator(
	{
		Home: {
			screen: HomeScreen,
			navigationOptions: () => ({
				tabBarIcon: ({ tintColor }) => (
					<FontAwesome name="home" size={TAB_ICON_SIZE} color={tintColor} />
				)
			})
		},
		Explore: {
			screen: ExploreScreen,
			navigationOptions: () => ({
				headerTitle: "Explore",
				tabBarIcon: ({ tintColor }) => (
					<FontAwesome name="search" size={TAB_ICON_SIZE} color={tintColor} />
				)
			})
		},
		Notification: {
			screen: NotificationScreen,
			navigationOptions: () => ({
				headerTitle: "Notification",
				tabBarIcon: ({ tintColor }) => (
					<FontAwesome name="bell" size={TAB_ICON_SIZE} color={tintColor} />
				)
			})
		},
	},
	{
		lazy: true,
		tabBarOptions: {
			showLabel: false,
			activeTintColor: colors.PRIMARY,
			inactiveTintColor: colors.LIGHT_GRAY,
			style: {
				backgroundColor: colors.WHITE,
				height: 50,
				paddingVertical: 5
			}
		}
	}
);
// TODO: setup the dynamic header name when changing tab.

export default createAppContainer(
	createStackNavigator(
		{
			Profile: {
				screen: ProfileScreen,
				navigationOptions: () => ({
					headerTitle: "Profile",
				})
			},
			Home: {
				screen: Tabs,
				navigationOptions: ({ navigation }) => ({
					headerLeft: <HeaderAvatar />,
					headerRight: (
						<HeaderButton
							side="right"
							onPress={() => navigation.navigate("NewTweet")}>
							<SimpleLineIcons color={colors.PRIMARY} size={20} name="pencil" />
						</HeaderButton>
					),
					headerTitle: "Home"
				})
			},
			Authentication: {
				screen: AuthenticationTabs,
				navigationOptions: () => ({
					headerTitle: "Authentication"
				})
			},
			NewTweet: {
				screen: NewTweetScreen,
				navigationOptions: ({ navigation }) => ({
					headerMode: "none",
					headerLeft: <HeaderAvatar />,
					headerRight: (
						<HeaderButton
							side="right"
							onPress={() => {
								Keyboard.dismiss();
								navigation.goBack(null);
							}}>
							<EvilIcons color={colors.PRIMARY} size={25} name="close" />
						</HeaderButton>
					)
				})
			}
		},
		{
			initialRouteName: hasToken() ? "Home" : "Authentication",
			cardStyle: {
				backgroundColor: "#F1F6FA"
			},
			navigationOptions: () => ({
				headerStyle: {
					backgroundColor: colors.WHITE
				},
				headerTitleStyle: {
					fontWeight: "bold",
					color: colors.SECONDARY
				}
			})
		}
	)
);
