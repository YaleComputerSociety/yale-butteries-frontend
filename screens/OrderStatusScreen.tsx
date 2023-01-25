import Ionicon from 'react-native-vector-icons/Ionicons'
import React, { FC, useEffect, useState } from 'react'
import { View, ScrollView, ActivityIndicator, Text, Pressable } from 'react-native'
import * as Haptics from 'expo-haptics'
import StatusItem from '../components/StatusCard'

const OrderStatusScreen: FC<{ navigation: any }> = ({ navigation }) => {
  // const OrderStatusScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  //   //transactionHistory remains unlinked
  //   //for now: 0 is queued, 1 is in progress, 2 is done
  //   const dispatch = useAppDispatch()
  //   const { transactionHistory, isLoading: isLoadingTransactionHistory } = useAppSelector(
  //     (state) => state.transactionHistory
  //   )

  //   useEffect(() => {
  //     if (transactionHistory == null) {
  //       dispatch(asyncFetchTransactionHistory())
  //     }
  //   })

  //   const orderStatus = 1
  //   const orderStatusText = ['Your order is in the queue', 'Your order is being prepared', 'Your order is ready!']

  const status = 'In Queue'
  return (
    <View
      style={{
        backgroundColor: '#222',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <View
        style={{
          backgroundColor: '#333',
          width: '90%',
          height: '6%',
          borderRadius: 18,
          marginBottom: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 21,
            color: 'white',
            fontFamily: 'HindSiliguri',
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        >
          Order Status:
          <Text style={{ color: status == 'In Queue' ? 'yellow' : 'white', fontFamily: 'HindSiliguri-Bold' }}>
            {' '}
            {status}{' '}
          </Text>
        </Text>
      </View>
      <View style={{ backgroundColor: '#333', width: '90%', height: '60%', borderRadius: 18, marginBottom: 25 }}>
        {/* <StatusItem transactionItem={}> */}
      </View>
      <View style={{ backgroundColor: '#32CD32', width: '90%', height: '1.75%', borderRadius: 18 }}></View>
    </View>
  )
}

export default OrderStatusScreen
