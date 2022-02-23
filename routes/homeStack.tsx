import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from '../screens/home';
import ButteryScreen from "../screens/butteryScreen";
import React from 'react'

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      title : 'Home',
    }
  },

  ButteryScreen: {
    screen: ButteryScreen,
    navigationOptions: {
      title : 'Buttery_Name'
    }
  },
}

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: { backgroundColor : '#00b2db'},
    headerTitleStyle: { fontFamily : 'Roboto' , fontSize: 20},
    headerTintColor: '#FFF',
    headerBackTitleStyle: { fontFamily: 'Roboto' , color: '#FFF', fontSize: 20},
  }
});

export default createAppContainer(HomeStack);