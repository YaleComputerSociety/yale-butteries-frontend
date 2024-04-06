import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, ScrollView, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

import { home } from '../../styles/ButteriesStyles'
import { ButteryCard } from '../../components/customer/ButteryCard'
import { useAppDispatch, useAppSelector } from '../../store/ReduxStore'
import { setCollege } from '../../store/slices/OrderCart'
import { registerForPushNotificationsAsync, getDaysOpen, getHours, getCollegeOpen } from '../../utils/functions'
import { asyncFetchColleges } from '../../store/slices/Colleges'
import type { MainStackScreenProps } from '../../utils/types'

const ButteriesScreen: React.FC<MainStackScreenProps<'ButteriesScreen'>> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()

  const [refreshing, setRefreshing] = useState(false)
  const [begin, setBegin] = useState(true)

  const { colleges, isLoading } = useAppSelector((state) => state.colleges)

  // const[begin, setBegin] = useState(false)

  useEffect(() => {
    // todo: handle failure case with loading screen
    void dispatch(asyncFetchColleges())
  }, [dispatch, isFocused])

  useEffect(() => {
    const push = async (): Promise<void> => {
      await registerForPushNotificationsAsync()
    }
    push().catch((e) => {
      console.error(e)
    })
  }, [])

  useEffect(() => {
    if (!isLoading && colleges != null) {
      setBegin(false)
    }
  }, [colleges, isLoading])

  const butteries: CollegeInfo[] = [
    {
      name: 'Morse',
      active: false,
    },
    {
      name: 'Berkeley',
      active: false,
    },
    {
      name: 'Branford',
      active: false,
    },
    {
      name: 'Davenport',
      active: false,
    },
    {
      name: 'Franklin',
      active: false,
    },
    {
      name: 'Hopper',
      active: false,
    },
    {
      name: 'JE',
      active: true,
    },
    {
      name: 'Murray',
      active: false,
    },
    {
      name: 'Pierson',
      active: false,
    },
    {
      name: 'Saybrook',
      active: false,
    },
    {
      name: 'Silliman',
      active: false,
    },
    {
      name: 'Stiles',
      active: false,
    },
    {
      name: 'TD',
      active: false,
    },
    {
      name: 'Trumbull',
      active: true,
    },
  ]

  const toMenu = (college: string): void => {
    dispatch(setCollege(college))
    navigation.navigate('MenuScreen', { collegeName: college })
  }

  interface CollegeInfo {
    name: string
    active: boolean
  }

  const visualsDict = {
    Berkeley: 0,
    Branford: 80,
    Davenport: 160,
    Stiles: 240,
    Franklin: 320,
    Hopper: 400,
    JE: 480,
    Morse: 560,
    Murray: 640,
    Pierson: 720,
    Saybrook: 800,
    Silliman: 880,
    TD: 960,
    Trumbull: 1040,
  }

  const getCollegeVisual = (collegeInfo: CollegeInfo, index: number): JSX.Element => {
    const navigationName: string = collegeInfo.name.length > 2 ? collegeInfo.name.toLowerCase() : collegeInfo.name
    const offset = visualsDict[collegeInfo.name]

    if (colleges == null) {
      throw new Error('colleges are not defined')
    }

    return (
      <ButteryCard
        onPress={() => {
          toMenu(navigationName)
        }}
        college={collegeInfo.name}
        openTime={getHours(colleges, collegeInfo.name.toLowerCase())[0]}
        closeTime={getHours(colleges, collegeInfo.name.toLowerCase())[1]}
        offsetY={offset}
        active={collegeInfo.active}
        key={index}
        isOpen={getCollegeOpen(colleges, collegeInfo.name.toLowerCase())}
        daysOpen={getDaysOpen(colleges, collegeInfo.name.toLowerCase())}
        isAcceptingOrders={true}
      />
    )
  }

  const getAllCards = (filterType?: 'all' | 'active' | 'inactive'): JSX.Element => {
    const collegeCards: JSX.Element[] = []

    let filteredColleges = butteries // Default: Get all colleges

    // Filter based on filterType if provided
    if (filterType === 'active') {
      filteredColleges = butteries.filter((college) => college.active)
    } else if (filterType === 'inactive') {
      filteredColleges = butteries.filter((college) => !college.active)
    }

    for (let i = 0; i < filteredColleges.length; i++) {
      collegeCards.push(getCollegeVisual(filteredColleges[i], i))
    }

    return <View>{collegeCards}</View>
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await dispatch(asyncFetchColleges())
    setRefreshing(false)
  }, [dispatch])

  return (
    <View style={styles.outerContainer}>
      {begin ? (
        <LinearGradient colors={['#121212', '#121212']} locations={[0, 1]}>
          <ScrollView contentContainerStyle={styles.scrollViewContentContainer} style={styles.outerContainer}>
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator color="rgba(255,255,255,0.72)" style={styles.activityIndicator} size="large" />
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
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
          <View style={styles.bottomSpacer} />
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: { width: '100%', height: '100%' },
  scrollViewContentContainer: { flexGrow: 1, justifyContent: 'center' },
  activityIndicatorContainer: { height: '100%', alignItems: 'center' },
  activityIndicator: { height: '100%' },
  bottomSpacer: { height: 25, opacity: 1 },
})

export default ButteriesScreen
