import { AntDesign } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import OrdersScreen from '../screens/staff/OrdersScreen'
import InventoryScreen from '../screens/staff/InventoryScreen'
import React from 'react'

import EditItemScreen from '../screens/staff/EditItemScreen'
import CreateItemScreen from '../screens/staff/CreateItemScreen'
import SettingsScreen from '../screens/staff/SettingsScreen'
import AnalyticsScreen from '../screens/staff/AnalyticsScreen'

import { createStackNavigator } from '@react-navigation/stack'

type InventoryParamList = {
  InventoryScreen: undefined
  Edit: undefined
  Create: undefined
}

const Tab = createBottomTabNavigator()
const InventoryStack = createStackNavigator<InventoryParamList>()

function AntDesignBarIcon(props: { name: React.ComponentProps<typeof AntDesign>['name']; color: string }) {
  return <AntDesign size={28} style={{ marginBottom: -3 }} {...props} />
}

const StaffStack: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor: '#1f1f1f',
      },
      headerStyle: {
        backgroundColor: '#1f1f1f',
        borderWidth: 0,
        shadowColor: '#222',
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      headerTitleStyle: { fontFamily: 'HindSiliguri-Bold', fontSize: 20, paddingBottom: 10 },
      headerTintColor: '#FFF'
  }}>
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
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesignBarIcon name="setting" color={color} />,
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesignBarIcon name="areachart" color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

const InventoryNavigator = () => {
  return (
    <InventoryStack.Navigator>
      <InventoryStack.Screen name="InventoryScreen" component={InventoryScreen} options={{ headerShown: false }} />
      <InventoryStack.Screen name="Edit" component={EditItemScreen} />
      <InventoryStack.Screen name="Create" component={CreateItemScreen} />
    </InventoryStack.Navigator>
  )
}

export default StaffStack
