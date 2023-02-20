import React, { FC, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useAppSelector, useAppDispatch } from './store/TypedHooks'
import { asyncFetchCurrentUser } from './store/slices/CurrentUser'
import { Provider } from 'react-redux'
import { home } from './styles/HomeStyles'
import { loading } from './styles/GlobalStyles'
import { ActivityIndicator, View, Platform } from 'react-native'
import store from './store/ReduxStore'
import AppLoading from 'expo-app-loading'
import AppContainer from './routes/homeStack'
import { IOS_DEV_URL, ANDROID_DEV_URL } from '@env'
// import * as SplashScreen from 'expo-splash-screen'

import * as Font from 'expo-font'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'

export const baseUrl = Platform.OS == 'ios' ? IOS_DEV_URL : ANDROID_DEV_URL
console.log(baseUrl)

const App: FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  const loadFonts = () =>
    Font.loadAsync({
      Roboto: require('./assets/fonts/Roboto-Black.ttf'),
      'HindSiliguri-Bold': require('./assets/fonts/HindSiliguri-SemiBold.ttf'),
      'HindSiliguri-Bolder': require('./assets/fonts/HindSiliguri-Bold.ttf'),
      HindSiliguri: require('./assets/fonts/HindSiliguri-Regular.ttf'),
      'Roboto-Light': require('./assets/fonts/HindSiliguri-Light.ttf'),
      'Roboto-Italic': require('./assets/fonts/Roboto-LightItalic.ttf'),
    })

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <TestingInner />
      </Provider>
    )
  } else {
    return <AppLoading startAsync={loadFonts} onFinish={() => setFontsLoaded(true)} onError={console.warn} />
  }
}

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

export default App
