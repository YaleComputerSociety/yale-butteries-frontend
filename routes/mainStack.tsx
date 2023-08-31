import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import ButterySelectionScreen from '../screens/customer/ButteriesScreen'
import MenuScreen from '../screens/customer/MenuScreen'
import CheckoutScreen from '../screens/customer/CheckoutScreen'
import SettingsScreen from '../screens/customer/SettingsScreen'
import StartScreen from '../screens/StartScreen'
import NavigationScreen from '../screens/NavigationScreen'
import OrderStatusScreen from '../screens/customer/OrderStatusScreen'
import StaffRenderScreen from '../screens/staff/StaffRenderScreen'
import DummyScreen from '../screens/DummyScreen'
import CASLoginScreen from '../screens/CASLoginScreen'
import React from 'react'

const screens = {
  DummyScreen: {
    screen: DummyScreen,
    navigationOptions: {
      title: 'Login',
      headerShown: false,
    },
  },
  StartScreen: {
    screen: StartScreen,
    navigationOptions: {
      title: 'StartScreen',
      headerShown: false,
    },
  },
  NavigationScreen: {
    screen: NavigationScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ButteriesScreen: {
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
      title: 'Status',
      headerLeft: () => <></>,
    },
  },
  StaffRenderScreen: {
    screen: StaffRenderScreen,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
      title: 'Staff',
      headerLeft: () => <></>,
    },
  },
  CASLoginScreen: {
    screen: CASLoginScreen,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
      title: 'Login',
      headerLeft: () => <></>,
    },
  },
}

const MainStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#1f1f1f',
      borderWidth: 0,
      shadowColor: '#222',
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
    headerTitleStyle: { fontFamily: 'HindSiliguri-Bold', fontSize: 20, paddingBottom: 10 },
    headerTintColor: '#FFF',
    headerBackTitleStyle: { fontFamily: 'HindSiliguri-Bold', color: '#FFF', fontSize: 18 },
  },
})

const AppContainer = createAppContainer(MainStack)

export default AppContainer
