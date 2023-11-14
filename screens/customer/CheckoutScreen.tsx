import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Pressable, ActivityIndicator, Alert, Platform } from 'react-native'
import { checkout } from '../../styles/CheckoutStyles'
import { useAppSelector, useAppDispatch } from '../../store/ReduxStore'
import { loading } from '../../styles/GlobalStyles'
import CheckoutItem from '../../components/customer/CheckoutItem'
import * as Device from 'expo-device'
import { priceToText, returnCollegeName } from '../../Functions'
import {
  StripeProvider,
  useStripe,
  PlatformPayButton,
  isPlatformPaySupported,
  PlatformPay,
} from '@stripe/stripe-react-native'
import { setTransactionHistoryState } from '../../store/slices/TransactionHistory'
import { removeOrderItem, OrderItem } from '../../store/slices/OrderCart'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { baseUrl } from '../../utils/utils'
import * as Haptics from 'expo-haptics'
import * as Notifications from 'expo-notifications'
import { stripePK } from '../../utils/utils'
import { FlatList } from 'react-native-gesture-handler'

const CheckoutScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const {
    orderItems,
    isLoading: isLoadingOrderCart,
    college: collegeOrderCart,
    price,
  } = useAppSelector((state) => state.orderCart)
  const { currentUser } = useAppSelector((state) => state.currentUser)
  const dispatch = useAppDispatch()

  const [isDisabled, setDisabled] = useState(orderItems.length < 1)

  const updateDisabled = (b: boolean) => {
    navigation.setParams({
      disabled: b,
    })
    setDisabled(b)
  }

  const [isApplePaySupported, setIsApplePaySupported] = useState(false)

  useEffect(() => {
    ;(async function () {
      setIsApplePaySupported(await isPlatformPaySupported())
    })()
  }, [isPlatformPaySupported])

  const customAppearance = {
    colors: {
      background: '#1f1f1f',
      componentBackground: '#383838',
      componentBorder: '#383838',
      primaryText: '#ffffff',
      secondaryText: '#ffffff',
      componentText: '#ffffff',
      placeholderText: '#73757b',
    },
  }

  const stripe = useStripe()

  const showPaymentSheet = async (): Promise<any> => {
    console.log(price)
    // return { id: 'temp' } // uncomment this line out to skip the credit card entry screen
    if (price > 2000) {
      Alert.alert('Your current total is over $20, please remove some items from your cart.')
      return null
    }

    const obj = { userId: currentUser.id, price: price, items: orderItems, college: collegeOrderCart }
    console.log('hello3')
    const response = await fetch(baseUrl + 'api/payments/paymentIntent', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 400) {
      if (orderItems.length == 0) {
        Alert.alert('There are no items in your cart! Add items to complete your order')
      } else {
        Alert.alert('Sorry, an item that you ordered ran out of stock! please refresh the menu page')
      }
      return null
    }
    const data = await response.json()
    if (!response.ok) return Alert.alert(data.message)
    const clientSecret = data.paymentIntent.client_secret
    const initSheet = await stripe.initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Yale Butteries',
      appearance: customAppearance,
      applePay: isApplePaySupported
        ? {
            merchantCountryCode: 'US',
          }
        : null,
    })
    if (initSheet.error) return Alert.alert(initSheet.error.message)
    const presentSheet = await stripe.presentPaymentSheet()
    if (presentSheet.error) return Alert.alert(presentSheet.error.message)
    return data.paymentIntent
  }

  const safetyCheck = () => {
    Alert.alert(
      'Are you sure you would like to place this order?',
      'This action cannot be undone',
      [
        { text: "Yes, I'm Sure", onPress: makePayment },
        {
          text: 'Cancel',
          onPress: () => {
            updateDisabled(false)
            return
          },
        },
      ],
      {
        cancelable: true,
      }
    )
  }

  const makePayment = async () => {
    try {
      // const paymentIntent = await showPaymentSheet()

      // user cancelled or there was an error
      // if (!paymentIntent) {
      //   updateDisabled(false)
      //   return
      // }

      interface tempItem {
        itemCost: number
        orderStatus: string
        menuItemId: number
      }
      console.log('hello1')

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
          userId: currentUser.id,
          college: collegeOrderCart,
          paymentIntentId: 'no payment', //currently not accepting payments
          transactionItems: transaction_items,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const uploadTransactionResponse = await uploadTransaction.json()
      if (uploadTransaction.status == 400) throw uploadTransactionResponse
      // console.log('transaction created: ', uploadTransactionResponse.id)
      dispatch(setTransactionHistoryState(uploadTransactionResponse))

      Alert.alert('Order placed! Thank you.')
      updateDisabled(false)

      // console.log(push)

      let token = ''

      if (Device.isDevice) {
        token = (await Notifications.getDevicePushTokenAsync()).data
      } else {
        console.log('not a device')
      }

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
      Alert.alert('Something went wrong, check your internet connection')
      updateDisabled(false)
    }
  }

  const removeOrder = (newItem: OrderItem) => {
    const item = orderItems.find((item) => item.index == newItem.index)
    //problem is they all have the same id
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
        <StripeProvider publishableKey={stripePK} merchantIdentifier="merchant.com.yalebutteries">
          <View style={{ flex: 1 }}>
            <View style={checkout.upperContainer}>
              <View style={checkout.header}>
                <Text style={checkout.totalText}>Order Summary:</Text>
              </View>
              <FlatList
                data={orderItems}
                renderItem={(item) => {
                  return <CheckoutItem decUpdate={removeOrder} checkoutItem={item.item} isDisabled={isDisabled} />
                }}
                keyExtractor={(item) => item.index.toString()}
              />
              <View style={checkout.footer}>
                <Text style={checkout.totalText}>Total: {priceToText(price)}</Text>
              </View>
            </View>
            <View style={checkout.foot}>
              <Pressable
                disabled={isDisabled}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#383838' : '#1f1f1f',
                    opacity: orderItems.length < 1 || pressed ? 0.7 : 1,
                  },
                  checkout.checkoutButton,
                ]}
                onPress={() => {
                  updateDisabled(true)
                  safetyCheck()
                }}
              >
                <Text style={checkout.checkoutText}>Complete Order</Text>
                {/* <Text style={checkout.paymentInformation}>
                  Because we are in beta, we will not save your card information
                </Text> */}
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
      backgroundColor: returnCollegeName(collegeName)[1],
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
