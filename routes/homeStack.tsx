import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from '../screens/HomeScreen'
import ButteryScreen from '../screens/MenuScreen'
import CheckoutScreen from '../screens/CheckoutScreen'
import SettingsScreen from '../screens/SettingsScreen'
import StartScreen from '../screens/StartScreen'
import NavigationScreen from '../screens/NavigationScreen'
import OrderStatusScreen from '../screens/OrderStatusScreen'
import Ionicon from 'react-native-vector-icons/Ionicons'

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
}

// const HomeStack = createStackNavigator(screens, {
//   defaultNavigationOptions: {
//     headerStyle: { backgroundColor: '#00b2db' },
//     headerTitleStyle: { fontFamily: 'HindSiliguri-Bolder', fontSize: 20 },
//     headerTintColor: '#FFF',
//     headerBackTitleStyle: { fontFamily: 'HindSiliguri-Bolder', color: '#FFF', fontSize: 20 },
//     headerRight: () => (
//       <TouchableOpacity onPress={() => console.log("to Settings Screen")}>
//           <Image
//             source={require('../assets/images/SettingsIcon.png')}
//             style={styles.button}
//           />
//       </TouchableOpacity>
//     )
//   },
// })

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#28a67e',
      borderWidth: 0,
      shadowColor: '#222',
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },
    //cardOverlayEnabled: true,
    headerTitleStyle: { fontFamily: 'HindSiliguri-Bold', fontSize: 20, paddingBottom: 10 },
    headerTintColor: '#FFF',
    headerBackTitleStyle: { fontFamily: 'HindSiliguri-Bold', color: '#FFF', fontSize: 18 },
  },
})

export default createAppContainer(HomeStack)
