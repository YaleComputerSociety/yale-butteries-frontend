//import { createStackNavigator } from "react-navigation-stack";
//import { createAppContainer } from "react-navigation";
//test
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrdersScreen from '../screens/OrdersScreen';
import React from 'react';

// const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }Khi/y7epyMIpKL35of2e956ocZC6o7v70Y2+s0A7nzc

const Tab = createBottomTabNavigator();

function ManagerStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Orders" component={OrdersScreen}  />
    </Tab.Navigator>
  )
}
// const screens = {
//   OrderScreen: {
//     screen: OrdersScreen,
//     navigationOptions: {
//       title : 'Orders',
//     }
//   },
// }

// const ManagerStack = createStackNavigator(screens, {
//   defaultNavigationOptions: {
//     headerStyle: { backgroundColor : '#00b2db'},
//     headerTitleStyle: { fontFamily : 'HindSiliguri-Bolder' , fontSize: 20},
//     headerTintColor: '#FFF',
//     headerBackTitleStyle: { fontFamily: 'HindSiliguri-Bolder' , color: '#FFF', fontSize: 20},
//   }
// });

export default ManagerStack;