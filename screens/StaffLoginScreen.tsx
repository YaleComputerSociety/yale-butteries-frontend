import React, {useEffect, FC, useState } from 'react'
import {View, Text, TextInput, Pressable} from 'react-native'
import { staffLogin } from '../styles/StaffLoginStyles'
import { LinearGradient } from 'expo-linear-gradient'
//import {STAFF_USER, STAFF_PASS} from '@env'


const StaffLoginScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const [username, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('');

  function validateForm() {
    return username.length >= 2 && password.length >= 2
  }

  function checkInfo() {
    return username == "username" && password == "password"
  }

  return (
    <LinearGradient colors={['#4E65FF', '#c971b9']} locations={[0, 1]}>
    <View style={{ height: '100%', width: '100%', backgroundColor: 'transparent' }}>
      <View style={staffLogin.outerContainer}>
        <Text style={{ fontSize: 30, color: '#000', fontFamily: 'HindSiliguri-Bolder' }}> Staff Sign-In</Text>
        <TextInput placeholder="username" style={staffLogin.input} onChangeText={setUser}></TextInput>
        <TextInput placeholder="password" style={staffLogin.input} onChangeText={setPassword} secureTextEntry={true}></TextInput>
        <Pressable 
              onPress={() => {
                if (checkInfo()) {
                  navigation.navigate('OrderStatusScreen')
                } else {
                  {setErrorMessage("Password and/or Username is Incorrect. Please Try Again")}
                }
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
              <View style={staffLogin.button}>
                <Text style={{ fontSize: 15, color: '#fff', fontFamily: 'HindSiliguri-Bolder' }}> Sign in</Text>
              </View>
        </Pressable>
        {errorMessage && <Text> {errorMessage} </Text>}
      </View>
      </View>
      </LinearGradient>
  )
}

export default StaffLoginScreen
