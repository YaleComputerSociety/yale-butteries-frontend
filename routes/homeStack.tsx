import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from '../screens/HomeScreen'
import ButteryScreen from '../screens/MenuScreen'
import CheckoutScreen from '../screens/CheckoutScreen'
import SettingsScreen from '../screens/Settings'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import StartScreen from '../screens/StartScreen'
import NavigationScreen from '../screens/NavigationScreen'

const screens = {
  StartScreen: {
    screen: StartScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  NavigationScreen: {
    screen: NavigationScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Butteries',
    },
  },
  ButteryScreen: {
    screen: ButteryScreen,
    navigationOptions: {
      title: 'Menu',
    },
  },
  CheckoutScreen: {
    screen: CheckoutScreen,
    navigationOptions: {
      title: 'Checkout',
    },
  },
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
    },
  },
}

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    gestureEnabled: false,
    headerBackground: (
      <LinearGradient colors={['#a13388', '#10356c']} style={{ flex: 1 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
    ),
    headerTitleStyle: { fontFamily: 'HindSiliguri-Bolder', fontSize: 20 },
    headerTintColor: '#FFF',
    headerBackTitleStyle: { fontFamily: 'HindSiliguri-Bold', color: '#FFF', fontSize: 18 },
  },
})

export default createAppContainer(HomeStack)
