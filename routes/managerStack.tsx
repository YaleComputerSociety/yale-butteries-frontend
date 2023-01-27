//import { createStackNavigator } from "react-navigation-stack";
//import { createAppContainer } from "react-navigation";
//test

import { AntDesign } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import OrdersScreen from '../screens/OrdersScreen'
import InventoryScreen from '../screens/InventoryScreen'
import StripeScreen from '../screens/StripeScreen'
import React from 'react'

// const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }Khi/y7epyMIpKL35of2e956ocZC6o7v70Y2+s0A7nzc

const Tab = createBottomTabNavigator()

function AntDesignBarIcon(props: { name: React.ComponentProps<typeof AntDesign>['name']; color: string }) {
  return <AntDesign size={28} style={{ marginBottom: -3 }} {...props} />
}

function ManagerStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesignBarIcon name="shoppingcart" color={color} />,
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesignBarIcon name="table" color={color} />,
        }}
      />
      <Tab.Screen
        name="Stripe"
        component={StripeScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesignBarIcon name="wallet" color={color} />,
        }}
      />
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

export default ManagerStack
