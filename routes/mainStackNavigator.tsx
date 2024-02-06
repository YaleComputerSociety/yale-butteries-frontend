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
export type MainStackParamList = {
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
      <MainStack.Screen name="DummyScreen" component={DummyScreen} options={{ headerShown: false }} />
      <MainStack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <MainStack.Screen name="NavigationScreen" component={NavigationScreen} options={{ headerShown: false }} />
      <MainStack.Screen name="ButteriesScreen" component={ButterySelectionScreen} options={{ title: 'Butteries' }} />
      <MainStack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Settings' }} />
      <MainStack.Screen name="MenuScreen" component={MenuScreen} options={{ title: 'Menu' }} />
      <MainStack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ title: 'Checkout' }} />
      <MainStack.Screen
        name="OrderStatusScreen"
        component={OrderStatusScreen}
        options={{ headerShown: false, gestureEnabled: false, headerLeft: () => null }}
      />
      <MainStack.Screen
        name="StaffRenderScreen"
        component={StaffRenderScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <MainStack.Screen name="CASLoginScreen" component={CASLoginScreen} options={{ headerShown: false }} />
      <MainStack.Screen name="AboutScreen" component={AboutScreen} options={{ title: 'About Us' }} />
      <MainStack.Screen name="GuestLoginScreen" component={GuestLoginScreen} options={{ headerShown: false }} />
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
