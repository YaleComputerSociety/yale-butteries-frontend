export function priceToText(num: number): string {
  const cents = num % 100
  const dollars = (num - cents) / 100
  return '$' + dollars + '.' + (cents < 10 ? '0' + cents : cents)
}

// export function getPriceTotal(items): number {
//   let sum = 0
//   for (let i = 0; i < items.length; i++) {
//     sum += items[i].count * (Math.floor(items[i].price * 100) / 100)
//   }
//   return sum
