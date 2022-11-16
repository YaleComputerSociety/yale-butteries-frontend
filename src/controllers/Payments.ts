import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export interface TypedRequestBody<T> extends Request {
  body: T
}

export async function createPaymentIntent(req: Request, res: Response): Promise<void> {
  try {
    if (!req.body.price) {
      res.status(400).json({ message: 'Please enter a price' })
      return
    }
    if (!req.body.netid) {
      res.status(400).json({ message: 'Please enter a netid' })
      return
    }

    const customerQuery = await stripe.customers.search({
      query: "metadata['netid']:'" + req.body.netid + "'",
    })
    console.log(customerQuery.data[0].id)

    if (!customerQuery.data[0].id) {
      res.status(403).json({
        message:
          'Invalid netid: either the netid is incorrect, or this netid has never been set up with Yale Butteries ',
      })
      return
    }

    const customer = await stripe.customers.retrieve(customerQuery.data[0].id)
    const price: number = req.body.price * 100

    const paymentMethods = await stripe.customers.listPaymentMethods(customer.id, { type: 'card' })

    console.log(paymentMethods.data[0]?.id)

    if (paymentMethods.data[0]?.id) {
      console.log('customer has PM')
      const paymentIntent = await stripe.paymentIntents.create({
        amount: price,
        currency: 'usd',
        customer: customer.id,
        payment_method: paymentMethods.data[0].id,
        off_session: true,
        confirm: true,
      })

      const clientSecret = paymentIntent.client_secret
      res.json({ message: 'Automatic payment initiated', clientSecret })
    } else {
      console.log('customer does not have PM')
      const paymentIntent = await stripe.paymentIntents.create({
        amount: price,
        currency: 'USD',
        customer: customer.id,
        setup_future_usage: 'off_session',
        automatic_payment_methods: {
          enabled: true,
        },
      })

      const clientSecret = paymentIntent.client_secret
      res.json({ message: 'Payment initiated', clientSecret })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
    return
  }
}
