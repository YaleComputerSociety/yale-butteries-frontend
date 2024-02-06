import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { WebView } from 'react-native-webview'
import { useAppDispatch, useAppSelector } from '../store/ReduxStore'
import { asyncCreateUser } from '../store/slices/Users'
import type { NativeSyntheticEvent } from 'react-native'
import { ActivityIndicator, View, StyleSheet, AppState } from 'react-native'
import EvilModal from '../components/EvilModal'
import { useIsFocused } from '@react-navigation/native'
import { baseUrl } from '../utils/constants'
import type { MainStackScreenProps, NewUser } from '../utils/types'

const CASLoginScreen: FC<MainStackScreenProps<'CASLoginScreen'>> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()

  const { currentUser } = useAppSelector((state) => state.currentUser)
  const [connection, setConnection] = useState(true)
  const [loadingUser, setLoadingUser] = useState(false)
  const [initial, setInitial] = useState(true)
  const [netId, setNetId] = useState('')

  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  // Find out if the user is currently in the app, for duo push glitches
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      appState.current = nextAppState
      setAppStateVisible(appState.current)
    })

    return () => {
      subscription.remove()
    }
  }, [])

  // Only try to create the user once the user has successfully logged in AND they're inside the app. Otherwise, duo push will sometimes crash the app
  useEffect(() => {
    if (loadingUser && appStateVisible === 'active') {
      const newUser: NewUser = {
        netId,
        collegeId: 14,
        role: 'CUSTOMER',
      }

      dispatch(asyncCreateUser(newUser)).then((success: boolean) => {
        if (!success) {
          setConnection(false)
        }
        setLoadingUser(false)
      })
    }
  }, [loadingUser, appStateVisible, netId, dispatch])

  // Prevent the injected javascript from running twice
  useEffect(() => {
    setInitial(true)
  }, [])

  useEffect(() => {
    if (isFocused && currentUser != null) {
      if (currentUser.role === 'STAFF') {
        navigation.navigate('NavigationScreen')
      } else {
        navigation.navigate('ButteriesScreen')
      }
    }
  }, [currentUser, isFocused, navigation])

  // Once the user logs in with CAS, use the netid to either create a new user, or reference the existing user
  const handleLogin = (event: NativeSyntheticEvent<{ data: string }>): void => {
    if (initial) {
      setNetId(event.nativeEvent.data)
      setLoadingUser(true)
    }
    setInitial(false)
  }

  /* eslint-disable no-useless-escape */
  // Javascript to inject into the webview
  // takes the html content, checks whether it's the correct page, and sends the netid of the logged in user if it is
  const getHtmlContent = `
    (function() {
      var html = document.documentElement.innerHTML;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const bodyText = doc.body.textContent;
      const regex = /^\{"netId":"[a-zA-Z0-9]+"\}$/;
      if (regex.test(bodyText)) {
        const jsonBody = JSON.parse(bodyText);
        const netID = jsonBody.netId;
        window.ReactNativeWebView.postMessage(netID);
      }
    })();
  `
  /* eslint-enable no-useless-escape */

  return (
    <View style={styles.container}>
      <EvilModal toggle={setConnection} display={!connection} />
      {loadingUser ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      ) : (
        <WebView
          source={{ uri: baseUrl + 'cas' }}
          injectedJavaScript={getHtmlContent}
          style={styles.webView}
          onMessage={handleLogin}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  webView: { flex: 1, marginTop: 0, marginBottom: 0 },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CASLoginScreen
