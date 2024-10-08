import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, ScrollView, ActivityIndicator, RefreshControl, Alert } from 'react-native'
import { home } from '../../styles/ButteriesStyles'
import { ButteryCard } from '../../components/customer/ButteryCard'
import { useAppDispatch, useAppSelector } from '../../store/ReduxStore'
import { setCollege } from '../../store/slices/OrderCart'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'
import { registerForPushNotificationsAsync, getDaysOpen, getHours, getCollegeOpen } from '../../utils/functions'
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
      const token = await registerForPushNotificationsAsync()
      // Alert.alert(token ? token : 'no token')
    }
    push()
  }, [])

  useEffect(() => {
    if (isLoading == false && colleges) {
      setBegin(false)
    }
  }, [isLoading])

  const butteries: CollegeInfo[] = [
    {
      ne: 'Morse',
      active: false,
    },
    {
      ne: 'Berkeley',
      active: false,
    },
    {
      ne: 'Branford',
      active: false,
    },
    {
      ne: 'Davenport',
      active: false,
    },
    {
      ne: 'Franklin',
      active: false,
    },
    {
      ne: 'Hopper',
      active: false,
    },
    {
      ne: 'JE',
      active: true,
    },
    {
      ne: 'Murray',
      active: false,
    },
    {
      ne: 'Pierson',
      active: false,
    },
    {
      ne: 'Saybrook',
      active: false,
    },
    {
      ne: 'Silliman',
      active: false,
    },
    {
      ne: 'Stiles',
      active: false,
    },
    {
      ne: 'TD',
      active: false,
    },
    {
      ne: 'Trumbull',
      active: true,
    },
  ]

  const toMenu = (college: string) => {
    dispatch(setCollege(college))
    navigation.navigate('MenuScreen', { collegeName: college })
  }

  interface CollegeInfo {
    ne: string
    active: boolean
  }

  const visualsDict = {
    'Berkeley': 0,
    'Branford': 80,
    'Davenport': 160,
    'Stiles': 240,
    'Franklin': 320,
    'Hopper': 400,
    'JE': 480,
    'Morse': 560,
    'Murray': 640,
    'Pierson':720,
    'Saybrook': 800,
    'Silliman':880,
    'TD':960,
    'Trumbull':1040,
  }

  const getCollegeVisual = (collegeInfo: CollegeInfo, index: number) => {
    const navigationNe: string = collegeInfo.ne.length > 2 ? collegeInfo.ne.toLowerCase() : collegeInfo.ne
    let offset = visualsDict[collegeInfo.ne]

    return (
      <ButteryCard
        onPress={() => toMenu(navigationNe)}
        college={collegeInfo.ne}
        openTime={getHours(colleges, collegeInfo.ne.toLowerCase())[0]}
        closeTime={getHours(colleges, collegeInfo.ne.toLowerCase())[1]}
        offsetY={offset}
        active={collegeInfo.active}
        key={index}
        isOpen={getCollegeOpen(colleges, collegeInfo.ne.toLowerCase())}
        daysOpen={getDaysOpen(colleges, collegeInfo.ne.toLowerCase())}
      />
    )
  }

  const getAllCards = (filterType?: 'all' | 'active' | 'inactive') => {
    const collegeCards: JSX.Element[] = []
  
    let filteredColleges = butteries; // Default: Get all colleges
  
    // Filter based on filterType if provided
    if (filterType === 'active') {
      filteredColleges = butteries.filter(college => college.active)
    } else if (filterType === 'inactive') {
      filteredColleges = butteries.filter(college => !college.active)
    }
  
    for (let i = 0; i < filteredColleges.length; i++) {
      collegeCards.push(getCollegeVisual(filteredColleges[i], i))
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
        <LinearGradient colors={['#121212', '#121212']} locations={[0, 1]}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            style={{ width: '100%', height: '100%' }}
          >
            <View style={{ height: '100%', alignItems: 'center' }}>
              <ActivityIndicator color="rgba(255,255,255,0.72)" style={{ height: '100%' }} size="large" />
            </View>
          </ScrollView>
        </LinearGradient>
      ) : (
        <ScrollView
          style={home.app}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          bounces={true}
          refreshControl={
            <RefreshControl tintColor="rgba(255,255,255,0.72)" refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <LinearGradient colors={['#121212', '#121212']} locations={[0, 1]}>
            <View style={home.outerContainer}>
              {getAllCards('active')}
              <View style={home.partition}>
                <Text style={home.announcement}>More Butteries Coming Soon!</Text>
              </View>
              {getAllCards('inactive')}
            </View>
          </LinearGradient>
          <View style={{ height: 25, opacity: 1 }}></View>
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
