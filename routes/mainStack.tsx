import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import ButterySelectionScreen from '../screens/customer/ButterySelectionScreen'
import MenuScreen from '../screens/customer/MenuScreen'
import CheckoutScreen from '../screens/customer/CheckoutScreen'
import SettingsScreen from '../screens/customer/SettingsScreen'
import StartScreen from '../screens/customer/StartScreen'
import NavigationScreen from '../screens/customer/NavigationScreen'
import OrderStatusScreen from '../screens/customer/OrderStatusScreen'
import ManagerRenderScreen from '../screens/staff/ManagerRenderScreen'
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
