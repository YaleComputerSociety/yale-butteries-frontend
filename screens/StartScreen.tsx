import type { FC } from 'react'
import React, { useState } from 'react'
import { StyleSheet, View, Text, Pressable, TouchableWithoutFeedback, Keyboard, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import EvilModal from '../components/EvilModal'

const StartScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const [connection, setConnection] = useState(true)

  const onLogin = (): void => {
    navigation.navigate('CASLoginScreen')
  }

  const onGuest = (): void => {
    navigation.navigate('GuestLoginScreen')
  }

  return (
    <LinearGradient colors={['#4E65FF', '#0bcaca']} locations={[0, 1]}>
      <EvilModal toggle={setConnection} display={!connection} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.style1}>
            <View>
              <Image source={require('../assets/images/logo_transparent.png')} style={styles.logo} />
              <Text numberOfLines={1} adjustsFontSizeToFit style={styles.logoText}>
                Yale<Text style={styles.yaleTitle}>Butteries</Text>
              </Text>
            </View>
            <Pressable onPress={onLogin} style={({ pressed }) => [styles.button, { opacity: pressed ? 0.85 : 1 }]}>
              <Text style={styles.casText}>Login with CAS</Text>
            </Pressable>
          </View>
          <Pressable onPress={onGuest} style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}>
            <Text style={styles.guestLoginText}>Login as Guest</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  guestLoginText: { textDecorationLine: 'underline', alignSelf: 'center', color: '#444', marginBottom: 30 },
  yaleTitle: { color: '#00356b' },
  container: { height: '100%', width: '100%', backgroundColor: 'transparent' },
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
    width: '60%',
    height: '60%',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#0e7df0',
    padding: 7,
    paddingHorizontal: 35,
    width: '95%',
    justifyContent: 'center',
    borderRadius: 8,
    shadowColor: '#111',
    shadowRadius: 10,
    shadowOpacity: 0.1,
    height: 45,
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

StartScreen.navigationOptions = () => {
  return {
    gestureEnabled: false,
  }
}

export default StartScreen
