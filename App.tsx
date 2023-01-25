import React, { FC, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useAppSelector, useAppDispatch } from './store/TypedHooks'
import { asyncFetchCurrentUser } from './store/slices/CurrentUser'
import { Provider } from 'react-redux'
import { home } from './styles/HomeStyles'
import { loading } from './styles/GlobalStyles'
import { ActivityIndicator, View } from 'react-native'
import store from './store/ReduxStore'
import AppLoading from 'expo-app-loading'
import Navigator from './routes/homeStack'
import * as Font from 'expo-font'
import 'react-native-gesture-handler'

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
  })

  return (
    <View style={home.container}>
      {isLoadingCurrentUser || currentUser == null ? (
        <View style={loading.container}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Navigator /> //login page ?? --> to buttery navigator
      )}
      <StatusBar style="auto" />
    </View>
  )
}

export default App
