import React, { useEffect, FC } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { View } from 'react-native'
import { useAppSelector } from '../store/TypedHooks'

// This is the screen after the splash screen, before we decide what screen to put the user on while we wait to see who the user is/connect to the backend
const Dummy: FC<{ navigation: any }> = ({ navigation }) => {
  const { currentUser } = useAppSelector((state) => state.currentUser)
  const { currentTransactionHistory } = useAppSelector((state) => state.transactionHistory)

  useEffect(() => {
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
  }, [])

  return (
    <LinearGradient colors={['#4E65FF', '#0CBABA']} locations={[0, 1]}>
      <View style={{ height: '100%', width: '100%', backgroundColor: 'transparent' }} />
    </LinearGradient>
  )
}

export default Dummy
