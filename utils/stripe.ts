// stripe functions, to be used mostly for the checkout screen

import type { Stripe } from 'stripe'
import { useStripe } from '@stripe/stripe-react-native'

import { useAppSelector } from '../store/ReduxStore'

import { baseUrl } from './constants'

// This error type needs some work but it is the errors thrown by showPaymentSheet
export class StripePaymentError extends Error {
  public readonly statusCode: number | undefined
  public readonly stripeErrorCode: string | undefined

  constructor(
    message: string,
    statusCode: number | undefined = undefined,
    stripeErrorCode: string | undefined = undefined,
  ) {
    super(message)
    this.name = 'StripePaymentError'
    this.statusCode = statusCode
    this.stripeErrorCode = stripeErrorCode
  }
}

export const useStripeCheckout = (): { showPaymentSheet: () => Promise<Stripe.PaymentIntent> } => {
  const stripe = useStripe()
  const { currentUser } = useAppSelector((state) => state.currentUser)
  const { orderItems, college: orderCartCollege, price } = useAppSelector((state) => state.orderCart)

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

  const showPaymentSheet = async (): Promise<Stripe.PaymentIntent> => {
    if (price > 2000) {
      throw new StripePaymentError('Your current total is over $20, please remove some items from your cart.')
    }

    // if (currentUser.role === 'dev') {
    //   Alert.alert('You are currently in developer mode. You cannot place an order.')
    //   return
    // }

    if (currentUser == null) throw new StripePaymentError('No current user')
    const obj = { userId: currentUser.id, price, items: orderItems, college: orderCartCollege }
    const response = await fetch(baseUrl + 'api/payments/paymentIntent', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.status === 400) {
      if (orderItems.length === 0) {
        throw new StripePaymentError('There are no items in your cart! Add items to complete your order')
      } else {
        throw new StripePaymentError('Sorry, an item that you ordered ran out of stock! please refresh the menu page')
      }
    }

    const data: { message: string; paymentIntent: Stripe.PaymentIntent } = await response.json()
    if (!response.ok) {
      throw new StripePaymentError(data.message, response.status)
    }

    const clientSecret = data.paymentIntent.client_secret
    if (clientSecret == null) throw new StripePaymentError('No client secret found')
    const initSheet = await stripe.initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Yale Butteries',
      appearance: customAppearance,
      applePay: {
        merchantCountryCode: 'US',
      },
    })
    if (initSheet.error != null) {
      throw new StripePaymentError(initSheet.error.message, undefined, initSheet.error.stripeErrorCode)
    }

    const presentSheet = await stripe.presentPaymentSheet()
    if (presentSheet.error != null) {
      throw new StripePaymentError(presentSheet.error.message)
    }

    return data.paymentIntent
  }

  return { showPaymentSheet }
}
