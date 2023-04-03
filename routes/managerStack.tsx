import { AntDesign } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import OrdersScreen from '../screens/OrdersScreen'
import InventoryScreen from '../screens/InventoryScreen'
import StripeScreen from '../screens/StripeScreen'
import React from 'react'

import EditItemScreen from '../screens/EditItemScreen'
import CreateItemScreen from '../screens/CreateItemScreen'
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

const ManagerStack: React.FC = () => {
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

export default ManagerStack
