import React, { useEffect, FC } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native'
import { useAppSelector } from '../store/ReduxStore'

// This is the screen after the splash screen, before we decide what screen to put the user on while we wait to see who the user is/connect to the backend
const Dummy: FC<{ navigation: any }> = ({ navigation }) => {
  const { currentUser, isLoading: isLoadingCurrentUser } = useAppSelector((state) => state.currentUser)
  const { currentTransactionHistory } = useAppSelector((state) => state.transactionHistory)

  useEffect(() => {
    if (!isLoadingCurrentUser) {
      if (currentUser) {
        if (currentUser.permissions === 'customer') {
          if (currentTransactionHistory) {
            navigation.navigate('OrderStatusScreen')
          } else {
            navigation.navigate('ButteriesScreen')
          }
        } else if (currentUser.permissions === 'staff') {
          navigation.navigate('StaffRenderScreen')
        }
      } else {
        navigation.navigate('StartScreen')
      }
    }
  }, [isLoadingCurrentUser])

  return (
    <View style={styles.style1}>
      <Text style={styles.text}>
        Yale<Text style={{ color: '#344a61' }}>Butteries</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  style1: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D90DD',
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 42,
    color: '#fff',
    marginBottom: 15,
    fontFamily: 'HindSiliguri-Bolder',
  },
})

export default Dummy
