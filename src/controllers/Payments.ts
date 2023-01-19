import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export interface TypedRequestBody<T> extends Request {
  body: T
}

export async function testSI(req: Request, res: Response): Promise<void> {
  try {
    const paymentMethods = await stripe.customers.listPaymentMethods('cus_Mo7aF7zb4UnOTO', { type: 'card' })
    console.log(paymentMethods)
    console.log(paymentMethods.data[0].id)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
      customer: 'cus_Mo7aF7zb4UnOTO',
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
    })
  } catch (err) {
    // Error code will be authentication_required if authentication is needed
    console.log('Error code is: ', err.code)
    const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id)
    console.log('PI retrieved: ', paymentIntentRetrieved.id)
  }
}

export async function createPaymentIntent(req: Request, res: Response): Promise<void> {
  try {
    // testing
    // const newman = await stripe.customers.create({
    //   email: 'somedummy@yale.edu',
    //   metadata: { netid: 'xxx3' },
    // })

    // basic requirement checks
    // if (!req.body.price) {
    //   res.status(400).json({ message: 'Please enter a price' })
    //   return
    // }
    if (!req.body.netid) {
      res.status(400).json({ message: "You aren't logged in. Missing NetID" })
      return
    }

    // check if the customer exists in stripe, their account is created when they first login to CAS
    const customerQuery = await stripe.customers.search({
      query: "metadata['netid']:'" + req.body.netid + "'",
    })
    console.log(customerQuery.data[0]?.id)

    if (!customerQuery.data[0]?.id) {
      res.status(403).json({
        message:
          'Invalid netid: either the netid is incorrect, or this netid has never been set up with Yale Butteries ',
      })
      return
    }

    const customer = await stripe.customers.retrieve(customerQuery.data[0].id)
    // const price: number = req.body.price * 100
    const paymentMethods = await stripe.customers.listPaymentMethods(customer.id, { type: 'card' })
    const ephemeralKey = await stripe.ephemeralKeys.create({ customer: customer.id }, { apiVersion: '2020-08-27' })

    console.log(paymentMethods.data[0]?.id)

    // customer already has a card saved, use that card
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
    // customer doesn't have a card saved, haev them create a new card with the option to save it
    console.log('customer does not have PM')

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: price,
    //   currency: 'USD',
    //   customer: customer.id,
    //   setup_future_usage: 'off_session',
    //   automatic_payment_methods: {
    //     enabled: true,
    //   },
    // })

    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
    })

    res.json({
      message: 'Setup Intent Initiated',
      setupIntent: setupIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey:
        'pk_test_51KktoIEL7XDhq084xLTTSGjXxq0QvtgZjrO2KEsvCljPzyxLQBHtglGAztvY58WNDOeSxNconUi9svfk6Eyqdnig00pEpQCANG',
    })

    // const clientSecret = paymentIntent.client_secret
    // res.json({ message: 'Payment initiated', clientSecret })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
    return
  }
}
