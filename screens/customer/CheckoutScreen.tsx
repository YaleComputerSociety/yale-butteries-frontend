import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Pressable, ActivityIndicator, Alert, Platform } from 'react-native'
import { checkout } from '../../styles/CheckoutStyles'
import { useAppSelector, useAppDispatch } from '../../store/ReduxStore'
import { loading } from '../../styles/GlobalStyles'
import CheckoutItem from '../../components/customer/CheckoutItem'
import * as Device from 'expo-device'
import { priceToText, returnCollegeName } from '../../utils/functions'
import { StripeProvider, useStripe, isPlatformPaySupported, PlatformPay } from '@stripe/stripe-react-native'
import { setOrder } from '../../store/slices/Order'
import { removeOrderItem } from '../../store/slices/OrderCart'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { baseUrl } from '../../utils/constants'
import * as Haptics from 'expo-haptics'
import * as Notifications from 'expo-notifications'
import { stripePK } from '../../utils/constants'
import { FlatList } from 'react-native-gesture-handler'
import type { NewOrderItem, OrderItem } from '../../utils/types'

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

  useEffect(() => {
    if (orderItems.length < 1) {
      setDisabled(true)
    }
  }, [orderItems.length])
  

  const updateDisabled = (b: boolean) => {
    navigation.setParams({
      disabled: b,
    })
    setDisabled(b)
  }

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
    // return { id: 'temp' } // uncomment this line out to skip the credit card entry screen
    if (price > 2000) {
      Alert.alert('Your current total is over $20, please remove some items from your cart.')
      return null
    }

    // if (currentUser.role === 'dev') {
    //   Alert.alert('You are currently in developer mode. You cannot place an order.')
    //   return
    // }

    const obj = { userId: currentUser.id, price: price, items: orderItems, college: collegeOrderCart }
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
      applePay: {
        merchantCountryCode: 'US',
      },
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

      const newOrderItems: NewOrderItem[] = []
      orderItems.forEach((item) => {
        if (!item.orderItem.id) {
          throw new TypeError("orderItem doesn't have id")
        }
        const newItem: NewOrderItem = {
          price: item.orderItem.price,
          menuItemId: item.orderItem.id,
        }
        newOrderItems.push(newItem)
      })

      // TODO put in reducers
      const newOrder = await fetch(baseUrl + 'api/orders', {
        method: 'POST',
        body: JSON.stringify({
          price: price,
          userId: currentUser.id,
          // collegeId: collegeOrderCart,
          collegeId: currentUser.collegeId,
          orderItems: newOrderItems,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const order = await newOrder.json()
      if (newOrder.status == 400) throw order

      dispatch(setOrder(order))

      Alert.alert('Order sent, thank you!')
      updateDisabled(false)

      let token = ''
      if (Device.isDevice) {
        token = __DEV__
          ? (await Notifications.getExpoPushTokenAsync()).data
          : (await Notifications.getDevicePushTokenAsync()).data
        console.log('token: ', token)
      } else {
        console.log('not a device')
      }

      const subscribeNotification = await fetch(baseUrl + 'api/notifications', {
        method: 'POST',
        body: JSON.stringify({
          orderId: order.id,
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
      Alert.alert(err)
      // Alert.alert('Something went wrong, check your internet connection')
      updateDisabled(false)
    }
  }

  const removeOrder = (newItem: OrderItem) => {
    const item = orderItems.find((item) => item.orderItem.id == newItem.id)
    console.log(orderItems, newItem, item)
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
                  return <CheckoutItem decUpdate={removeOrder} item={item.item} isDisabled={isDisabled} />
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
