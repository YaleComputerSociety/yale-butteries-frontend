import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { useNavigation } from '@react-navigation/native';
import Home from '../screens/HomeScreen'
import ButteryScreen from '../screens/MenuScreen'
import CheckoutScreen from '../screens/CheckoutScreen'
import SettingsScreen from '../screens/SettingsScreen'
import * as React from 'react'
import { View, ScrollView, StyleSheet, TouchableOpacity, Image} from 'react-native'

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    },

  },

  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
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
    headerStyle: { backgroundColor: '#00b2db' },
    headerTitleStyle: { fontFamily: 'HindSiliguri-Bolder', fontSize: 20 },
    headerTintColor: '#FFF',
    headerBackTitleStyle: { fontFamily: 'HindSiliguri-Bolder', color: '#FFF', fontSize: 20 },
    headerRight: () => (
      <TouchableOpacity onPress={() => console.log("to Settings Screen")}> 
          <Image
            source={require('../assets/images/SettingsIcon.png')}
            style={styles.button}
          />
      </TouchableOpacity>
    )
  },
})


const styles = StyleSheet.create({
  button: {
    width: 35,
    height: 35,
    left: '-20%',
    //bottom: '100%',
    //backgroundColor: 'blue',
  },
});

export default createAppContainer(HomeStack)
