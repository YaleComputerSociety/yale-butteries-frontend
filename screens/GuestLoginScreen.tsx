import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
import { asyncVerifyStaffLogin } from '../store/slices/CurrentUser'
import { useAppDispatch, useAppSelector } from '../store/ReduxStore'
import { asyncCreateUser } from '../store/slices/Users'
import type { MainStackScreenProps, NewUser } from '../utils/types'

const GuestLoginScreen: FC<MainStackScreenProps<'GuestLoginScreen'>> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const [username, setUser] = useState('')
  const [password, setPassword] = useState('')

  const { currentUser } = useAppSelector((state) => state.currentUser)

  const checkInfo = async (): Promise<void> => {
    const verified = await asyncVerifyStaffLogin(username, password)
    if (verified) {
      const newUser: NewUser = {
        netId: 'guest',
        collegeId: 14,
        role: 'CUSTOMER',
      }

      dispatch(asyncCreateUser(newUser))
    }
  }

  useEffect(() => {
    if (currentUser != null) {
      navigation.navigate('ButteriesScreen')
    }
  }, [currentUser, navigation])

  return (
    <View style={styles.style1}>
      <Text style={[styles.casText, styles.guestLoginText]}>Guest Login</Text>
      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={setUser}
        value={username}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Pressable style={({ pressed }) => [styles.button, { opacity: pressed ? 0.85 : 1 }]} onPress={checkInfo}>
        <Text style={styles.casText}>Login</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  guestLoginText: { fontSize: 24 },
  logoText: {
    fontSize: 38,
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'HindSiliguri-Bolder',
  },
  style1: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#1f1f1f',
  },
  input: {
    height: 40,
    margin: 12,
    width: '60%',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#555',
    width: '30%',
    justifyContent: 'center',
    borderRadius: 8,
    height: 40,
    margin: 10,
  },
  casText: {
    fontSize: 17,
    color: 'white',
    fontFamily: 'HindSiliguri-Bold',
    letterSpacing: 0.7,
    alignSelf: 'center',
  },
  logo: {
    width: 125,
    height: 125,
    alignSelf: 'center',
  },
})

export default GuestLoginScreen
