import React, { useEffect, useState, FC } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Image,
} from 'react-native'
import { useAppDispatch, useAppSelector } from '../store/ReduxStore'
import { LinearGradient } from 'expo-linear-gradient'
import { asyncCreateUser } from '../store/slices/Users'
import * as Random from 'expo-random'
import EvilModal from '../components/EvilModal'
import { WebView } from 'react-native-webview'

const StartScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [displayError, setDisplayError] = useState(false)
  const [loadingUser, setLoadingUser] = useState(false)
  const [userSet, setUserSet] = useState(false) // weird edge case where user can click staff login the instant the user creation finishes, before the page finishes transitioning to butteries screen
  const [connection, setConnection] = useState(true)

  const { currentUser } = useAppSelector((state) => state.currentUser)

  const onLogin = async () => {
    navigation.navigate('CASLoginScreen')

    // if (name.length <= 2 || name.length >= 16) {
    //   setDisplayError(true)
    // } else {
    //   let token = ''
    //   token += Random.getRandomBytes(8).toString()

    //   const newUser = {
    //     email: 'betatester@gmail.edu',
    //     netid: 'temp',
    //     name: name,
    //     college: 'morse',
    //     token: token,
    //     permissions: 'customer',
    //   }
    //   setLoadingUser(true)
    //   setUserSet(true)
    //   const success = await dispatch(asyncCreateUser(newUser, name, token))
    //   if (!success) {
    //     setConnection(false)
    //   }
    //   setLoadingUser(false)
    // }
  }

  useEffect(() => {
    if (currentUser) {
      navigation.navigate('ButteriesScreen')
    }
  }, [currentUser])

  const handleStaffPress = () => {
    navigation.navigate('StaffLoginScreen')
  }

  return (
    <LinearGradient colors={['#4E65FF', '#0CBABA']} locations={[0, 1]}>
      <EvilModal toggle={setConnection} display={!connection} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ height: '100%', width: '100%', backgroundColor: 'transparent' }}>
          <View style={styles.style1}>
            <View>
              <Image source={require('../assets/images/logo_transparent.png')} style={styles.logo} />
              <Text style={{ fontSize: 38, color: '#fff', marginBottom: 20, fontFamily: 'HindSiliguri-Bolder' }}>
                Yale<Text style={{ color: '#344a61' }}>Butteries</Text>
              </Text>
            </View>
            {loadingUser && <ActivityIndicator size="large" />}
            <Pressable onPress={onLogin} style={styles.button} disabled={userSet}>
              <Text style={styles.casText}>Login with CAS</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  staffLogin: {
    fontSize: 15,
    color: '#444',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  container: {
    width: '100%',
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
  style2: {
    backgroundColor: '#1084ff',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 5,
    width: 200,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  style3: {
    backgroundColor: '#344a61',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 5,
    width: 200,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  style4: {
    flex: 1,
    width: '90%',
    height: '60%',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: '40%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  style5: {
    alignSelf: 'flex-end',
    marginTop: '39%',
    backgroundColor: '#033569',
    height: 25,
    width: 25,
    marginRight: '4%',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    marginTop: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#222',
    padding: 10,
    fontFamily: 'HindSiliguri',
  },
  button: {
    backgroundColor: '#00356b',
    padding: 7,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  casText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'HindSiliguri-Bold',
    letterSpacing: 0.7,
  },
  error: {
    color: '#bb3333',
    fontFamily: 'HindSiliguri',
    fontSize: 11,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
})

export default StartScreen
