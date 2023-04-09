import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import ButterySelectionScreen from '../screens/customer/ButteriesScreen'
import MenuScreen from '../screens/customer/MenuScreen'
import CheckoutScreen from '../screens/customer/CheckoutScreen'
import SettingsScreen from '../screens/customer/SettingsScreen'
import StartScreen from '../screens/StartScreen'
import NavigationScreen from '../screens/NavigationScreen'
import StaffLoginScreen from '../screens/StaffLoginScreen'
import OrderStatusScreen from '../screens/customer/OrderStatusScreen'
import StaffRenderScreen from '../screens/staff/StaffRenderScreen'
import React from 'react'

const screens = {
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
  StaffLogin: {
    screen: StaffLoginScreen,
    navigationOptions: {
      title: 'StaffLogin',
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
}

const MainStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#54a1e4',
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
