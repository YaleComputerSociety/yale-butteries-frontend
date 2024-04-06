// This screen is unused and will be deleted eventually

import type { FC } from 'react'
import React, { useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicon from 'react-native-vector-icons/Ionicons'

import { staffLogin } from '../../styles/StaffLoginStyles'
import * as LocalStorage from '../../utils/localStorage'
import { asyncVerifyStaffLogin, setCurrentUserState } from '../../store/slices/CurrentUser'
import { useAppDispatch } from '../../store/ReduxStore'
import { baseUrl } from '../../utils/constants'
import { asyncFetchMenuItems } from '../../store/slices/MenuItems'

const StaffLoginScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const [username, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useAppDispatch()
  const [backendError, setBackendError] = useState(false)
  const checkInfo = async () => {
    const verified = await asyncVerifyStaffLogin(username, password)

    if (verified == undefined) {
      setBackendError(true)
    }

    if (verified) {
      const info: Array<[string, string]> = [
        ['username', username],
        ['permissions', 'STAFF'],
        ['id', JSON.stringify(3)],
        ['token', password],
      ]
      LocalStorage.storeUserInfo(info)
      try {
        const user = await fetch(baseUrl + 'api/users/' + 3, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await user.json()
        await dispatch(setCurrentUserState(data))
        await dispatch(asyncFetchMenuItems())
      } catch (e) {
        console.log(e)
      }

      navigation.navigate('StaffRenderScreen')
    } else {
      setErrorMessage('Password and/or Username is Incorrect. Please Try Again')
    }
  }

  return (
    <LinearGradient colors={['#4E65FF', '#c971b9']} locations={[0, 1]}>
      {/* <EvilModal display={backendError} /> */}
      <View style={{ height: '100%', width: '100%', backgroundColor: 'transparent' }}>
        <Ionicon
          name="chevron-back"
          size={30}
          color="#fff"
          onPress={() => {
            navigation.navigate('StartScreen')
          }}
          style={{ paddingLeft: 15, paddingTop: 45, fontSize: 40 }}
        />
        <View style={staffLogin.outerContainer}>
          <Text style={{ fontSize: 30, color: '#000', fontFamily: 'HindSiliguri-Bolder' }}>Staff Sign-In</Text>
          <TextInput
            placeholder="Username"
            value={username}
            style={staffLogin.input}
            onChangeText={setUser}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            style={staffLogin.input}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Pressable
            onPress={async () => {
              await checkInfo()
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          >
            <View style={staffLogin.button}>
              <Text style={{ fontSize: 15, color: '#fff', fontFamily: 'HindSiliguri-Bolder' }}>Sign in</Text>
            </View>
          </Pressable>
          {errorMessage && <Text> {errorMessage} </Text>}
        </View>
      </View>
    </LinearGradient>
  )
}

export default StaffLoginScreen
