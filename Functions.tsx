import { TransactionItem } from './store/slices/TransactionItems'
import { OrderItem } from './store/slices/OrderCart'
import * as Device from 'expo-device'
import { useAppSelector } from './store/ReduxStore'
import * as Notifications from 'expo-notifications'
import { Platform, Alert } from 'react-native'
import { College } from './store/slices/Colleges'

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

export function cleanTime(inputDate: Date): string {
  const hours = inputDate.getHours() % 12 == 0 ? 12 : inputDate.getHours() % 12
  const minutes = inputDate.getMinutes() < 10 ? '0' + inputDate.getMinutes() : inputDate.getMinutes()
  const meridiem = inputDate.getHours() < 12 ? 'AM' : 'PM'
  const orderTime = hours + ':' + minutes + ' ' + meridiem
  return orderTime
}

export function getDaysOpen(colleges: College[], name: string): boolean[] {
  let initArray = [false, false, false, false, false, false, false]

  const daysOpen = colleges.filter((college) => college.name == name)[0].daysOpen

  for (let i=0; i <= daysOpen.length - 1; i++) { //days of week index (7-1)
    switch (daysOpen[i]) {
      case 'Sunday':
        initArray[0] = true
        break;
      case 'Monday':
        initArray[1] = true
        break;
      case 'Tuesday':
        initArray[2] = true
        break;
      case 'Wednesday':
        initArray[3] = true
        break;
      case 'Thursday':
        initArray[4] = true
        break;
      case 'Friday':
        initArray[5] = true
        break;
      case 'Saturday':
        initArray[6] = true
        break;
      default:
        break;
    }
  }
  
  return initArray
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
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
  } else {
    alert('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
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
