import * as React from 'react'
import { Text, View, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native'
import { checkout } from '../styles/CheckoutStyles'
import { useAppSelector, useAppDispatch } from '../store/TypedHooks'
import { loading } from '../styles/GlobalStyles'
import CheckoutItem from '../components/CheckoutItem'
import { priceToText } from '../Functions'
import { StripeProvider, useStripe } from '@stripe/stripe-react-native'
import { setTransactionHistoryState } from '../store/slices/TransactionHistory'
import { removeOrderItem, OrderItem } from '../store/slices/OrderCart'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { baseUrl } from '../utils/utils'

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

  const stripe = useStripe()

  const showPaymentSheet = async (name: string, amount: number) => {
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
  }

  const makePayment = async (name: string, amount: number) => {
    try {
      // comment this line out to skip the credit card entry screen
      // await showPaymentSheet(name, amount)

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
          paymentIntentId: 'a',
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

      navigation.navigate('OrderStatusScreen')
    } catch (err) {
      console.error(err)
      Alert.alert('Something went wrong, try again later!')
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
                  <CheckoutItem decUpdate={removeOrder} checkoutItem={checkoutItem} key={index} />
                ))}
              </ScrollView>
              <View style={checkout.footer}>
                <Text style={checkout.totalText}>Total: {priceToText(price)}</Text>
              </View>
            </View>
            <View style={checkout.lowerContainer}>
              <Pressable
                disabled={orderItems.length < 1 ? true : false}
                style={({ pressed }) => [
                  { backgroundColor: pressed ? '#222' : '#333', opacity: orderItems.length < 1 ? 0.7 : 1 },
                  checkout.checkoutButton,
                ]}
                onPress={() => {
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
  return {
    headerRight: () => (
      <Ionicon
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
