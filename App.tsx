import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Provider } from 'react-redux'
import { View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ScreenOrientation from 'expo-screen-orientation'

import store, { useAppDispatch } from './store/ReduxStore'
import { asyncFetchUser } from './store/slices/CurrentUser'
import { home } from './styles/ButteriesStyles'
import AppNavigator from './routes/mainStackNavigator'
import * as LocalStorage from './utils/localStorage'
import { setIsLoading } from './store/slices/Users'
import EvilModal from './components/EvilModal'

// LogBox.ignoreLogs(['new NativeEventEmitter']) // Ignore log notifications by message

const InnerApp: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false)
  const [connection, setConnection] = useState(true)
  const dispatch = useAppDispatch()

  void SplashScreen.preventAutoHideAsync()

  const loadFonts = async (): Promise<void> => {
    await Font.loadAsync({
      Roboto: require('./assets/fonts/Roboto-Black.ttf'),
      'Roboto-Light': require('./assets/fonts/HindSiliguri-Light.ttf'),
      'Roboto-Italic': require('./assets/fonts/Roboto-LightItalic.ttf'),
      HindSiliguri: require('./assets/fonts/HindSiliguri-Regular.ttf'),
      'HindSiliguri-Bold': require('./assets/fonts/HindSiliguri-SemiBold.ttf'),
      'HindSiliguri-Bolder': require('./assets/fonts/HindSiliguri-Bold.ttf'),
    })
  }

  useEffect(() => {
    const establishUser = async (): Promise<void> => {
      try {
        // AsyncStorage.clear()

        // Check if user already exists in local storage
        const userInfo = await LocalStorage.getUserInfo('token')
        const id = await LocalStorage.getUserInfo('id')
        if (userInfo != null && id != null) {
          // sets the current user state to a user, if it can't connect to the database then show evil modal
          await dispatch(asyncFetchUser(id)).then((result: 'good' | 'error' | 'missing') => {
            if (result === 'error') {
              setConnection(false)
            } else if (result === 'missing') {
              void AsyncStorage.clear()
            }
          })
        } else {
          dispatch(setIsLoading(false))
        }
      } catch (e) {
        console.warn(e)
      }
    }

    const prepare = async (): Promise<void> => {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync()

        await loadFonts()
        await establishUser()

        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT).catch(() => {})
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    void prepare()
  }, [dispatch])

  useEffect(() => {
    const finishedLoading = async (): Promise<void> => {
      if (appIsReady) {
        await SplashScreen.hideAsync()
      }
    }
    void finishedLoading()
  }, [appIsReady])

  if (appIsReady) {
    return (
      <View style={home.container}>
        <EvilModal toggle={setConnection} display={!connection} />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    return null
  }
}

// seperate outer component for redux store to work on the inner component
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <InnerApp />
    </Provider>
  )
}

export default App
