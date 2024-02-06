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
import type { NavigationStackProp } from 'react-navigation-stack'
import type { MainStackParamList } from '../../routes/mainStackNavigator'

const ButterySelectionScreen: React.FC<{ navigation: NavigationStackProp<MainStackParamList, 'ButteriesScreen'> }> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()

  const [refreshing, setRefreshing] = useState(false)
  const [begin, setBegin] = useState(true)
  const [connection, setConnection] = useState(true)

  const { colleges, isLoading } = useAppSelector((state) => state.colleges)

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
    if (!isLoading && colleges) {
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
      active: false,
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

  const toMenu = (college: string): void => {
    dispatch(setCollege(college))
    navigation.navigate('MenuScreen', { collegeName: college })
  }

  interface CollegeInfo {
    ne: string
    active: boolean
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
        onPress={() => {
          toMenu(navigationNe)
        }}
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

  const getAllCards = () => {
    const collegeCards: JSX.Element[] = []

    for (let i = 0; i < butteries.length - 1; i++) {
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
              {getCollegeVisual(butteries[13], 13)}
              <View style={home.partition}>
                <Text style={home.announcement}>More Butteries Coming Soon!</Text>
              </View>
              {getAllCards()}
            </View>
          </LinearGradient>
          <View style={{ height: 25, opacity: 1 }} />
        </ScrollView>
      )}
    </View>
  )
}

ButterySelectionScreen.navigationOptions = (navData) => {
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
