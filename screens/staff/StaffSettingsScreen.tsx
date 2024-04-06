import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, ScrollView, Switch, Alert, ActivityIndicator, Button } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { useAppSelector, useAppDispatch } from '../../store/ReduxStore'
import EvilModal from '../../components/EvilModal'
import DayIcon from '../../components/staff/DayIcon'
import { asyncFetchColleges, asyncUpdateCollege } from '../../store/slices/Colleges'
import TimePicker from '../../components/staff/TimePicker'
import type { College, CollegeUpdate, StaffStackScreenProps } from '../../utils/types'

const SettingsScreen: React.FC<StaffStackScreenProps<'Settings'>> = () => {
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const { currentUser } = useAppSelector((state) => state.currentUser)
  const { colleges, isLoading } = useAppSelector((state) => state.colleges)

  const [connection, setConnection] = useState(true)
  const [openDays, updateOpenDays] = useState<string[]>([]) // retrieve state once stored
  const [openCount, setOpenCount] = useState(0)
  const [openTimeHour, setOpenTimeHour] = useState(0)
  const [openTimeMinute, setOpenTimeMinute] = useState(0)
  const [closeTimeHour, setCloseTimeHour] = useState(0)
  const [closeTimeMinute, setCloseTimeMinute] = useState(0)
  const [acceptingOrders, setAcceptingOrders] = useState(true)

  const [currentCollege, setCurrentCollege] = useState<College | null>(null)
  const [begin, setBegin] = useState(true)

  useEffect(() => {
    dispatch(asyncFetchColleges()).then((success: boolean) => {
      setConnection(success)
    })
  }, [dispatch])

  useEffect(() => {
    if (colleges != null && currentUser != null) {
      const foundCollege = colleges.find((college) => college.id === currentUser.collegeId)
      if (foundCollege == null) return
      setCurrentCollege(foundCollege)
    }

    if (isFocused && currentCollege != null) {
      scrollToTop()

      const openTime: number[] = currentCollege.openTime.split(':').map((str) => parseInt(str, 10))
      const closeTime: number[] = currentCollege.closeTime.split(':').map((str) => parseInt(str, 10))

      updateOpenDays(currentCollege.daysOpen)
      setOpenCount(currentCollege.daysOpen.length)
      setOpenTimeHour(openTime[0])
      setOpenTimeMinute(openTime[1])
      setCloseTimeHour(closeTime[0])
      setCloseTimeMinute(closeTime[1])
      console.log(currentCollege.isAcceptingOrders)
      console.log(currentCollege)
      setAcceptingOrders(currentCollege.isAcceptingOrders)
      setBegin(false)
    }
  }, [colleges, currentCollege, currentUser, isFocused, isLoading])

  // scroll to top of screen when back in screen
  const scrollViewRef = useRef<ScrollView>(null)
  const scrollToTop = (): void => {
    if (scrollViewRef.current == null) return
    scrollViewRef.current.scrollTo({ y: 0, animated: true })
  }

  const closeButtery = (day: string): void => {
    updateOpenDays(openDays.filter((a) => a !== day))
    setOpenCount(openCount - 1)
  }

  const handleTimeCard = (day: string): void => {
    if (!openDays.includes(day)) {
      updateOpenDays([...openDays, day])
      setOpenCount(openCount + 1)
    } else {
      closeButtery(day)
    }
  }

  const getDayIconVisual = (day: string, index: number, active: boolean): JSX.Element => {
    return (
      <DayIcon
        key={index}
        text={day}
        active={active}
        openDays={openDays}
        action={(dayOfWeek) => {
          handleTimeCard(dayOfWeek)
        }}
        day={day}
      />
    )
  }

  const getAllDays = (): JSX.Element => {
    const collegeCards: JSX.Element[] = []

    for (let i = 0; i <= daysOfWeek.length - 1; i++) {
      collegeCards.push(getDayIconVisual(daysOfWeek[i], i, openDays.includes(daysOfWeek[i])))
    }

    return (
      <View>
        <View style={styles.daysContainer}>{collegeCards}</View>
      </View>
    )
  }

  const updateCollege = (): void => {
    if (currentCollege == null) return

    const openTime = `${openTimeHour}:${openTimeMinute < 10 ? `0${openTimeMinute}` : openTimeMinute}`
    const closeTime = `${closeTimeHour}:${closeTimeMinute < 10 ? `0${closeTimeMinute}` : closeTimeMinute}`

    const butteryTime: CollegeUpdate = {
      id: currentCollege.id,
      isAcceptingOrders: acceptingOrders,
      daysOpen: openDays,
      openTime,
      closeTime,
      isOpen: currentCollege.isOpen,
    }

    dispatch(asyncUpdateCollege(butteryTime))
    Alert.alert('Your changes have been saved!')
  }

  return (
    <View style={styles.genericContainer}>
      {<EvilModal toggle={setConnection} display={!connection} />}
      {begin ? (
        <View style={styles.genericContainerAligned}>
          <ActivityIndicator color="#555" size="large" />
        </View>
      ) : (
        <ScrollView style={styles.container} ref={scrollViewRef}>
          <View style={styles.sectionContainer}>
            <Text style={styles.headerText}>Days</Text>
            {getAllDays()}
          </View>
          <View style={[styles.sectionContainer]}>
            <TimePicker
              text="Open Time"
              hour={openTimeHour}
              minute={openTimeMinute}
              setHour={setOpenTimeHour}
              setMinute={setOpenTimeMinute}
            />
            <TimePicker
              text="Close Time"
              hour={closeTimeHour}
              minute={closeTimeMinute}
              setHour={setCloseTimeHour}
              setMinute={setCloseTimeMinute}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.headerText}>Accepting Orders</Text>
            <Switch value={acceptingOrders} onValueChange={setAcceptingOrders} />
          </View>
          <View style={styles.button}>
            <Button title="Save Changes" color="rgba(255,255,255, 0.87)" onPress={updateCollege} />
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  headerText: {
    color: 'rgba(255,255,255, 0.87)',
    fontSize: 24,
    fontFamily: 'HindSiliguri-Bold',
    textAlignVertical: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  genericContainer: { width: '100%', height: '100%' },
  genericContainerAligned: { height: '100%', alignItems: 'center' },
  daysContainer: { flexDirection: 'row', justifyContent: 'space-evenly' },
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#121212',
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    marginTop: 10,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  emergencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
  },
  text: {
    textAlignVertical: 'center',
    color: 'rgba(255,255,255, 0.87)',
    fontSize: 24,
    fontFamily: 'HindSiliguri-Bold',
    alignSelf: 'center',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#1877F2',
    borderRadius: 8,
    padding: 5,
    alignSelf: 'center',
    width: 250,
    margin: 10,
  },
  timePicker: {
    width: '100%',
    marginBottom: 'auto',
  },
})
