import React, { useEffect } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { home } from '../../styles/ButtereiesStyles'
import { ButteryCard } from '../../components/customer/ButteryCard'
import { useAppDispatch } from '../../store/ReduxStore'
import { setCollege } from '../../store/slices/OrderCart'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'
import { registerForPushNotificationsAsync } from '../../Functions'

const ButterySelectionScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const push = async () => {
      await registerForPushNotificationsAsync()
    }
    push()
  }, [])

  const colleges: CollegeInfo[] = [
    {
      name: 'Morse',
      start: '5:00am',
      end: '4:00am',
      daysOpen: [true, true, true, true, true, true, true],
      active: true,
    },
    {
      name: 'Berkeley',
      start: '5:00am',
      end: '4:00am',
      daysOpen: [true, true, true, false, false, false, true],
      active: true,
    },
    {
      name: 'Branford',
      start: '10:30pm',
      end: '12:45am',
      daysOpen: [true, true, false, false, false, true, false],
      active: false,
    },
    {
      name: 'Davenport',
      start: '10:00pm',
      end: '12:30am',
      daysOpen: [true, true, false, false, false, true, false],
      active: false,
    },
    {
      name: 'Franklin',
      start: '10:00pm',
      end: '1:00am',
      daysOpen: [true, true, false, false, false, true, false],
      active: false,
    },
    {
      name: 'Hopper',
      start: '10:00pm',
      end: '12:30am',
      daysOpen: [true, true, false, false, false, true, false],
      active: false,
    },
    {
      name: 'JE',
      start: '9:30pm',
      end: '12:30am',
      daysOpen: [true, true, false, false, false, true, false],
      active: false,
    },
    {
      name: 'Murray',
      start: '10:00pm',
      end: '1:00am',
      daysOpen: [true, true, false, false, false, true, false],
      active: false,
    },
    {
      name: 'Pierson',
      start: '10:30pm',
      end: '12:30am',
      daysOpen: [true, true, false, false, false, true, false],
      active: false,
    },
    {
      name: 'Saybrook',
      start: '9:00pm',
      end: '12:00am',
      daysOpen: [true, true, false, false, false, true, false],
      active: false,
    },
    {
      name: 'Silliman',
      start: '10:00pm',
      end: '1:00am',
      daysOpen: [true, true, false, false, false, true, false],
      active: false,
    },
    {
      name: 'Stiles',
      start: '10:00pm',
      end: '12:50am',
      daysOpen: [true, true, false, false, false, true, false],
      active: false,
    },
    {
      name: 'TD',
      start: '10:00pm',
      end: '1:00am',
      daysOpen: [true, true, false, false, false, true, false],
      active: false,
    },
    {
      name: 'Trumbull',
      start: '10:00pm',
      end: '11:30am',
      daysOpen: [true, true, false, false, false, true, false],
      active: false,
    },
  ]

  const toMenu = (college: string) => {
    dispatch(setCollege(college))
    navigation.navigate('MenuScreen', { collegeName: college })
  }

  interface CollegeInfo {
    name: string
    start: string
    end: string
    active: boolean
    daysOpen: boolean[]
  }

  const getCollegeVisual = (collegeInfo: CollegeInfo, index: number) => {
    const navigationName: string = collegeInfo.name.length > 2 ? collegeInfo.name.toLowerCase() : collegeInfo.name
    let offset = (index - 1) * 80
    if (collegeInfo.name == 'Stiles') {
      offset = 240
    } else if (collegeInfo.name == 'Morse') {
      offset = 560
    } else if ((index > 3 && index < 7) || index >= 12) {
      offset += 80
    } else if (index >= 7 && index < 12) {
      offset += 160
    }

    return (
      <ButteryCard
        onPress={() => toMenu(navigationName)}
        college={collegeInfo.name}
        openTime={collegeInfo.start}
        closeTime={collegeInfo.end}
        offsetY={offset}
        active={collegeInfo.active}
        key={index}
        daysOpen={collegeInfo.daysOpen}
      />
    )
  }

  const getAllCards = () => {
    const collegeCards: JSX.Element[] = []

    for (let i = 1; i < colleges.length; i++) {
      collegeCards.push(getCollegeVisual(colleges[i], i))
    }

    return <View>{collegeCards}</View>
  }

  return (
    <ScrollView style={home.app} showsVerticalScrollIndicator={false} alwaysBounceVertical={false} bounces={true}>
      <LinearGradient colors={['#54ade4', '#4424a4']} locations={[0, 1]}>
        <View style={home.outerContainer}>
          {getCollegeVisual(colleges[0], 0)}
          <View style={home.partition}>
            <Text style={home.announcement}>More Butteries Coming Soon!</Text>
          </View>
          {getAllCards()}
        </View>
      </LinearGradient>
      <View style={{ height: '20%', width: '100%', backgroundColor: '#4424a4' }}></View>
    </ScrollView>
  )
}

ButterySelectionScreen['navigationOptions'] = (navData) => {
  return {
    gestureEnabled: false,
    headerLeft: () => <></>,
    headerRight: () => (
      <Ionicon
        name="settings-sharp"
        size={20}
        color="#fff"
        onPress={() => {
          navData.navigation.navigate('SettingsScreen')
        }}
        style={{ paddingRight: 20 }}
      />
    ),
  }
}

export default ButterySelectionScreen
