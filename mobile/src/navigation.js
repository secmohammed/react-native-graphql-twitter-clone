import React from 'react'
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import HomeScreen from './screens/HomeScreen.js'
import ExploreScreen from './screens/ExploreScreen.js';
import NotificationScreen from './screens/NotificationScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';

import { FontAwesome } from '@expo/vector-icons';
import { colors } from './utils/constants';
const TAB_ICON_SIZE = 20;

const Tabs = createBottomTabNavigator({
        Home: {
            screen: HomeScreen,
            navigationOptions: () => ({
                tabBarIcon: ({ tintColor }) =>
                <FontAwesome name="home" size={TAB_ICON_SIZE} color={tintColor}/>
            }),
        },
        Explore: {
            screen: ExploreScreen,
            navigationOptions: () => ({
                headerTitle: 'Explore',
                tabBarIcon: ({ tintColor }) =>
                <FontAwesome name="search" size={TAB_ICON_SIZE} color={tintColor}/>
            }),
        },
        Notification: {
            screen: NotificationScreen,
            navigationOptions: () => ({
                headerTitle: 'Notification',
                tabBarIcon: ({ tintColor }) =>
                <FontAwesome name="bell" size={TAB_ICON_SIZE} color={tintColor}/>
            }),
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: () => ({
                headerTitle: 'Profile',
                tabBarIcon: ({ tintColor }) =>
                <FontAwesome name="user" size={TAB_ICON_SIZE} color={tintColor}/>
            }),
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
            paddingVertical: 5,
          },
        },
    })
// TODO: setup the dynamic header name when changing tab.

export default createAppContainer(createStackNavigator(
   {
        Home: {
          screen: Tabs,
            navigationOptions: () => ({
                headerTitle: 'Home'
            })
        }
    }, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.WHITE,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: colors.SECONDARY,
            },
        },
  }
));
