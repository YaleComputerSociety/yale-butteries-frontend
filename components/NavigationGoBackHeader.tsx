import type { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import type { MainStackParamList } from '../routes/mainStackNavigator'

export const GoBackHeader: React.FC = () => {
  const navigation: StackNavigationProp<MainStackParamList> = useNavigation()
  return (
    <Ionicons
      name="chevron-back"
      size={30}
      color="#fff"
      onPress={() => {
        navigation.goBack()
      }}
      style={styles.goBackHeader}
    />
  )
}

const styles = StyleSheet.create({
  goBackHeader: { paddingLeft: 10 },
})
