import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from '../screens/HomeScreen'
import ButteryScreen from '../screens/MenuScreen'
import CheckoutScreen from '../screens/CheckoutScreen'
import SettingsScreen from '../screens/SettingsScreen'
import StartScreen from '../screens/StartScreen'
import NavigationScreen from '../screens/NavigationScreen'

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
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
    },
  },
}

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#4E65FF',
      borderWidth: 0,
      shadowColor: '#111',
      shadowRadius: 200,
    },
    //cardOverlayEnabled: true,
    //cardOverlay: () => <LinearGradient colors={['#2C3E50', '#000']} locations={[0, 1]}></LinearGradient>,
    headerTitleStyle: { fontFamily: 'HindSiliguri-Bold', fontSize: 20, paddingBottom: 10 },
    headerTintColor: '#FFF',
    headerBackTitleStyle: { fontFamily: 'HindSiliguri-Bold', color: '#FFF', fontSize: 18 },
  },
})

export default createAppContainer(HomeStack)
