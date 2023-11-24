import type { Request, Response } from 'express'

import prisma from '@src/config/prismaClient'
import { getCollegeFromName } from '@utils/prismaUtils'
import HTTPError from '@src/utils/httpError'
import type { CreatePaymentIntentBody } from '@utils/bodyTypes'
import { stripe } from '@src/config/stripe'

export interface TypedRequestBody<T> extends Request {
  body: T
}

// TODO: rename orderitem.price and .id to match order creation names, so body types can be the same
export async function createPaymentIntent (req: Request, res: Response): Promise<void> {
  const requestBody = req.body as CreatePaymentIntentBody

  // check if the customer exists in stripe, their account is created when they first login to CAS
  const customerQuery = await stripe.customers.search({
    query: "metadata['userId']:'" + requestBody.userId + "'"
  })

  if (customerQuery.data[0]?.id == null) throw new HTTPError("Invalid user: you might have created a user and then ordered too fast, please wait 10 seconds. If that doesn't work, try reloading the app", 403)

  const customer = await stripe.customers.retrieve(customerQuery.data[0].id)
  const price = requestBody.price

  // verify that backend data matches frontend order:
  // verify all the prices match
  // verify all the items are enabled

  const college = await getCollegeFromName(requestBody.college)

  const backendItems = await prisma.menuItem.findMany({
    where: {
      collegeId: college.id,
      isActive: true
    }
  })

  let validOrder = true

  requestBody.items.forEach((item) => {
    const backendItem = backendItems.find((i) => i.id === item.orderItem.id)
    if (backendItem == null || backendItem.price !== item.orderItem.price) {
      validOrder = false
    }
  })

  if (!validOrder) throw new HTTPError('Prices do not match. Stripe payment error', 400)

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
    capture_method: 'manual' // don't charge the user right now, instead we save the paymentIntent's id to charge later.
  })
  res.json({ message: 'Payment initiated', paymentIntent })
}
