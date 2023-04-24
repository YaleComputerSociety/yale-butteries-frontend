import React, { FC, useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, Pressable } from 'react-native'
import StatusItem from '../../components/customer/StatusCard'
import { useAppDispatch, useAppSelector } from '../../store/ReduxStore'
import { setTransactionHistoryState } from '../../store/slices/TransactionHistory'
import ProgressBar from 'react-native-progress/Bar'
import { baseUrl } from '../../utils/utils'
import * as Haptics from 'expo-haptics'
import { TransactionItem } from '../../store/slices/TransactionItems'
import { NavigationActions, StackActions } from 'react-navigation'

const OrderStatusScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const [percentage, setPercentage] = useState(0)
  const { currentTransactionHistory } = useAppSelector((state) => state.transactionHistory)
  const { menuItems } = useAppSelector((state) => state.menuItems)

  // every 5 seconds, fetchTransaction
  useEffect(() => {
    fetchTransaction().catch(console.log)

    const intervalId = setInterval(async () => {
      fetchTransaction().catch(console.log)
      if (percentage == 1) {
        setPercentage(0)
        clearInterval(intervalId)
      }
    }, 5000)
    return () => clearInterval(intervalId)
  }, [percentage])

  // turn ratio of orders completed/cancelled into a percentage
  const getPercentageCompleted = (newTransactionHistory) => {
    const items = newTransactionHistory.transactionItems
    const denom = items.length
    let numerator = 0
    for (let i = 0; i < denom; i++) {
      const item_status = items[i].orderStatus
      if (item_status == 'FINISHED' || item_status == 'CANCELLED') {
        numerator += 1
      }
    }
    setPercentage(numerator / denom)
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
      dispatch(setTransactionHistoryState(response))
      return getPercentageCompleted(response)
    } catch (e) {
      console.log(e)
    }
  }

  const status = () => {
    const progress = currentTransactionHistory?.inProgress
    if (progress == 'true') {
      return 'In Progress'
    } else if (progress == 'false') {
      return 'Done'
    } else {
      return 'Loading...'
    }
  }

  function getNameFromTransactionId(transactionItem: TransactionItem): string {
    if (menuItems) {
      return menuItems.find((element) => element.id == transactionItem.menuItemId).item
    } else {
      return 'Loading...'
    }
  }

  const back = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'ButteriesScreen' })],
    })
    navigation.dispatch(resetAction)
  }

  return (
    <View style={styles.view3}>
      <View style={styles.view2}>
        <Text style={styles.text1}>
          Order Status:
          <Text style={{ fontFamily: 'HindSiliguri-Bold' }}> {status()} </Text>
        </Text>
      </View>
      <View style={styles.outerView}>
        <ScrollView>
          {currentTransactionHistory?.transactionItems.map((transactionItem, index) => (
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
          progress={percentage}
          width={null}
          height={20}
          borderRadius={8}
          borderWidth={0}
          unfilledColor={'#333'}
        />
        <Pressable
          disabled={percentage == 1 ? false : true}
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#32ba32' : '#32CD32', opacity: percentage == 1 ? 1 : 0.6 },
            styles.button,
          ]}
          onPress={() => {
            back()
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }}
        >
          <Text style={styles.buttonText}>Return Home</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default OrderStatusScreen

const styles = StyleSheet.create({
  outerView: {
    backgroundColor: '#333',
    width: '90%',
    height: '60%',
    borderRadius: 8,
    marginBottom: 25,
    padding: 10,
  },
  text1: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'HindSiliguri',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  view2: {
    backgroundColor: '#333',
    width: '90%',
    height: '6%',
    borderRadius: 8,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view3: {
    backgroundColor: '#222',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: '#1eb71e',
    marginTop: 25,
    height: 50,
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'HindSiliguri-Bold',
    color: '#fff',
  },
})
