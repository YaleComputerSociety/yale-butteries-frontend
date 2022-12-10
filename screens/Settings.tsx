import * as React from 'react'
import { FC } from 'react'
import { View, Text } from 'react-native'

const SettingsScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Settings</Text>
    </View>
  )
}

export default SettingsScreen
