import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from '../screens/HomeScreen';
import ButteryScreen from "../screens/MenuScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import OrderStatusScreen from "../screens/OrderStatusScreen";

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
      title : 'Menu'
    }
  },

  CheckoutScreen: {
    screen: CheckoutScreen,
    navigationOptions: {
      title: 'Checkout'
    }
  },

	OrderStatusScreen: {
    screen: OrderStatusScreen,
    navigationOptions: {
      title: 'Order Status'
    }
  }
  
}

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: { backgroundColor : '#00b2db'},
    headerTitleStyle: { fontFamily : 'HindSiliguri-Bolder' , fontSize: 20},
    headerTintColor: '#FFF',
    headerBackTitleStyle: { fontFamily: 'HindSiliguri-Bolder' , color: '#FFF', fontSize: 20},
  }
});

export default createAppContainer(HomeStack);