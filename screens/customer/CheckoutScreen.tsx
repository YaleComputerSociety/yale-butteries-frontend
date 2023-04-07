import React, { useState } from 'react'
import { Text, View, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native'
import { checkout } from '../../styles/CheckoutStyles'
import { useAppSelector, useAppDispatch } from '../../store/TypedHooks'
import { loading } from '../../styles/GlobalStyles'
import CheckoutItem from '../../components/customer/CheckoutItem'
import { priceToText, returnCollegeName } from '../../Functions'
import { StripeProvider, useStripe } from '@stripe/stripe-react-native'
import { setTransactionHistoryState } from '../../store/slices/TransactionHistory'
import { removeOrderItem, OrderItem } from '../../store/slices/OrderCart'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { baseUrl } from '../../utils/utils'
import * as Haptics from 'expo-haptics'
import * as Notifications from 'expo-notifications'

// eslint-disable-next-line import/no-unresolved
import { STRIPE_PK } from '@env'

const CheckoutScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const {
    orderItems,
    isLoading: isLoadingOrderCart,
    college: collegeOrderCart,
    price,
  } = useAppSelector((state) => state.orderCart)
  const dispatch = useAppDispatch()

  const [isDisabled, setDisabled] = useState(orderItems.length < 1)

  const updateDisabled = (b: boolean) => {
    navigation.setParams({
      disabled: b,
    })
    setDisabled(b)
  }

  const stripe = useStripe()

  const showPaymentSheet = async (name: string, amount: number): Promise<any> => {
    // return { id: 'temp' } // uncomment this line out to skip the credit card entry screen

    const obj = { netid: name, price: amount }
    const response = await fetch(baseUrl + 'api/payments/paymentIntent', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (!response.ok) return Alert.alert(data.message)
    const clientSecret = data.paymentIntent.client_secret
    const initSheet = await stripe.initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Yale Butteries',
    })
    if (initSheet.error) return Alert.alert(initSheet.error.message)
    const presentSheet = await stripe.presentPaymentSheet()
    if (presentSheet.error) return Alert.alert(presentSheet.error.message)
    return data.paymentIntent
  }

  const makePayment = async (name: string, amount: number) => {
    try {
      const paymentIntent = await showPaymentSheet(name, amount)

      interface tempItem {
        itemCost: number
        orderStatus: string
        menuItemId: number
      }

      const transaction_items: tempItem[] = []
      orderItems.forEach((item) => {
        if (!item.orderItem.id) {
          throw new TypeError("orderItem doesn't have id")
        }
        const newItem: tempItem = {
          itemCost: item.orderItem.price,
          orderStatus: 'PENDING',
          menuItemId: item.orderItem.id,
        }
        transaction_items.push(newItem)
      })

      const uploadTransaction = await fetch(baseUrl + 'api/transactions', {
        method: 'POST',
        body: JSON.stringify({
          inProgress: 'true',
          price: price,
          netId: name,
          college: collegeOrderCart,
          paymentIntentId: paymentIntent.id,
          transactionItems: transaction_items,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const uploadTransactionResponse = await uploadTransaction.json()
      if (uploadTransaction.status == 400) throw uploadTransactionResponse
      dispatch(setTransactionHistoryState(uploadTransactionResponse))

      Alert.alert('Payment complete, thank you!')
      updateDisabled(false)

      //send push notification
      const token = (await Notifications.getExpoPushTokenAsync()).data
      const subscribeNotification = await fetch(baseUrl + 'api/notifs', {
        method: 'POST',
        body: JSON.stringify({
          transactionId: uploadTransactionResponse.id,
          pushToken: token,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const subscribeNotificationResponse = await subscribeNotification.json()
      console.log(subscribeNotificationResponse)
      navigation.navigate('OrderStatusScreen')
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    } catch (err) {
      console.error(err)
      Alert.alert('Something went wrong, try again later!')
      updateDisabled(false)
    }
  }

  const removeOrder = (newItem: OrderItem) => {
    const item = orderItems.find((item) => item.orderItem.id == newItem.orderItem.id)
    if (item === undefined) {
      throw new TypeError("Couldn't find orderItem to delete")
    }
    dispatch(removeOrderItem(item))
  }

  return (
    <View style={checkout.wrapper}>
      {isLoadingOrderCart ? (
        <View style={loading.container}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <StripeProvider publishableKey={STRIPE_PK}>
          <View style={{ flex: 1 }}>
            <View style={checkout.upperContainer}>
              <View style={checkout.header}>
                <Text style={checkout.totalText}>Order Summary:</Text>
              </View>
              <ScrollView style={checkout.orderList} showsVerticalScrollIndicator={false}>
                {orderItems.map((checkoutItem, index) => (
                  <CheckoutItem
                    decUpdate={removeOrder}
                    checkoutItem={checkoutItem}
                    isDisabled={isDisabled}
                    key={index}
                  />
                ))}
              </ScrollView>
              <View style={checkout.footer}>
                <Text style={checkout.totalText}>Total: {priceToText(price)}</Text>
              </View>
            </View>
            <View style={checkout.lowerContainer}>
              <Pressable
                disabled={isDisabled}
                style={({ pressed }) => [
                  { backgroundColor: pressed ? '#222' : '#333', opacity: orderItems.length < 1 ? 0.7 : 1 },
                  checkout.checkoutButton,
                ]}
                onPress={() => {
                  updateDisabled(true)
                  makePayment('awg32', price)
                }}
              >
                <Text style={checkout.checkoutText}>Complete Order</Text>
              </Pressable>
            </View>
          </View>
        </StripeProvider>
      )}
    </View>
  )
}

CheckoutScreen['navigationOptions'] = (navData) => {
  const collegeName = navData.navigation.getParam('collegeName')
  const disabled = navData.navigation.getParam('disabled') || false

  return {
    gestureEnabled: !disabled,
    headerStyle: {
      backgroundColor: disabled ? returnCollegeName(collegeName)[1] : 'green',
      borderWidth: 0,
      shadowColor: '#111',
      shadowRadius: 200,
    },
    headerLeft: () => (
      <Ionicon
        disabled={disabled}
        name="chevron-back"
        size={30}
        color="#fff"
        onPress={() => {
          navData.navigation.navigate('MenuScreen')
        }}
        style={{ paddingLeft: 15 }}
      />
    ),
    headerRight: () => (
      <Ionicon
        disabled={disabled}
        name="settings-sharp"
        size={20}
        color="#fff"
        onPress={() => {
          navData.navigation.navigate('SettingsScreen')
        }}
        style={{ paddingRight: 20 }}
      />
    ),
  }
}

export default CheckoutScreen
