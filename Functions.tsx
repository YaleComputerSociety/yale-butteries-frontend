import { OrderItem } from './store/slices/OrderCart'

export function priceToText(num: number): string {
  const dollars = Math.floor(num)
  const cents = Math.floor(num * 100 - dollars * 100)
  return '$' + dollars + '.' + (cents < 10 ? '0' + cents : cents)
}

export function getPriceFromOrderItems(orderItems: OrderItem[]): string {
  let sum = 0
  for (let i = 0; i < orderItems.length; i++) {
    sum = sum + orderItems[i].orderItem.price
  }
  return priceToText(sum)
}

// export function getPriceTotal(items): number {
//   let sum = 0
//   for (let i = 0; i < items.length; i++) {
//     sum += items[i].count * (Math.floor(items[i].price * 100) / 100)
//   }
//   return sum
