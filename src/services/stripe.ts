import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'

// questions for Tucker
// transaction history—writing into the database
// what will change once there is a real database
// (later) how do we call the order function from the backend while in the app
// can we change maketransactionhistory name to makeorder
// how do we handle errors
// security

// look into paymentIntent

// 4-5 steps
// customer order
// manager side
// refund
// integration with backend/frontend integration
// ?? update user card

// funcitons we need:
// Order
// - check that the request is valid
// - check the prices of the payment
// - get the user
//   - if the user doesn't exist, make a new user
// - make the request
// also create a transaction history

// stripe endpoints
// - make transaction
// - get user
// - make user
// - search for specific user

// our backend
// make transaction history
// get menu item
// get user
// put user in backend

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

// sum up the prices and make sure that the database values match with the order values
export async function checkPrices(
  items: Array<TransactionItem>,
  total_cost: number,
  college_id: number
): Promise<number> {
  items.map((x) => {
    prisma.menuItem.findFirst({ where: { collegeId: college_id, item: x.name } })
  })
  return items.reduce((partialSum, a) => partialSum + a.cost, 0)
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
