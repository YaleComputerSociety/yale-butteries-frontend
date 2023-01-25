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

export function returnCollegeName(collegeName: string): string[] {
  let name = ''
  let headercolor = ''
  switch (collegeName) {
    case 'Berkeley':
      name = "Marvin's"
      headercolor = '#f54a4a'
      break
    case 'Branford':
      name = 'Nuttery'
      headercolor = '#3d85c6'
      break
    case 'Davenport':
      name = 'The Dive'
      headercolor = '#5b5b5b'
      break
    case 'Franklin':
      name = "Ben's Butt"
      headercolor = '#f54a4a'
      break
    case 'Hopper':
      name = 'Trolley Stop'
      headercolor = '#3d85c6'
      break
    case 'JE':
      name = 'JE Butt'
      headercolor = '#78aa63'
      break
    case 'Morse':
      name = 'The Morsel'
      headercolor = '#f54a4a'
      break
    case 'Murray':
      name = 'MY Butt'
      headercolor = '#3d85c6'
      break
    case 'Pierson':
      name = 'Knight Club'
      headercolor = '#f7ba00'
      break
    case 'Saybrook':
      name = 'Squiche'
      headercolor = '#3d85c6'
      break
    case 'Silliman':
      name = 'SilliCafe'
      headercolor = '#f54a4a'
      break
    case 'Stiles':
      name = 'Moose Butt'
      headercolor = '#f7ba00'
      break
    case 'TD':
      name = 'TD Butt'
      headercolor = '#f54a4a'
      break
    case 'Trumbull':
      name = 'Trumbutt'
      headercolor = '#5b5b5b'
      break
    default:
      name = 'Menu'
      headercolor = '#bbb'
      break
  }
  return [name, headercolor]
}

// export function getPriceTotal(items): number {
//   let sum = 0
//   for (let i = 0; i < items.length; i++) {
//     sum += items[i].count * (Math.floor(items[i].price * 100) / 100)
//   }
//   return sum
