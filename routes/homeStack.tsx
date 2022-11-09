import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from '../screens/HomeScreen'
import ButteryScreen from '../screens/MenuScreen'
import CheckoutScreen from '../screens/CheckoutScreen'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const screens = {
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
}

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerBackground: (
      <LinearGradient colors={['#a13388', '#10356c']} style={{ flex: 1 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
    ),
    //headerStyle: { backgroundColor: '#00b2db' },
    headerTitleStyle: { fontFamily: 'HindSiliguri-Bolder', fontSize: 20, marginBottom: 10 },
    headerTintColor: '#FFF',
    headerBackTitleStyle: { fontFamily: 'HindSiliguri-Bolder', color: '#FFF', fontSize: 20 },
  },
})

export default createAppContainer(HomeStack)
