// two tasks: create user->store credit card info in stripe
// create transaction history-> double check cost with prisma and then send payment to stripe

import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'

const prisma = new PrismaClient()

interface TransactionItem {
  name: string
  cost: number
}

const stripe = new Stripe(
  'sk_test_51KktoIEL7XDhq084MaCpYJ8zvPxthK3nJ36ufaiXTvL87Zujie0TdHz2YoxCWAJ2Yik1GkLItFPhJJb6vzUnbZxz001OU9TuSQ',
  { apiVersion: '2020-08-27' }
)

// async function checkPricesMapFunc(college_id: number, transactionItem: TransactionItem): Promise<TransactionItem> {
//   const a = prisma.menuItem.findFirst({ where: { buttery: college_id, item: transactionItem.name } })
// }

export async function checkPrices(
  items: Array<TransactionItem>,
  total_cost: number,
  college_id: number
): Promise<number> {
  items.map((x) => {
    prisma.menuItem.findFirst({ where: { collegeId: college_id, item: x.name } })
  })
  return items.reduce((partialSum, a) => partialSum + a, 0)
}

export async function stripePayment(amount = 11, user: number): Promise<void> {
  // need credit card storing before I can get the credit card source from user_id
  const charge = await stripe.charges.create({
    amount: amount,
    currency: 'usd',
    source: 'tok_visa',
    description: 'Test charge',
  })
}
