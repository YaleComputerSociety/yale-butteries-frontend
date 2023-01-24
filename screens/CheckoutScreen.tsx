/* eslint-disable import/no-unresolved */
import * as React from 'react'
import { Text, View, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native'
import { checkout } from '../styles/CheckoutStyles'
import { useAppDispatch, useAppSelector } from '../store/TypedHooks'
import { loading } from '../styles/GlobalStyles'
import CheckoutItem from '../components/CheckoutItem'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { getPriceFromOrderItems } from '../Functions'
import { StripeProvider, useStripe } from '@stripe/stripe-react-native'
import { removeOrderItem, OrderItem } from '../store/slices/OrderCart'

const CheckoutScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { orderItems, isLoading: isLoadingOrderCart } = useAppSelector((state) => state.orderCart)
  // const stripe = useStripe()
  // const makePayment = async (name: string, amount: number) => {
  //   try {
  //     // sending request
  //     const response = await fetch('http://localhost:3000/api/payments/paymentIntent', {
  //       method: 'POST',
  //       body: JSON.stringify(obj),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     const data = await response.json()
  //     if (!response.ok) return Alert.alert(data.message)
  //     const clientSecret = data.clientSecret
  //     const initSheet = await stripe.initPaymentSheet({
  //       paymentIntentClientSecret: clientSecret,
  //       merchantDisplayName: 'BonY',
  //     })
  //     if (initSheet.error) return Alert.alert(initSheet.error.message)
  //     const presentSheet = await stripe.presentPaymentSheet()
  //     if (presentSheet.error) return Alert.alert(presentSheet.error.message)
  //     Alert.alert('Payment complete, thank you!')
  //     navigation.navigate('OrderStatusScreen')
  //   } catch (err) {
  //     console.error(err)
  //     Alert.alert('Something went wrong, try again later!')
  //   }
  // }

  const dispatch = useAppDispatch()

  const removeOrder = (newItem: OrderItem) => {
    dispatch(removeOrderItem(orderItems.find((item) => item.orderItem.id == newItem.orderItem.id)))
  }

  return (
    <View style={checkout.wrapper}>
      {isLoadingOrderCart ? (
        <View style={loading.container}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <StripeProvider publishableKey="pk_test_51KktoIEL7XDhq084xLTTSGjXxq0QvtgZjrO2KEsvCljPzyxLQBHtglGAztvY58WNDOeSxNconUi9svfk6Eyqdnig00pEpQCANG">
          <View style={{ flex: 1 }}>
            <View style={checkout.upperContainer}>
              <View style={checkout.header}>
                <Text style={checkout.totalText}>Order Summary:</Text>
              </View>
              <ScrollView style={checkout.orderList}>
                {orderItems.map((checkoutItem, index) => (
                  <CheckoutItem decUpdate={removeOrder} checkoutItem={checkoutItem} key={index} />
                ))}
              </ScrollView>
              <View style={checkout.footer}>
                <Text style={checkout.totalText}>Total: {getPriceFromOrderItems(orderItems)}</Text>
              </View>
            </View>
            <View style={checkout.lowerContainer}>
              <Pressable
                disabled={orderItems.length < 1 ? true : false}
                style={({ pressed }) => [
                  { backgroundColor: pressed ? '#222' : '#333', opacity: orderItems.length < 1 ? 0.7 : 1 },
                  checkout.checkoutButton,
                ]}
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

CheckoutScreen.navigationOptions = (navData) => {
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
