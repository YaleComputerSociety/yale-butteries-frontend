import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from '../screens/HomeScreen'
import ButteryScreen from '../screens/MenuScreen'
import CheckoutScreen from '../screens/CheckoutScreen'
import SettingsScreen from '../screens/SettingsScreen'
import StartScreen from '../screens/StartScreen'
import NavigationScreen from '../screens/NavigationScreen'
import OrderStatusScreen from '../screens/OrderStatusScreen'
import ManagerRenderScreen from '../screens/ManagerRenderScreen'

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

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#4c68fa',
      borderWidth: 0,
      shadowColor: '#222',
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },
    //cardOverlayEnabled: true,
    headerTitleStyle: { fontFamily: 'HindSiliguri-Bold', fontSize: 22, paddingBottom: 5 },
    headerTintColor: '#FFF',
    headerBackTitleStyle: { fontFamily: 'HindSiliguri-Bold', color: '#FFF', fontSize: 18 },
  },
})

const AppContainer = createAppContainer(HomeStack)

export default AppContainer

//ok basically what I need to do is just combine both stacks into the app container, and then when
//you click one of the buttons on the navigation screen, you get redirected (using the containers
//nav functions) to one of the screens
