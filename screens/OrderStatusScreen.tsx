import React, { FC, useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import StatusItem from '../components/StatusCard'
import { useAppDispatch, useAppSelector } from '../store/TypedHooks'
import { updateTransactionHistory } from '../store/slices/TransactionHistory'
import { getNameFromTransactionId } from '../Functions'
import ProgressBar from 'react-native-progress/Bar'
import { baseUrl } from '../utils/utils'

const OrderStatusScreen: FC<{ navigation: any }> = () => {
  const dispatch = useAppDispatch()
  const { currentTransactionHistory } = useAppSelector((state) => state.transactionHistory)

  // turn ratio of orders completed/cancelled into a percentage
  function getPercentageCompleted(transactionHistory) {
    const items = transactionHistory.transactionItems
    const denom = items.length
    let numerator = 0
    for (let i = 0; i < denom; i++) {
      const item_status = items[i].orderStatus
      if (item_status === 'FINISHED' || item_status === 'CANCELLED') {
        numerator += 1
      }
    }
    return numerator / denom
  }

  // pull from database to update status
  const fetchTransaction = async () => {
    try {
      const currentTransaction = await fetch(baseUrl + 'api/transactions/' + currentTransactionHistory.id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const response = await currentTransaction.json()
      if (response.status == 400) throw response
      dispatch(updateTransactionHistory(response))
    } catch (e) {
      console.log(e)
    }
  }

  // every 5 seconds, fetchTransaction
  useEffect(() => {
    fetchTransaction().catch(console.log)
    const interval = setInterval(() => {
      fetchTransaction().catch(console.log)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const status = () => {
    const progress = currentTransactionHistory.inProgress
    if (progress == 'true') {
      return 'In Progress'
    } else if (progress == 'false') {
      return 'Queued'
    } else {
      return 'Cancelled'
    }
  }

  return (
    <View style={styles.style1}>
      <View style={styles.style2}>
        <Text style={styles.style3}>
          Order Status:
          <Text style={{ fontFamily: 'HindSiliguri-Bold' }}> {status()} </Text>
        </Text>
      </View>
      <View style={styles.style4}>
        <ScrollView>
          {currentTransactionHistory.transactionItems.map((transactionItem, index) => (
            <StatusItem
              name={getNameFromTransactionId(transactionItem)}
              status={transactionItem.orderStatus}
              key={index}
            />
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

const styles = StyleSheet.create({
  style1: {
    backgroundColor: '#222',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  style2: {
    backgroundColor: '#333',
    width: '90%',
    height: '6%',
    borderRadius: 8,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  style3: {
    fontSize: 21,
    color: 'white',
    fontFamily: 'HindSiliguri',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  style4: {
    backgroundColor: '#333',
    width: '90%',
    height: '60%',
    borderRadius: 8,
    marginBottom: 25,
    padding: 10,
  },
})

export default OrderStatusScreen
