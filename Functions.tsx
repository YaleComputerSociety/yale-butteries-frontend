import { TransactionItem } from './store/slices/TransactionItems'
import { OrderItem } from './store/slices/OrderCart'
import * as Device from 'expo-device'
import { useAppSelector } from './store/TypedHooks'
import * as Notifications from 'expo-notifications'

export function priceToText(num: number): string {
  const cents = num % 100
  const dollars = (num - cents) / 100
  return '$' + dollars + '.' + (cents < 10 ? '0' + cents : cents)
}

export function getPriceFromOrderItems(orderItems: OrderItem[]): string {
  let sum = 0
  for (let i = 0; i < orderItems.length; i++) {
    sum = sum + orderItems[i].orderItem.price
  }
  return priceToText(sum)
}

export function getNameFromTransactionId(transactionItem: TransactionItem): string {
  const { menuItems } = useAppSelector((state) => state.menuItems)
  return menuItems.find((element) => element.id == transactionItem.menuItemId).item
}

export function returnCollegeName(collegeName: string): string[] {
  let name = ''
  let headercolor = ''
  switch (collegeName) {
    case 'berkeley':
      name = "Marvin's"
      headercolor = '#f54a4a'
      break
    case 'branford':
      name = 'Nuttery'
      headercolor = '#3d85c6'
      break
    case 'davenport':
      name = 'The Dive'
      headercolor = '#5b5b5b'
      break
    case 'franklin':
      name = "Ben's Butt"
      headercolor = '#f54a4a'
      break
    case 'hopper':
      name = 'Trolley Stop'
      headercolor = '#3d85c6'
      break
    case 'JE':
      name = 'JE Butt'
      headercolor = '#78aa63'
      break
    case 'morse':
      name = 'The Morsel'
      headercolor = '#f54a4a'
      break
    case 'murray':
      name = 'MY Butt'
      headercolor = '#3d85c6'
      break
    case 'pierson':
      name = 'Knight Club'
      headercolor = '#f7ba00'
      break
    case 'saybrook':
      name = 'Squiche'
      headercolor = '#3d85c6'
      break
    case 'silliman':
      name = 'SilliCafe'
      headercolor = '#f54a4a'
      break
    case 'stiles':
      name = 'Moose Butt'
      headercolor = '#f7ba00'
      break
    case 'TD':
      name = 'TD Butt'
      headercolor = '#f54a4a'
      break
    case 'trumbull':
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

// PUSH NOTIFS

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
export async function sendPushNotification(expoPushToken): Promise<void> {
  const completedMessage = {
    to: expoPushToken,
    sound: 'default',
    title: 'Order Complete',
    body: 'Your buttery order has been completed!' + '😁'.codePointAt(0),
    data: { someData: 'goes here' },
  }

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(completedMessage),
  })
}

export async function registerForPushNotificationsAsync(): Promise<any> {
  let token
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  } else {
    alert('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    //FOR ANDROID >:(
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return token
}

// export function getPriceTotal(items): number {
//   let sum = 0
//   for (let i = 0; i < items.length; i++) {
//     sum += items[i].count * (Math.floor(items[i].price * 100) / 100)
//   }
//   return sum