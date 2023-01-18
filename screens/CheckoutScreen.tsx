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
import { useEffect, useState } from 'react'

const CheckoutScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(false)

  const { orderItems, isLoading: isLoadingOrderCart } = useAppSelector((state) => state.orderCart)
  const stripe = useStripe()
  const initializePayment = async (name: string) => {
    // try {
    // sending request
    const obj = { netid: name }
    const response = await fetch('http://localhost:3000/api/payments/paymentIntent', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // const data = await response.json()
    // const clientSecret = data.clientSecret
    const { message, setupIntent, ephemeralKey, customer } = await response.json()
    if (!response.ok) return Alert.alert(message)

    const { error } = await stripe.initPaymentSheet({
      merchantDisplayName: 'Buttery App',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      setupIntentClientSecret: setupIntent,
    })
    if (!error) {
      setLoading(true)
    }

    // const initSheet = await stripe.initPaymentSheet({
    //   paymentIntentClientSecret: clientSecret,
    //   merchantDisplayName: 'BonY',
    // })
    // if (initSheet.error) return Alert.alert(initSheet.error.message)

    // const presentSheet = await stripe.presentPaymentSheet()
    //   if (presentSheet.error) return Alert.alert(presentSheet.error.message)
    //   Alert.alert('Payment complete, thank you!')
    // } catch (err) {
    //   console.error(err)
    //   Alert.alert('Something went wrong, try again later')
    // }
  }

  // name pass is temporary
  const openPaymentSheet = async (name: string, amount: number) => {
    const { error } = await stripe.presentPaymentSheet()
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      // send to the backend
      console.log(amount, name)
      Alert.alert('Success', 'Your payment method is successfully set up for future payments!')
    }
  }

  useEffect(() => {
    initializePayment('khy6')
  }, [])

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
                onPress={() => openPaymentSheet('khy6', navigation.getParam('priceTotal'))}
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
