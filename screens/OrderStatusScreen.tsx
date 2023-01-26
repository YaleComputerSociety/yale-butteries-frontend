import Ionicon from 'react-native-vector-icons/Ionicons'
import React, { FC, useEffect, useState } from 'react'
import { View, ScrollView, ActivityIndicator, Text, Pressable } from 'react-native'
import * as Haptics from 'expo-haptics'
import StatusItem from '../components/StatusCard'
import { useAppDispatch, useAppSelector } from '../store/TypedHooks'
import { updateTransactionHistory } from '../store/slices/TransactionHistory'

const OrderStatusScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const { isLoading: isLoadingTransactionHistory, currentTransactionHistory } = useAppSelector(
    (state) => state.transactionHistory
  )

  const fetchTransaction = async () => {
    try {
      const currentTransaction = await fetch('http://localhost:3000/api/transactions/' + currentTransactionHistory.id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const response = await currentTransaction.json()
      console.log(response)
      if (response.status == 400) throw response
      dispatch(updateTransactionHistory(response))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTransaction().catch(console.log)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  //   return () => clearInterval(interval)
  // }, [])

  //   const orderStatus = 1
  //   const orderStatusText = ['Your order is in the queue', 'Your order is being prepared', 'Your order is ready!']

  const status = currentTransactionHistory.inProgress
  console.log(currentTransactionHistory.transactionItems)
  //need to check if the items are loadinggg before render
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
          <Text
            onPress={() => fetchTransaction()}
            style={{ color: status == 'true' ? 'yellow' : 'white', fontFamily: 'HindSiliguri-Bold' }}
          >
            {' '}
            {status}{' '}
          </Text>
        </Text>
      </View>
      <View style={{ backgroundColor: '#333', width: '90%', height: '60%', borderRadius: 18, marginBottom: 25 }}>
        {currentTransactionHistory.transactionItems.map((transactionItem) => (
          <StatusItem name={transactionItem.menuItemId} status={transactionItem.orderStatus} />
        ))}
      </View>
      <View style={{ backgroundColor: '#32CD32', width: '90%', height: '1.75%', borderRadius: 18 }}></View>
    </View>
  )
}

export default OrderStatusScreen
