import React, { FC, useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, Pressable, Alert } from 'react-native'
import StatusItem from '../../components/customer/StatusCard'
import { useAppDispatch, useAppSelector } from '../../store/ReduxStore'
import { setOrderState } from '../../store/slices/Order'
import ProgressBar from 'react-native-progress/Bar'
import { baseUrl } from '../../utils/utils'
import * as Haptics from 'expo-haptics'
import { TransactionItem } from '../../store/slices/OrderItem'
import { NavigationActions, StackActions } from 'react-navigation'
import { useIsFocused } from '@react-navigation/native'

const OrderStatusScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()

  const [percentage, setPercentage] = useState(0)
  const [connection, setConnection] = useState(true)
  const { currentOrder: currentTransactionHistory } = useAppSelector((state) => state.transactionHistory)
  const { menuItems } = useAppSelector((state) => state.menuItems)

  const { currentUser } = useAppSelector((state) => state.currentUser)
  const [name] = useState(currentUser.name)

  // every 5 seconds, fetchTransaction
  useEffect(() => {
    fetchTransaction().catch(console.log)

    const intervalId = setInterval(async () => {
      fetchTransaction().catch(console.log)
      if (percentage == 1) {
        clearInterval(intervalId)
      }
    }, 5000)
    return () => clearInterval(intervalId)
  }, [percentage])

  useEffect(() => {
    setPercentage(0)
  }, [isFocused])

  // turn ratio of orders completed/cancelled into a percentage
  const getPercentageCompleted = (newTransactionHistory) => {
    const items = newTransactionHistory.transactionItems
    const denom = items.length
    let numerator = 0
    for (let i = 0; i < denom; i++) {
      const item_status = items[i].orderStatus
      if (item_status == 'READY' || item_status == 'CANCELLED') {
        numerator += 1
      }
    }
    setPercentage(numerator / denom)
    return numerator / denom
  }

  // pull from database to update status
  const fetchTransaction = async () => {
    try {
      const currentTransaction = await fetch(baseUrl + 'api/orders/' + currentTransactionHistory.id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const response = await currentTransaction.json()
      if (response.status == 400) throw response
      dispatch(setOrderState(response))
      setConnection(true)
      return getPercentageCompleted(response)
    } catch (e) {
      console.log(e)
      setConnection(false)
    }
  }

  const status = () => {
    const progress = currentTransactionHistory?.inProgress
    if (progress == 'true') {
      return 'In Progress'
    } else if (progress == 'false') {
      return 'Complete!'
    } else {
      return 'Loading...'
    }
  }

  function getNameFromTransactionId(transactionItem: TransactionItem): string {
    if (menuItems) {
      return menuItems.find((element) => element.id == transactionItem.menuItemId).name
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
      <View style={{ height: 30 }}></View>
      <View style={styles.view2}>
        <Text style={styles.text1}>
          Order Status:
          <Text style={{ fontFamily: 'HindSiliguri-Bold' }}> {status()} </Text>
        </Text>
        {!connection && (
          <Text style={styles.connectionError}>
            You aren't connected to the internet. Your status may not be accurate
          </Text>
        )}
      </View>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.outerView}>
        <ScrollView>
          {currentTransactionHistory?.orderItems.map((transactionItem, index) => (
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
          height={15}
          borderRadius={8}
          borderWidth={0}
          unfilledColor={'#1f1f1f'}
        />
        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#32ba32' : '#32CD32', opacity: percentage == 1 ? 1 : 0.6 },
            styles.button,
          ]}
          onPress={() => {
            if (percentage == 1) {
              back()
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            } else {
              Alert.alert('Please wait while we complete your order before returning home!')
            }
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
    backgroundColor: '#1f1f1f',
    width: '90%',
    height: '60%',
    borderRadius: 8,
    marginBottom: 25,
    alignContent: 'center',
    padding: 5,
  },
  name: {
    fontSize: 24,
    color: 'rgba(255,255,255,0.87)',
    fontFamily: 'HindSiliguri-Bold',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  text1: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.87)',
    fontFamily: 'HindSiliguri',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  view2: {
    backgroundColor: '#1f1f1f',
    width: '90%',
    height: 60,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view3: {
    backgroundColor: '#121212',
    flex: 1,
    alignItems: 'center',

    justifyContent: 'center',
  },
  button: {
    width: '60%',
    backgroundColor: '#1eb71e',
    alignSelf: 'center',
    marginTop: 25,
    height: 50,
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'HindSiliguri-Bold',
    color: 'rgba(255,255,255,0.87)',
  },
  connectionError: {
    color: '#d44',
    fontFamily: 'HindSiliguri',
    fontSize: 12,
  },
})
