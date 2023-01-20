import * as React from 'react'
import { FC } from 'react'
import { View, Text } from 'react-native'
import { settings } from '../styles/SettingsStyles'

const SettingsScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={settings.outerContainer}>
      <Text>Settings</Text>
    </View>
  )
}

export default SettingsScreen
