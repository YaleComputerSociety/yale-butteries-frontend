import { AntDesign } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import OrdersScreen from '../screens/OrdersScreen'
import InventoryScreen from '../screens/InventoryScreen'
import StripeScreen from '../screens/StripeScreen'
import React from 'react'

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

export default ManagerStack
