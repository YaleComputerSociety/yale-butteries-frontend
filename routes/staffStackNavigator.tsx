import { AntDesign } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import type { ParamListBase } from '@react-navigation/native'

import OrdersScreen from '../screens/staff/StaffOrdersScreen'
import InventoryScreen from '../screens/staff/InventoryScreen'
import EditItemScreen from '../screens/staff/EditItemScreen'
import CreateItemScreen from '../screens/staff/CreateItemScreen'
import SettingsScreen from '../screens/staff/StaffSettingsScreen'
import AnalyticsScreen from '../screens/staff/StaffAnalyticsScreen'
import { useAppSelector } from '../store/ReduxStore'

export interface StaffStackParamList extends ParamListBase {
  Orders: undefined
  Inventory: InventoryParamList
  Analytics: undefined
  Settings: undefined
}

interface InventoryParamList extends ParamListBase {
  InventoryScreen: undefined
  Edit: undefined
  Create: undefined
}

const Tab = createBottomTabNavigator<StaffStackParamList>()
const InventoryStack = createStackNavigator<InventoryParamList>()

const AntDesignBarIcon = (props: {
  name: React.ComponentProps<typeof AntDesign>['name']
  color: string
}): JSX.Element => {
  return <AntDesign size={28} style={styles.tabIcon} {...props} />
}

const StaffStackNavigator: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.currentUser)
  if (currentUser == null) return <></>

  const colleges = [
    'Berkeley',
    'Branford',
    'Davenport',
    'Franklin',
    'Hopper',
    'JE',
    'Morse',
    'Murray',
    'Pierson',
    'Saybrook',
    'Silliman',
    'Stiles',
    'TD',
    'Trumbull',
  ]
  return (
    <Tab.Navigator
      screenOptions={{
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
        headerTintColor: '#FFF',
      }}
    >
      <Tab.Screen
        name={`${colleges[currentUser.collegeId - 1]} Orders`}
        component={OrdersScreen}
        options={() => ({
          // these warnings need to be fixed
          tabBarIcon: ({ color }) => <AntDesignBarIcon name="shoppingcart" color={color} />,
        })}
      />
      <Tab.Screen
        name="Inventory"
        component={InventoryNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesignBarIcon name="table" color={color} />,
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesignBarIcon name="areachart" color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesignBarIcon name="setting" color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

const InventoryNavigator = (): JSX.Element => {
  return (
    <InventoryStack.Navigator>
      <InventoryStack.Screen name="InventoryScreen" component={InventoryScreen} options={{ headerShown: false }} />
      <InventoryStack.Screen name="Edit" component={EditItemScreen} />
      <InventoryStack.Screen name="Create" component={CreateItemScreen} />
    </InventoryStack.Navigator>
  )
}

const styles = StyleSheet.create({
  tabIcon: { marginBottom: -5 },
})

export default StaffStackNavigator
