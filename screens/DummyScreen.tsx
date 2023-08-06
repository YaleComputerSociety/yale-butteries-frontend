import React, { useEffect, FC } from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { useAppSelector } from '../store/ReduxStore'

// This is the screen after the splash screen, before we decide what screen to put the user on while we wait to see who the user is/connect to the backend
const Dummy: FC<{ navigation: any }> = ({ navigation }) => {
  const { currentUser, isLoading: isLoadingCurrentUser } = useAppSelector((state) => state.currentUser)
  const { currentTransactionHistory } = useAppSelector((state) => state.transactionHistory)

  useEffect(() => {
    if (!isLoadingCurrentUser) {
      if (currentUser) {
        if (currentUser.permissions === 'customer') {
          if (currentTransactionHistory) {
            navigation.navigate('OrderStatusScreen')
          } else {
            navigation.navigate('ButteriesScreen')
          }
        } else if (currentUser.permissions === 'staff') {
          navigation.navigate('StaffRenderScreen')
        }
      } else {
        navigation.navigate('StartScreen')
      }
    }
  }, [isLoadingCurrentUser])

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

Dummy['navigationOptions'] = () => {
  return {
    gestureEnabled: false,
  }
}

export default Dummy
