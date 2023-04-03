import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import ButterySelectionScreen from '../screens/ButterySelectionScreen'
import MenuScreen from '../screens/MenuScreen'
import CheckoutScreen from '../screens/CheckoutScreen'
import SettingsScreen from '../screens/SettingsScreen'
import StartScreen from '../screens/StartScreen'
import NavigationScreen from '../screens/NavigationScreen'
import OrderStatusScreen from '../screens/OrderStatusScreen'
import ManagerRenderScreen from '../screens/ManagerRenderScreen'
import React from 'react'

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
    screen: ButterySelectionScreen,
    navigationOptions: {
      title: 'Butteries',
    },
  },
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
    },
  },
  MenuScreen: {
    screen: MenuScreen,
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
  OrderStatusScreen: {
    screen: OrderStatusScreen,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
      title: 'StatusScreen',
      headerLeft: () => <></>,
    },
  },
  ManagerRenderScreen: {
    screen: ManagerRenderScreen,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
      title: 'ManagerScreen',
      headerLeft: () => <></>,
    },
  },
}

const MainStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#28a67e',
      borderWidth: 0,
      shadowColor: '#222',
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },
    headerTitleStyle: { fontFamily: 'HindSiliguri-Bold', fontSize: 20, paddingBottom: 10 },
    headerTintColor: '#FFF',
    headerBackTitleStyle: { fontFamily: 'HindSiliguri-Bold', color: '#FFF', fontSize: 18 },
  },
})

const AppContainer = createAppContainer(MainStack)

export default AppContainer
