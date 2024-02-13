import type { FC } from 'react'
import React, { useEffect } from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { useAppSelector } from '../store/ReduxStore'
import type { MainStackScreenProps } from '../utils/types'
import { useIsFocused } from '@react-navigation/native'

// This is the screen after the splash screen, before we decide what screen to put the user on while we wait to see who the user is/connect to the backend
const Dummy: FC<MainStackScreenProps<'DummyScreen'>> = ({ navigation }) => {
  const { currentUser, isLoading: isLoadingCurrentUser } = useAppSelector((state) => state.currentUser)
  const { currentOrder } = useAppSelector((state) => state.orders)
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused && !isLoadingCurrentUser) {
      if (currentUser != null) {
        if (currentUser.role === 'CUSTOMER') {
          if (currentOrder != null) {
            navigation.navigate('OrderStatusScreen')
          } else {
            navigation.navigate('ButteriesScreen')
          }
        } else if (currentUser.role === 'STAFF') {
          navigation.navigate('NavigationScreen')
        }
      } else {
        navigation.navigate('StartScreen')
      }
    }
  }, [currentOrder, currentUser, isFocused, isLoadingCurrentUser, navigation])

  return (
    <View style={styles.style1}>
      <Image source={require('../assets/images/splashScreen.png')} style={styles.logo} />
    </View>
  )
}

const styles = StyleSheet.create({
  style1: {
    height: '100%',
    width: '100%',
    backgroundColor: '#121212',
  },
  logo: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
  },
})

export default Dummy
