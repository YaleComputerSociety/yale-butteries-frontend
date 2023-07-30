import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { home } from '../../styles/ButteriesStyles'
import { ButteryCard } from '../../components/customer/ButteryCard'
import { useAppDispatch, useAppSelector } from '../../store/ReduxStore'
import { setCollege } from '../../store/slices/OrderCart'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'
import { registerForPushNotificationsAsync, getDaysOpen } from '../../Functions'
import { asyncFetchColleges } from '../../store/slices/Colleges'
import { useIsFocused } from '@react-navigation/native'

const ButterySelectionScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()

  const [refreshing, setRefreshing] = useState(false)
  const [begin, setBegin] = useState(true)
  const [connection, setConnection] = useState(true)

  const { colleges, isLoading: isLoading } = useAppSelector((state) => state.colleges)

  // const[begin, setBegin] = useState(false)

  useEffect(() => {
    dispatch(asyncFetchColleges()).then((success: boolean) => {
      if (!success) {
        setConnection(false)
      }
    })
}, [isFocused])

  useEffect(() => {
    const push = async () => {
      await registerForPushNotificationsAsync()
    }
    push()
  }, [])

  useEffect(() => {
    if (colleges) {
      setBegin(false)
    }
  }, [])

  const butteries: CollegeInfo[] = [
    {
      ne: 'Morse',
      start: '9:00',
      end: '4:00',
      daysOpen: [true, false, false, true, true, true, true],
      active: true,
    },
    {
      ne: 'Berkeley',
      start: '10:00',
      end: '2:30',
      daysOpen: [true, true, true, false, false, false, true],
      active: true,
    },
    {
      ne: 'Branford',
      start: '10:00',
      end: '2:30',
      daysOpen: [true, true, false, false, false, true, false],
      active: true,
    },
    {
      ne: 'Davenport',
      start: '5:00',
      end: '4:00',
      daysOpen: [false, false, false, false, false, false, false],
      active: false,
    },
    {
      ne: 'Franklin',
      start: '22:00',
      end: '1:00',
      daysOpen: [false, false, false, false, false, false, false],
      active: false,
    },
    {
      ne: 'Hopper',
      start: '22:00',
      end: '0:30',
      daysOpen: [false, false, false, false, false, false, false],
      active: false,
    },
    // {
    //   ne: 'JE',
    //   start: '21:30',
    //   end: '0:30',
    //   daysOpen: [false, false, false, false, false, false, false],
    //   active: false,
    // },
    {
      ne: 'Murray',
      start: '22:00',
      end: '1:00',
      daysOpen: [false, false, false, false, false, false, false],
      active: false,
    },
    {
      ne: 'Pierson',
      start: '22:30',
      end: '0:30',
      daysOpen: [false, false, false, false, false, false, false],
      active: false,
    },
    {
      ne: 'Saybrook',
      start: '21:00',
      end: '0:00',
      daysOpen: [false, false, false, false, false, false, false],
      active: false,
    },
    {
      ne: 'Silliman',
      start: '22:00',
      end: '1:00',
      daysOpen: [false, false, false, false, false, false, false],
      active: false,
    },
    {
      ne: 'Stiles',
      start: '22:00',
      end: '0:50',
      daysOpen: [false, false, false, false, false, false, false],
      active: false,
    },
    // {
    //   ne: 'TD',
    //   start: '22:00',
    //   end: '1:00',
    //   daysOpen: [false, false, false, false, false, false, false],
    //   active: false,
    // },
    {
      ne: 'Trumbull',
      start: '22:00',
      end: '23:30',
      daysOpen: [false, false, false, false, false, false, false],
      active: false,
    },
  ]

  const toMenu = (college: string) => {
    dispatch(setCollege(college))
    navigation.navigate('MenuScreen', { collegeName: college })
  }

  interface CollegeInfo {
    ne: string
    start: string
    end: string
    active: boolean
    daysOpen: boolean[]
  }

  const getCollegeVisual = (collegeInfo: CollegeInfo, index: number) => {
    const navigationNe: string = collegeInfo.ne.length > 2 ? collegeInfo.ne.toLowerCase() : collegeInfo.ne
    let offset = (index - 1) * 80
    if (collegeInfo.ne == 'Stiles') {
      offset = 240
    } else if (collegeInfo.ne == 'Morse') {
      offset = 560
    } else if ((index > 3 && index < 7) || index >= 12) {
      offset += 80
    } else if (index >= 7 && index < 12) {
      offset += 160
    }

    return (
      <ButteryCard
        onPress={() => toMenu(navigationNe)}
        college={collegeInfo.ne}
        openTime={collegeInfo.start}
        closeTime={collegeInfo.end}
        offsetY={offset}
        active={collegeInfo.active}
        key={index}
        daysOpen={getDaysOpen(colleges, collegeInfo.ne.toLowerCase())}
      />
    )
  }

  const getAllCards = () => {
    const collegeCards: JSX.Element[] = []

    for (let i = 1; i < butteries.length; i++) {
      collegeCards.push(getCollegeVisual(butteries[i], i))
    }

    return <View>{collegeCards}</View>
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await dispatch(asyncFetchColleges()).then((success: boolean) => {
      if (!success) {
        setConnection(false)
      }
    })
    setRefreshing(false)
  }, [])

  return (
    <View style={{ width: '100%', height: '100%' }}> 
      {begin ? (
        <LinearGradient colors={['#54ade4', '#43cea2']} locations={[0, 1]}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={{ width: '100%', height: '100%' }}>
              <View style={{ height: '100%', alignItems: 'center' }}>
                <ActivityIndicator color="#555" style={{ height: '100%' }} size="large" />
              </View>
          </ScrollView>
        </LinearGradient>
      ) : (
        <ScrollView 
          style={home.app} 
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false} 
          bounces={true}
          refreshControl={<RefreshControl colors={["#555"]} refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <LinearGradient colors={['#54ade4', '#43cea2']} locations={[0, 1]}>
            <View style={home.outerContainer}>
              {getCollegeVisual(butteries[0], 0)}
              <View style={home.partition}>
                <Text style={home.announcement}>More Butteries Coming Soon!</Text>
              </View>
              {getAllCards()}
            </View>
          </LinearGradient>
          <View style={{ height: '20%', width: '100%', backgroundColor: '#43cea2' }}></View>
        </ScrollView>
      )}
    </View>
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
function useAppFocus() {
  throw new Error('Function not implemented.')
}

