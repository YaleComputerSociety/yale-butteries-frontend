import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

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
import AboutScreen from '../screens/AboutScreen'
import GuestLoginScreen from '../screens/GuestLoginScreen'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type MainStackParamList = {
  DummyScreen: undefined
  StartScreen: undefined
  NavigationScreen: undefined
  ButteriesScreen: undefined
  SettingsScreen: undefined
  MenuScreen: { collegeName: string }
  CheckoutScreen: undefined
  OrderStatusScreen: undefined
  StaffRenderScreen: undefined
  CASLoginScreen: undefined
  AboutScreen: undefined
  GuestLoginScreen: undefined
}

const MainStack = createStackNavigator<MainStackParamList>()

const AppNavigator: React.FC = () => {
  return (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen name="DummyScreen" component={DummyScreen} />
      <MainStack.Screen name="StartScreen" component={StartScreen} />
      <MainStack.Screen name="NavigationScreen" component={NavigationScreen} />
      <MainStack.Screen name="ButteriesScreen" component={ButterySelectionScreen} />
      <MainStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <MainStack.Screen name="MenuScreen" component={MenuScreen} />
      <MainStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <MainStack.Screen name="OrderStatusScreen" component={OrderStatusScreen} />
      <MainStack.Screen name="StaffRenderScreen" component={StaffRenderScreen} />
      <MainStack.Screen name="CASLoginScreen" component={CASLoginScreen} />
      <MainStack.Screen name="AboutScreen" component={AboutScreen} />
      <MainStack.Screen name="GuestLoginScreen" component={GuestLoginScreen} />
    </MainStack.Navigator>
  )
}

const screenOptions = {
  headerStyle: {
    backgroundColor: '#1f1f1f',
    borderWidth: 0,
    shadowColor: '#222',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  headerTitleStyle: {
    fontFamily: 'HindSiliguri-Bold',
    fontSize: 20,
    paddingBottom: 10,
  },
  headerTintColor: '#FFF',
  headerBackTitleStyle: {
    fontFamily: 'HindSiliguri-Bold',
    color: '#FFF',
    fontSize: 18,
  },
}

export default AppNavigator

// const screens = {
//   DummyScreen: {
//     screen: DummyScreen,
//     navigationOptions: {
//       title: 'Login',
//       headerShown: false,
//     },
//   },
//   StartScreen: {
//     screen: StartScreen,
//     navigationOptions: {
//       title: 'StartScreen',
//       headerShown: false,
//     },
//   },
//   NavigationScreen: {
//     screen: NavigationScreen,
//     navigationOptions: {
//       headerShown: false,
//     },
//   },
//   ButteriesScreen: {
//     screen: ButterySelectionScreen,
//     navigationOptions: {
//       title: 'Butteries',
//     },
//   },
//   SettingsScreen: {
//     screen: SettingsScreen,
//     navigationOptions: {
//       title: 'Settings',
//     },
//   },
//   MenuScreen: {
//     screen: MenuScreen,
//     navigationOptions: {
//       title: 'Menu',
//     },
//   },
//   CheckoutScreen: {
//     screen: CheckoutScreen,
//     navigationOptions: {
//       title: 'Checkout',
//     },
//   },
//   OrderStatusScreen: {
//     screen: OrderStatusScreen,
//     navigationOptions: {
//       headerShown: false,
//       gestureEnabled: false,
//       title: 'Status',
//       headerLeft: () => <></>,
//     },
//   },
//   StaffRenderScreen: {
//     screen: StaffRenderScreen,
//     navigationOptions: {
//       headerShown: false,
//       gestureEnabled: false,
//       title: 'Staff',
//       headerLeft: () => <></>,
//     },
//   },
//   CASLoginScreen: {
//     screen: CASLoginScreen,
//     navigationOptions: {
//       headerShown: false,
//       gestureEnabled: false,
//       title: 'Login',
//       headerLeft: () => <></>,
//     },
//   },
//   AboutScreen: {
//     screen: AboutScreen,
//     navigationOptions: {
//       title: 'About Us',
//     },
//   },
//   GuestLoginScreen: {
//     screen: GuestLoginScreen,
//     navigationOptions: {
//       headerShown: false,
//       title: 'Guest Login',
//     },
//   },
// }
