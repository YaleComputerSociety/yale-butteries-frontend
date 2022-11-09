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
    const name: string = req.body.id
    const price: number = req.body.price * 100
    console.log(name, price)
    if (!name) {
      res.status(400).json({ message: 'Please enter a name' })
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: 'USD',
      payment_method_types: ['card'],
      metadata: { name, price },
    })
    const clientSecret = paymentIntent.client_secret
    res.json({ message: 'Payment initiated', clientSecret })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
}
