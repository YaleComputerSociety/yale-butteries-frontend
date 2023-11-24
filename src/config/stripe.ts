// This file obtains and configures the stripe object

import { environment } from '@src/utils/constants'
import Stripe from 'stripe'

function getStripeSecretKey (): string {
  if (environment === 'development') {
    if (process.env.STRIPE_SECRET_KEY_DEV === undefined) {
      throw new Error('Stripe secret key for development is not set')
    }
    return process.env.STRIPE_SECRET_KEY_DEV
  } else {
    if (process.env.STRIPE_SECRET_KEY_PROD === undefined) {
      throw new Error('Stripe secret key for production is not set')
    }
    return process.env.STRIPE_SECRET_KEY_PROD
  }
}

export const stripe = new Stripe(getStripeSecretKey(), { apiVersion: '2020-08-27' })
