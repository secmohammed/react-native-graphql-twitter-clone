import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator
} from "react-navigation";

import { colors } from "./utils/constants";
import HomeScreen from "./screens/HomeScreen.js";
import HeaderAvatar from "./components/HeaderAvatar.js";
import ExploreScreen from "./screens/ExploreScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import NotificationScreen from "./screens/NotificationScreen.js";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { AsyncStorage } from 'react-native'

import LoginScreen from "./screens/auth/LoginScreen";
const TAB_ICON_SIZE = 20;
const hasToken = async () => await AsyncStorage.getItem("token");
const AuthenticationTabs = createBottomTabNavigator({
    Register: {
        screen: RegisterScreen,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome
                    name="home"
                    size={TAB_ICON_SIZE}
                    color={tintColor}
                />
            )
        })
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome
                    name="home"
                    size={TAB_ICON_SIZE}
                    color={tintColor}
                />
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
                    <FontAwesome
                        name="home"
                        size={TAB_ICON_SIZE}
                        color={tintColor}
                    />
                )
            })
        },
        Explore: {
            screen: ExploreScreen,
            navigationOptions: () => ({
                headerTitle: "Explore",
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome
                        name="search"
                        size={TAB_ICON_SIZE}
                        color={tintColor}
                    />
                )
            })
        },
        Notification: {
            screen: NotificationScreen,
            navigationOptions: () => ({
                headerTitle: "Notification",
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome
                        name="bell"
                        size={TAB_ICON_SIZE}
                        color={tintColor}
                    />
                )
            })
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: () => ({
                headerTitle: "Profile",
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome
                        name="user"
                        size={TAB_ICON_SIZE}
                        color={tintColor}
                    />
                )
            })
        }
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
            Home: {
                screen: Tabs,
                navigationOptions: () => ({
                    headerLeft: <HeaderAvatar />,
                    headerTitle: "Home"
                })
            },
            Authentication: {
                screen: AuthenticationTabs,
                navigationOptions: () => ({
                    headerTitle: "Authentication"
                })
            }
        },
        {
            initialRouteName: hasToken() ? "Home" : "Authentication"
        }
    )
);
