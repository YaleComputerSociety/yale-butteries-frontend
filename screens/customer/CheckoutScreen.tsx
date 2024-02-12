import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, ActivityIndicator, Alert } from 'react-native'
import { checkout } from '../../styles/CheckoutStyles'
import { useAppSelector, useAppDispatch } from '../../store/ReduxStore'
import { loading } from '../../styles/GlobalStyles'
import CheckoutItem from '../../components/customer/CheckoutItem'
import * as Device from 'expo-device'
import { priceToText } from '../../utils/functions'
import { StripeProvider } from '@stripe/stripe-react-native'
import { setOrder } from '../../store/slices/Order'
import { removeOrderItem } from '../../store/slices/OrderCart'
import { baseUrl, isPaymentsEnabled, stripePK } from '../../utils/constants'
import * as Haptics from 'expo-haptics'
import * as Notifications from 'expo-notifications'
import { FlatList } from 'react-native-gesture-handler'
import type { MainStackScreenProps, NewOrderItem, OrderItem } from '../../utils/types'
import { GoBackHeader } from '../../routes/mainStackNavigator'
import { useStripeCheckout } from '../../utils/stripe'

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
        { text: "Yes, I'm Sure", onPress: makePayment },
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

  const makePayment = async (): Promise<void> => {
    try {
      if (isPaymentsEnabled) {
        const paymentIntent = await showPaymentSheet()

        // user cancelled or there was an error
        // if (!paymentIntent) {
        //   setGoBackDisabled(false)
        //   return
        // }
      }

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

      const order = await newOrder.json()
      if (newOrder.status == 400) throw order

      dispatch(setOrder(order))

      Alert.alert('Order sent, thank you!')
      setGoBackDisabled(false)

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
      {isOrderCartLoading ? (
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

export default CheckoutScreen
