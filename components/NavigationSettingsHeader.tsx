import type { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'

import type { MainStackParamList } from '../routes/mainStackNavigator'

export const SettingsHeader: React.FC = () => {
  const navigation: StackNavigationProp<MainStackParamList> = useNavigation()
  return (
    <Ionicon
      name="settings-sharp"
      size={20}
      color="#fff"
      onPress={() => {
        navigation.navigate('SettingsScreen')
      }}
      style={styles.settingsHeader}
    />
  )
}

const styles = StyleSheet.create({
  settingsHeader: { paddingRight: 20 },
})
