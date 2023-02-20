import React, { FC, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useAppSelector, useAppDispatch } from './store/TypedHooks'
import { asyncFetchCurrentUser } from './store/slices/CurrentUser'
import { Provider } from 'react-redux'
import { home } from './styles/HomeStyles'
import { loading } from './styles/GlobalStyles'
import { ActivityIndicator, View, LogBox } from 'react-native'
import store from './store/ReduxStore'
import * as SplashScreen from 'expo-splash-screen'
import AppContainer from './routes/homeStack'

import * as Font from 'expo-font'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'

LogBox.ignoreLogs(['new NativeEventEmitter']) // Ignore log notifications by message

const TestingInner: FC = () => {
  const dispatch = useAppDispatch()
  const { currentUser, isLoading: isLoadingCurrentUser } = useAppSelector((state) => state.currentUser)
  useEffect(() => {
    if (currentUser == null) {
      dispatch(asyncFetchCurrentUser())
    }
  }, [currentUser])

  return (
    <View style={home.container}>
      {isLoadingCurrentUser || currentUser == null ? (
        <View style={loading.container}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <NavigationContainer>
          <AppContainer />
          {/* <ManagerStack /> */}
        </NavigationContainer>
      )}
      <StatusBar style="auto" />
    </View>
  )
}

const App: FC = () => {
  const [appIsReady, setAppIsReady] = useState(false)

  const loadFonts = () =>
    Font.loadAsync({
      Roboto: require('./assets/fonts/Roboto-Black.ttf'),
      'HindSiliguri-Bold': require('./assets/fonts/HindSiliguri-SemiBold.ttf'),
      'HindSiliguri-Bolder': require('./assets/fonts/HindSiliguri-Bold.ttf'),
      HindSiliguri: require('./assets/fonts/HindSiliguri-Regular.ttf'),
      'Roboto-Light': require('./assets/fonts/HindSiliguri-Light.ttf'),
      'Roboto-Italic': require('./assets/fonts/Roboto-LightItalic.ttf'),
    })

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync()
        // Pre-load fonts, make any API calls you need to do here
        await loadFonts()
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  useEffect(() => {
    async function finishedLoading() {
      if (appIsReady) {
        // This tells the splash screen to hide immediately! If we call this after
        // `setAppIsReady`, then we may see a blank screen while the app is
        // loading its initial state and rendering its first pixels. So instead,
        // we hide the splash screen once we know the root view has already
        // performed layout.
        await SplashScreen.hideAsync()
      }
    }
    finishedLoading()
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  if (appIsReady) {
    return (
      <Provider store={store}>
        <TestingInner />
      </Provider>
    )
  }
}

export default App
