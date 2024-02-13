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
    dispatch(asyncFetchColleges())
  }, [dispatch, isFocused])

  useEffect(() => {
    const push = async (): Promise<void> => {
      await registerForPushNotificationsAsync()
      // Alert.alert(token ? token : 'no token')
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
      active: false,
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

  const getCollegeVisual = (collegeInfo: CollegeInfo, index: number): React.ReactElement => {
    const navigationName: string = collegeInfo.name.length > 2 ? collegeInfo.name.toLowerCase() : collegeInfo.name
    let offset = (index - 1) * 80
    if (collegeInfo.name === 'Stiles') {
      offset = 240
    } else if (collegeInfo.name === 'Morse') {
      offset = 560
    } else if ((index > 3 && index < 7) || index >= 12) {
      offset += 80
    } else if (index >= 7 && index < 12) {
      offset += 160
    }

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

  const getAllCards = (): React.ReactElement => {
    const collegeCards: React.ReactElement[] = []

    for (let i = 0; i < butteries.length - 1; i++) {
      collegeCards.push(getCollegeVisual(butteries[i], i))
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
              {getCollegeVisual(butteries[13], 13)}
              <View style={home.partition}>
                <Text style={home.announcement}>More Butteries Coming Soon!</Text>
              </View>
              {getAllCards()}
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
