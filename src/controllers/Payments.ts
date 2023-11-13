import { Request, Response } from 'express'
import Stripe from 'stripe'
import { getCollegeFromName } from './Orders'
import prisma from '../prismaClient'

export interface TypedRequestBody<T> extends Request {
  body: T
}

const environment = process.env.NODE_ENV || 'development'

export const stripe = new Stripe(
  environment === 'development' ? process.env.STRIPE_SECRET_KEY_DEV : process.env.STRIPE_SECRET_KEY_PROD,
  {
    apiVersion: '2020-08-27',
  }
)

export async function createPaymentIntent(req: Request, res: Response): Promise<void> {
  try {
    // basic parameter checking
    if (!req.body.price) {
      res.status(400).json({ message: 'Please enter a price' })
      return
    }
    if (!req.body.userId) {
      res.status(400).json({ message: "You aren't logged in. No user found" })
      return
    }

    // check if the customer exists in stripe, their account is created when they first login to CAS
    const customerQuery = await stripe.customers.search({
      query: "metadata['userId']:'" + req.body.userId + "'",
    })

    console.log(customerQuery)
    if (!customerQuery.data[0]?.id) {
      res.status(403).json({
        message:
          "Invalid user: you might have created a user and then ordered too fast, please wait 10 seconds. If that doesn't work, try reloading the app",
      })
      return
    }

    const customer = await stripe.customers.retrieve(customerQuery.data[0].id)
    const price: number = req.body.price

    // verify that backend data matches frontend order:
    // verify all the prices match
    // verify all the items are enabled

    // console.log(req.body.items)

    const college = await getCollegeFromName(req.body.college)

    const backendItems = await prisma.menuItem.findMany({
      where: {
        collegeId: college.id,
        isActive: true,
      },
    })

    let validOrder = true

    req.body.items.forEach((item) => {
      const backendItem = backendItems.find((i) => i.id === item.orderItem.id)
      if (!backendItem || backendItem.price != item.orderItem.price) {
        validOrder = false
      }
    })

    if (!validOrder) {
      res.status(400).json({ message: 'Transaction failed' })
      return
    }

    // card saving; will use later
    // const paymentMethods = await stripe.customers.listPaymentMethods(customer.id, { type: 'card' })
    // console.log(paymentMethods.data[0]?.id)

    // if (paymentMethods.data[0]?.id) {
    //   console.log('customer has PM')
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount: price,
    //     currency: 'usd',
    //     customer: customer.id,
    //     payment_method: paymentMethods.data[0].id,
    //     off_session: true,
    //     confirm: true,
    //   })

    //   const clientSecret = paymentIntent.client_secret
    //   res.json({ message: 'Automatic payment initiated', clientSecret })
    // } else {

    // customer doesn't have a payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: 'USD',
      customer: customer.id,
      // setup_future_usage: 'off_session', for card saving
      payment_method_types: ['card'], // delayed capturing doesn't work for everything and we can get into legal trouble, let's stick with cards (credit & debit) for now
      capture_method: 'manual', // don't charge the user right now, but we'll need to save the paymentIntent's id to charge later.
    })
    res.json({ message: 'Payment initiated', paymentIntent })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
    return
  }
}
