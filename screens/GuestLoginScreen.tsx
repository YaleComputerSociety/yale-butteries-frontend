import React, { useState, FC, useEffect } from 'react'
import { StyleSheet, View, Text, Pressable, Dimensions, TextInput } from 'react-native'
import * as Random from 'expo-crypto'
import { asyncVerifyStaffLogin, setCurrentUserState } from '../store/slices/CurrentUser'
import { useAppDispatch, useAppSelector } from '../store/ReduxStore'
import { asyncCreateUser } from '../store/slices/Users'

const GuestLoginScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const onGuest = () => {
    navigation.navigate('GuestLoginScreen')
  }
  const [username, setUser] = useState('')
  const [password, setPassword] = useState('')

  const { currentUser } = useAppSelector((state) => state.currentUser)
  const [loadingUser, setLoadingUser] = useState(false)
  const [connection, setConnection] = useState(true)

  const checkInfo = async () => {
    const verified = await asyncVerifyStaffLogin(username, password)
    if (verified) {
      let token = ''
      token += Random.getRandomBytes(8).toString()

      const newUser = {
        email: 'appleDevTester@gmail.com',
        netid: 'staff',
        name: username,
        college: 'morse',
        token: password,
        permissions: 'dev',
      }

      dispatch(asyncCreateUser(newUser, token)).then((success) => {
        if (!success) {
          setConnection(false)
        }
        setLoadingUser(false)
      })
    }
  }

  useEffect(() => {
    if (currentUser) {
      navigation.navigate('ButteriesScreen')
    }
  }, [currentUser])

  return (
    <View style={styles.style1}>
      <Text style={[styles.casText, { fontSize: 24 }]}>Guest Login</Text>
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
      <Pressable style={({ pressed }) => [styles.button, { opacity: pressed ? 0.85 : 1 }]} onPress={checkInfo}>
        <Text style={styles.casText}>Login</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
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
