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
  const [loading, setLoading] = useState(false)

  const { orderItems, isLoading: isLoadingOrderCart } = useAppSelector((state) => state.orderCart)
  const stripe = useStripe()
  const makePayment = async (name: string, amount: number) => {
    try {
      // sending request
      const obj = { netid: name, price: amount }
      const response = await fetch('http://localhost:3000/api/payments/paymentIntent', {
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

      // make transaction history and send to backend HERE

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
                onPress={() => makePayment('khy6', navigation.getParam('priceTotal'))}
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
