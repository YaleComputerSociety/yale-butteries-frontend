import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, ActivityIndicator, Alert } from 'react-native'
import * as Device from 'expo-device'
import { StripeProvider } from '@stripe/stripe-react-native'
import * as Haptics from 'expo-haptics'
import * as Notifications from 'expo-notifications'
import { FlatList } from 'react-native-gesture-handler'

import type { MainStackScreenProps, NewOrderItem, Order, OrderItem } from '../../utils/types'
import { checkout } from '../../styles/CheckoutStyles'
import { useAppSelector, useAppDispatch } from '../../store/ReduxStore'
import { loading } from '../../styles/GlobalStyles'
import CheckoutItem from '../../components/customer/CheckoutItem'
import { priceToText } from '../../utils/functions'
import { setOrder } from '../../store/slices/Order'
import { removeOrderItem } from '../../store/slices/OrderCart'
import { baseUrl, isPaymentsEnabled, stripePK } from '../../utils/constants'
import { GoBackHeader } from '../../routes/mainStackNavigator'
import { StripePaymentError, useStripeCheckout } from '../../utils/stripe'

const CheckoutScreen: React.FC<MainStackScreenProps<'CheckoutScreen'>> = ({ navigation }) => {
  const { orderItems, isLoading: isOrderCartLoading, price } = useAppSelector((state) => state.orderCart)
  const { currentUser } = useAppSelector((state) => state.currentUser)
  const dispatch = useAppDispatch()
  const { showPaymentSheet } = useStripeCheckout()

  const [goBackDisabled, setGoBackDisabled] = useState(orderItems.length < 1)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: goBackDisabled ? () => null : () => <GoBackHeader />,
      gestureEnabled: !goBackDisabled,
    })
  }, [goBackDisabled, navigation])

  useEffect(() => {
    if (orderItems.length < 1) {
      setGoBackDisabled(true)
    }
  }, [orderItems.length])

  const safetyCheck = (): void => {
    Alert.alert(
      'Are you sure you would like to place this order?',
      'This action cannot be undone',
      [
        {
          text: "Yes, I'm Sure",
          onPress: () => {
            void submitOrder()
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            setGoBackDisabled(false)
          },
        },
      ],
      {
        cancelable: true,
      },
    )
  }

  const handlePayment = async (): Promise<void> => {
    if (isPaymentsEnabled) {
      try {
        await showPaymentSheet()
      } catch (error) {
        if (error instanceof StripePaymentError) {
          Alert.alert(error.message)
          console.error(error.message)
          setGoBackDisabled(false)
        }
      }
    }
  }

  const submitOrder = async (): Promise<void> => {
    await handlePayment()
    try {
      const newOrderItems: NewOrderItem[] = []
      orderItems.forEach((item) => {
        if (item.orderItem.id == null) {
          throw new TypeError("orderItem doesn't have id")
        }
        const newItem: NewOrderItem = {
          price: item.orderItem.price,
          menuItemId: item.orderItem.id,
        }
        newOrderItems.push(newItem)
      })

      // TODO put in reducers
      // TODO change collegeId to be dynamic
      if (currentUser == null) throw new TypeError('Current user does not exist')
      const newOrder = await fetch(baseUrl + 'api/orders', {
        method: 'POST',
        body: JSON.stringify({
          price,
          userId: currentUser.id,
          // collegeId: collegeOrderCart,
          collegeId: 14,
          orderItems: newOrderItems,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const order: Order = await newOrder.json()
      if (newOrder.status === 400) throw new Error('Error creating new order')

      dispatch(setOrder(order))

      Alert.alert('Order sent, thank you!')
      setGoBackDisabled(false)

      // TODO move push notifications to separate utils or services file
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
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    } catch (err) {
      console.error(err)
      Alert.alert(err as string)
      setGoBackDisabled(false)
    }
  }

  const removeOrder = (newItem: OrderItem): void => {
    const item = orderItems.find((orderCartItem) => orderCartItem.orderItem.id === newItem.id)
    if (item === undefined) {
      throw new TypeError("Couldn't find orderItem to delete")
    }
    dispatch(removeOrderItem(item))
  }

  return (
    <View style={checkout.wrapper}>
      {isOrderCartLoading === true ? (
        <View style={loading.container}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <StripeProvider publishableKey={stripePK} merchantIdentifier="merchant.com.yalebutteries">
          <View style={checkout.outerContainer}>
            <View style={checkout.upperContainer}>
              <View style={checkout.header}>
                <Text style={checkout.totalText}>Order Summary:</Text>
              </View>
              <FlatList
                data={orderItems}
                renderItem={(item) => {
                  return <CheckoutItem decUpdate={removeOrder} item={item.item} isDisabled={goBackDisabled} />
                }}
                keyExtractor={(item) => item.index.toString()}
              />
              <View style={checkout.footer}>
                <Text style={checkout.totalText}>Total: {priceToText(price)}</Text>
              </View>
            </View>
            <View style={checkout.foot}>
              <Pressable
                disabled={goBackDisabled}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#383838' : '#1f1f1f',
                    opacity: orderItems.length < 1 || pressed ? 0.7 : 1,
                  },
                  checkout.checkoutButton,
                ]}
                onPress={() => {
                  setGoBackDisabled(true)
                  safetyCheck()
                }}
              >
                <Text style={checkout.checkoutText}>Complete Order</Text>
                {isPaymentsEnabled && (
                  <Text style={checkout.paymentInformation}>We currently do not save card information</Text>
                )}
              </Pressable>
            </View>
          </View>
        </StripeProvider>
      )}
    </View>
  )
}

export default CheckoutScreen
