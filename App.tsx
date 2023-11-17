import React, { FC, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import store, { useAppDispatch } from './store/ReduxStore'
import { asyncFetchUser } from './store/slices/CurrentUser'
import { Provider } from 'react-redux'
import { home } from './styles/ButteriesStyles'
import { View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ScreenOrientation from 'expo-screen-orientation'

import AppContainer from './routes/mainStack'
import * as LocalStorage from './LocalStorage'
import { setIsLoading } from './store/slices/Users'
import EvilModal from './components/EvilModal'

// LogBox.ignoreLogs(['new NativeEventEmitter']) // Ignore log notifications by message

const InnerApp: FC = () => {
  const [appIsReady, setAppIsReady] = useState(false)
  const [connection, setConnection] = useState(true)
  const dispatch = useAppDispatch()

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('./assets/fonts/Roboto-Black.ttf'),
      'Roboto-Light': require('./assets/fonts/HindSiliguri-Light.ttf'),
      'Roboto-Italic': require('./assets/fonts/Roboto-LightItalic.ttf'),
      HindSiliguri: require('./assets/fonts/HindSiliguri-Regular.ttf'),
      'HindSiliguri-Bold': require('./assets/fonts/HindSiliguri-SemiBold.ttf'),
      'HindSiliguri-Bolder': require('./assets/fonts/HindSiliguri-Bold.ttf'),
    })
  }

  const establishUser = async () => {
    try {
      AsyncStorage.clear()

      // Check if user already exists in local storage
      const userInfo = await LocalStorage.getUserInfo('token')
      const id = await LocalStorage.getUserInfo('id')
      if (userInfo && id) {
        // sets the current user state to a user, if it can't connect to the database then show evil modal
        await dispatch(asyncFetchUser(id)).then((result: 'good' | 'error' | 'missing') => {
          console.log(id)
          if (result === 'error') {
            setConnection(false)
          } else if (result === 'missing') {
            AsyncStorage.clear()
          }
        })
      } else {
        dispatch(setIsLoading(false))
      }
    } catch (e) {
      console.warn(e)
    }
  }

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync()
        // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        await loadFonts()
        await establishUser()
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  useEffect(() => {
    async function finishedLoading() {
      if (appIsReady) {
        await SplashScreen.hideAsync()
      }
    }
    finishedLoading()
  }, [appIsReady])

  if (appIsReady) {
    return (
      <View style={home.container}>
        <EvilModal toggle={setConnection} display={!connection} />
        <NavigationContainer>
          <AppContainer />
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    return null
  }
}

// seperate outer component for redux store to work on the inner component

const App: FC = () => {
  return (
    <Provider store={store}>
      <InnerApp />
    </Provider>
  )
}

export default App
