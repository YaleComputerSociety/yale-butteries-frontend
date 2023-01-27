import React, { FC, useEffect, useRef, useState } from 'react'
import { View, ScrollView, Text, Pressable, Animated } from 'react-native'
import StatusItem from '../components/StatusCard'
import { useAppDispatch, useAppSelector } from '../store/TypedHooks'
import { updateTransactionHistory } from '../store/slices/TransactionHistory'
import { getNameFromTransactionId } from '../Functions'
import ProgressBar from 'react-native-progress/Bar'

const OrderStatusScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const { isLoading: isLoadingTransactionHistory, currentTransactionHistory } = useAppSelector(
    (state) => state.transactionHistory
  )

  function getPercentageCompleted(transactionHistory) {
    const items = transactionHistory.transactionItems
    const denom = items.length
    let numerator = 0
    for (let i = 0; i < denom; i++) {
      const item_status = items[i].orderStatus
      if (item_status === 'FINISHED') {
        numerator += 1
      } else if (item_status === 'CANCELLED') {
        numerator += 1
      }
    }
    console.log(numerator / denom)
    return numerator / denom
  }

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
    //updateTransactionProgress(transactionProgress + getPercentageCompleted(currentTransactionHistory))
    return () => clearInterval(interval)
  }, [])

  //   return () => clearInterval(interval)
  // }, [])

  //   const orderStatus = 1
  //   const orderStatusText = ['Your order is in the queue', 'Your order is being prepared', 'Your order is ready!']

  const status = () => {
    const progress = currentTransactionHistory.inProgress
    if (progress == 'true') {
      return 'In Progress'
    } else if (progress == 'false') {
      return 'Queued'
    } else {
      //cancelled
      return 'Cancelled'
    }
  }
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
          borderRadius: 8,
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
          <Text style={{ fontFamily: 'HindSiliguri-Bold' }}> {status()} </Text>
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#333',
          width: '90%',
          height: '60%',
          borderRadius: 8,
          marginBottom: 25,
          padding: 10,
        }}
      >
        <ScrollView>
          {currentTransactionHistory.transactionItems.map((transactionItem) => (
            <StatusItem name={getNameFromTransactionId(transactionItem)} status={transactionItem.orderStatus} />
          ))}
        </ScrollView>
      </View>
      <View style={{ width: '90%' }}>
        <ProgressBar
          animated={true}
          progress={getPercentageCompleted(currentTransactionHistory)}
          width={null}
          height={20}
          borderRadius={8}
          borderWidth={0}
          unfilledColor={'#333'}
        />
      </View>
    </View>
  )
}

export default OrderStatusScreen
