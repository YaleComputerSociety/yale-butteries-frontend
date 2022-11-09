/* eslint-disable import/no-unresolved */
import * as React from 'react'
import { Text, View, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native'
import { checkout } from '../styles/CheckoutStyles'
import { useAppSelector } from '../store/TypedHooks'
import { loading } from '../styles/GlobalStyles'
import CheckoutItem from '../components/CheckoutItem'
import { priceToText } from '../Functions'
import { STRIPE_PK } from '@env'
import { StripeProvider, useStripe } from '@stripe/stripe-react-native'

const CheckoutScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { orderItems, isLoading: isLoadingOrderCart } = useAppSelector((state) => state.orderCart)
  const stripe = useStripe()

  const makePayment = async (name: string) => {
    try {
      // sending request
      const response = await fetch('http://localhost:3000/pay', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (!response.ok) return Alert.alert(data.message)
      const clientSecret = data.clientSecret
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'BonY',
      })
      if (initSheet.error) return Alert.alert(initSheet.error.message)
      const presentSheet = await stripe.presentPaymentSheet()
      if (presentSheet.error) return Alert.alert(presentSheet.error.message)
      Alert.alert('Payment complete, thank you!')
    } catch (err) {
      console.error(err)
      Alert.alert('Something went wrong, try again later!')
    }
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
              <ScrollView style={checkout.orderList}>
                {orderItems.map((checkoutItem, index) => (
                  <CheckoutItem checkoutItem={checkoutItem} key={index} />
                ))}
              </ScrollView>
              <View style={checkout.footer}>
                <Text style={checkout.totalText}>Total: {priceToText(navigation.getParam('priceTotal'))}</Text>
              </View>
            </View>
            <View style={checkout.lowerContainer}>
              <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? '#222' : '#333' }, checkout.checkoutButton]}
                onPress={() => makePayment('bony')}
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

export default CheckoutScreen
