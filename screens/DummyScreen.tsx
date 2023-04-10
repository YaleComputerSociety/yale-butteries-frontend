import React, { useEffect, FC } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { View } from 'react-native'
import { useAppSelector } from '../store/TypedHooks'

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
      } else {
        navigation.navigate('OrdersScreen')
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
