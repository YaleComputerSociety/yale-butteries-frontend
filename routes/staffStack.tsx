import { AntDesign } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import OrdersScreen from '../screens/staff/OrdersScreen'
import InventoryScreen from '../screens/staff/InventoryScreen'
import StripeScreen from '../screens/staff/StripeScreen'
import React from 'react'

import EditItemScreen from '../screens/staff/EditItemScreen'
import CreateItemScreen from '../screens/staff/CreateItemScreen'
import { createStackNavigator } from '@react-navigation/stack'

type InventoryParamList = {
  InventoryScreen: undefined
  EditItem: undefined
  CreateItem: undefined
}

const Tab = createBottomTabNavigator()
const InventoryStack = createStackNavigator<InventoryParamList>()

function AntDesignBarIcon(props: { name: React.ComponentProps<typeof AntDesign>['name']; color: string }) {
  return <AntDesign size={28} style={{ marginBottom: -3 }} {...props} />
}

const StaffStack: React.FC = () => {
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
        component={InventoryNavigator}
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

const InventoryNavigator = () => {
  return (
    <InventoryStack.Navigator>
      <InventoryStack.Screen name="InventoryScreen" component={InventoryScreen} options={{ headerShown: false }} />
      <InventoryStack.Screen name="EditItem" component={EditItemScreen} />
      <InventoryStack.Screen name="CreateItem" component={CreateItemScreen} />
    </InventoryStack.Navigator>
  )
}

export default StaffStack
