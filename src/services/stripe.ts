// two tasks: create user->store credit card info in stripe
// create transaction history-> double check cost with prisma and then send payment to stripe

// import Stripe from 'stripe'

// // creates a payment and sends it to stripe
// // need: user, user.netid, total_cost (double-checked already),
// export async function stripePayment(): Promise<void> {
//   const stripe = new Stripe('sk_test_51KktoIEL7XDhq084MaCpYJ8zvPxthK3nJ36ufaiXTvL87Zujie0TdHz2YoxCWAJ2Yik1GkLItFPhJJb6vzUnbZxz001OU9TuSQ')
// }



// (async () => {
//   const customer = await stripe.customers.create({
//     email: 'customer@example.com',
//   });

//   console.log(customer.id);
// })();