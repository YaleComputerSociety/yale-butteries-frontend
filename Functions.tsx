import { OrderItem } from './store/slices/OrderCart'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
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

export function outputTime(hrs: string, mins: string, am_pm?: string): string {
  let time12h = hrs + ':' + mins + ' ' + am_pm

  const [time, modifier] = time12h.split(' ')
  let [hours, minutes] = time.split(':')

  if (hours === '12') {
    hours = '00'
  }

  if (modifier === 'PM') {
    if (parseInt(hrs) + 12 < 24) {
      hours = (parseInt(hours, 10) + 12).toString()
    }
  }

  return `${hours}:${minutes}`
}

export function militaryToAnalog(blah: string): string {
  var time = blah.split(':') // convert to array

  // fetch
  var hours = Number(time[0])
  var minutes = Number(time[1])

  // calculate
  var timeValue

  if (hours > 0 && hours <= 12) {
    timeValue = '' + hours
  } else if (hours > 12) {
    timeValue = '' + (hours - 12)
  } else if (hours == 0) {
    timeValue = '12'
  }

  timeValue += minutes < 10 ? ' 0' + minutes : ' ' + minutes // get minutes
  timeValue += hours >= 12 ? ' pm' : ' am' // get AM/PM

  return timeValue
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

  for (let i = 0; i <= daysOpen.length - 1; i++) {
    //days of week index (7-1)
    switch (daysOpen[i]) {
      case 'Sunday':
        initArray[0] = true
        break
      case 'Monday':
        initArray[1] = true
        break
      case 'Tuesday':
        initArray[2] = true
        break
      case 'Wednesday':
        initArray[3] = true
        break
      case 'Thursday':
        initArray[4] = true
        break
      case 'Friday':
        initArray[5] = true
        break
      case 'Saturday':
        initArray[6] = true
        break
      default:
        break
    }
  }

  return initArray
}

export function getHours(colleges: College[], name: string): string[] {
  const college = colleges.filter((college) => college.name == name)[0]
  if (college.openTime && college.closeTime) {
    return [militaryToAnalog(college.openTime), militaryToAnalog(college.closeTime)]
  }

  return ['4 00 pm', '6 00 pm']
}

export function getCollegeOpen(colleges: College[], name: string): boolean {
  var today = new Date()
  var hour = today.getHours()
  var minute = today.getMinutes()

  const college = colleges.filter((college) => college.name == name)[0]
  const openTimeHour = parseInt(college.openTime)
  const openTimeMinute = parseInt(college.openTime.split(':')[1])

  const closeTimeHour = parseInt(college.closeTime.split(':')[0])
  const closeTimeMinute = parseInt(college.closeTime.split(':')[1])
  // write some code that basically says up until 2am of the next day counts as the same day
  // for example, if its 1am on a wednesday nd the buttery is open on a wednesday, but closed on thursday
  // it should still remain open because it's (for all intents and purposes) still actually wednesday
  if (hour < openTimeHour || hour > closeTimeHour) {
    return false
  } else {
    if (hour == openTimeHour && minute < openTimeMinute) {
      return false
    } else if (hour == closeTimeHour && minute > closeTimeMinute) {
      return false
    }
  }

  return true
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
      headercolor = '#f65d5d'
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
