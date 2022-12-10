import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from '../screens/HomeScreen'
import ButteryScreen from '../screens/MenuScreen'
import CheckoutScreen from '../screens/CheckoutScreen'
import SettingsScreen from '../screens/Settings'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Butteries',
      headerRight: () => (
        <Button
          title="NN"
          color="#fff"
          onPress={() => {
            console.log('Dark')
          }}
        />
      ),
      headerRightContainerStyle: { paddingRight: 10 },
      headerLeft: () => {
        return (
          <Button
            title="NN"
            color="#fff"
            onPress={() => {
              console.log('TO SETTINGS')
            }}
          />
        )
      },
      headerLeftContainerStyle: { paddingLeft: 10 },
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
    headerBackground: (
      <LinearGradient colors={['#a13388', '#10356c']} style={{ flex: 1 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
    ),
    headerTitleStyle: { fontFamily: 'HindSiliguri-Bolder', fontSize: 20 },
    headerTintColor: '#FFF',
    headerBackTitleStyle: { fontFamily: 'HindSiliguri-Bold', color: '#FFF', fontSize: 18 },
  },
})

export default createAppContainer(HomeStack)
