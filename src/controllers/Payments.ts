import { Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export interface TypedRequestBody<T> extends Request {
  body: T
}

export async function createPaymentIntent(req: Request, res: Response): Promise<void> {
  try {
    // basic parameter checking
    if (!req.body.price) {
      res.status(400).json({ message: 'Please enter a price' })
      return
    }
    if (!req.body.netid) {
      res.status(400).json({ message: "You aren't logged in. Missing NetID" })
      return
    }

    // check if the customer exists in stripe, their account is created when they first login to CAS
    const customerQuery = await stripe.customers.search({
      query: "metadata['netid']:'" + req.body.netid + "'",
    })
    // console.log(customerQuery.data[0]?.id)

    if (!customerQuery.data[0]?.id) {
      res.status(403).json({
        message:
          'Invalid netid: either the netid is incorrect, or this netid has never been set up with Yale Butteries ',
      })
      return
    }

    const customer = await stripe.customers.retrieve(customerQuery.data[0].id)
    const price: number = req.body.price

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
      // setup_future_usage: 'off_session',     for card saving
      payment_method_types: ['card'], // delayed capturing doesn't work for everything and we can get into legal trouble, let's stick with cards (credit & debit) for now
      capture_method: 'manual', // don't charge the user right now, but we'll need to save the paymentIntent's id to charge later
    })
    res.json({ message: 'Payment initiated', paymentIntent })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
    return
  }
}