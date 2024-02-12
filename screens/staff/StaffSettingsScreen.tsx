import type { NavigationStackProp } from 'react-navigation-stack'
import type { NavigationParams } from 'react-navigation'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Switch, Alert, ActivityIndicator, Button } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { useAppSelector, useAppDispatch } from '../../store/ReduxStore'
import EvilModal from '../../components/EvilModal'
import DayIcon from '../../components/staff/DayIcon'
import { asyncFetchColleges, asyncUpdateCollege } from '../../store/slices/Colleges'
import TimeCard from '../../components/staff/TimeCard'
import { outputTime } from '../../utils/functions'
import type { College } from '../../utils/types'

const SettingsScreen: React.FC<{ navigation: NavigationStackProp<{}, NavigationParams> }> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const [openDays, updateOpenDays] = useState<string[]>([]) // retrieve state once stored
  const [openCount, setOpenCount] = useState(0)

  const [connection, setConnection] = useState(true)

  const { currentUser } = useAppSelector((state) => state.currentUser)
  const { colleges, isLoading } = useAppSelector((state) => state.colleges)

  // openTime info
  const [openTimeHour, setOpenTimeHour] = useState(null)
  const [openTimeMinutes, setOpenTimeMinutes] = useState(null)
  const [openTimeMeridiem, setOpenTimeMeridiem] = useState('')

  // closeTimeinfo
  const [closeTimeHour, setCloseTimeHour] = useState(null)
  const [closeTimeMinutes, setCloseTimeMinutes] = useState(null)
  const [closeTimeMeridiem, setCloseTimeMeridiem] = useState('')

  const [acceptingOrders, setAcceptingOrders] = useState(null)

  const [currentCollege, setCurrentCollege] = useState<College | null>(null)
  const [begin, setBegin] = useState(true)

  useEffect(() => {
    dispatch(asyncFetchColleges()).then((success: boolean) => {
      setConnection(success)
    })
  }, [dispatch, isFocused])

  useEffect(() => {
    if (colleges != null && currentUser != null) {
      const foundCollege = colleges.find((college) => college.id === currentUser.collegeId)
      if (foundCollege == null) throw new Error('No college found')
      setCurrentCollege(foundCollege)
    }

    if (currentCollege != null) {
      const openTime = currentCollege.openTime.split(':')
      const closeTime = currentCollege.closeTime.split(':')

      // setAcceptingOrders(currentCollege.isAcceptingOrders)

      updateOpenDays(currentCollege.daysOpen)
      setOpenCount(currentCollege.daysOpen.length)

      if (openTime[0] >= 12) {
        setOpenTimeMeridiem('PM')
      } else {
        setOpenTimeMeridiem('AM')
      }

      if (closeTime[0] >= 12) {
        setCloseTimeMeridiem('PM')
      } else {
        setCloseTimeMeridiem('AM')
      }

      setOpenTimeHour(openTime[0])
      setOpenTimeMinutes(openTime[1])

      setCloseTimeHour(closeTime[0])
      setCloseTimeMinutes(closeTime[1])

      setAcceptingOrders(currentCollege.isAcceptingOrders)
      setBegin(false)
    }
  }, [currentCollege, isLoading])

  const closeButtery = (day: string) => {
    updateOpenDays(openDays.filter((a) => a !== day))
    setOpenCount(openCount - 1)
  }

  const handleTimeCard = (day: string) => {
    if (!openDays.includes(day)) {
      updateOpenDays([...openDays, day])
      setOpenCount(openCount + 1)
    } else {
      closeButtery(day)
    }
  }

  const getDayIconVisual = (day: string, index: number, active: boolean) => {
    return (
      <DayIcon
        key={index}
        text={day}
        active={active}
        openDays={openDays}
        action={(day) => {
          handleTimeCard(day)
        }}
        day={day}
      />
    )
  }

  const getAllDays = () => {
    const collegeCards: JSX.Element[] = []

    for (let i = 0; i <= daysOfWeek.length - 1; i++) {
      collegeCards.push(getDayIconVisual(daysOfWeek[i], i, openDays.includes(daysOfWeek[i])))
    }

    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>{collegeCards}</View>
      </View>
    )
  }

  const updateCollege = (openTimeAM_PM: string, closeTimeAM_PM: string) => {
    const open = outputTime(openTimeHour, openTimeMinutes, openTimeAM_PM)
    const close = outputTime(closeTimeHour, closeTimeMinutes, closeTimeAM_PM)

    const butteryTime: College = {
      id: currentCollege.id,
      name: currentCollege.name,
      isButteryIntegrated: currentCollege.isButteryIntegrated,
      isAcceptingOrders: acceptingOrders,
      daysOpen: openDays,
      openTime: open,
      closeTime: close,
      isOpen: currentCollege.isOpen,
    }

    dispatch(asyncUpdateCollege(butteryTime))
    Alert.alert('Your changes have been saved!')
  }

  const safetyCheck = () => {
    Alert.alert(
      'Do you want to save these changes?',
      'Any changes made will take place immediately',
      [
        {
          text: "Yes, I'm Sure",
          onPress: () => {
            updateCollege(openTimeMeridiem, closeTimeMeridiem)
          },
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
      ],
      {
        cancelable: true,
      },
    )
  }

  return (
    <View style={{ width: '100%', height: '100%' }}>
      {<EvilModal toggle={setConnection} display={!connection} />}
      {begin ? (
        <View style={{ height: '100%', alignItems: 'center' }}>
          <ActivityIndicator color="#555" style={{ height: '100%', alignSelf: 'center' }} size="large" />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.sectionContainer}>
            <Text style={styles.headerText}>Days</Text>
            {getAllDays()}
          </View>
          <View style={[styles.sectionContainer]}>
            <Text style={styles.headerText}>Open Time</Text>
            <TimeCard
              AM_PM={(am_pm) => {
                setOpenTimeMeridiem(am_pm)
              }}
              hour={(hour) => {
                setOpenTimeHour(hour)
              }}
              minutes={(minutes) => {
                setOpenTimeMinutes(minutes)
              }}
              time={outputTime(openTimeHour, openTimeMinutes)}
            />
            <Text style={styles.headerText}>Close Time</Text>
            <TimeCard
              AM_PM={(am_pm) => {
                setCloseTimeMeridiem(am_pm)
              }}
              hour={(hour) => {
                setCloseTimeHour(hour)
              }}
              minutes={(minutes) => {
                setCloseTimeMinutes(minutes)
              }}
              time={outputTime(closeTimeHour, closeTimeMinutes)}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.headerText}>Accepting orders?</Text>
            <Switch value={acceptingOrders} onValueChange={setAcceptingOrders} />
          </View>
          <View style={styles.button}>
            <Button title="Save Changes" color="rgba(255,255,255, 0.87)" onPress={safetyCheck} />
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
