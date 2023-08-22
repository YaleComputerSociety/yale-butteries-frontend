import React, { FC, useState } from 'react'
import { WebView } from 'react-native-webview'
import * as Random from 'expo-random'
import { useAppDispatch } from '../store/ReduxStore'
import { asyncCreateUser } from '../store/slices/Users'
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native'
import EvilModal from '../components/EvilModal'

const CASLoginScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch()

  const [connection, setConnection] = useState(true)
  const [loadingUser, setLoadingUser] = useState(false)

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

  const handleLogin = async (event) => {
    setLoadingUser(true)
    const netID = event.nativeEvent.data
    console.log(netID)
    let token = ''
    token += Random.getRandomBytes(8).toString()

    const newUser = {
      email: 'alphatester@gmail.com',
      netid: netID,
      name: netID,
      college: 'morse',
      token: token,
      permissions: 'customer',
    }

    const success = await dispatch(asyncCreateUser(newUser, netID, token))
    if (!success) {
      setConnection(false)
    }
    setLoadingUser(false)
  }

  return (
    <View style={styles.container}>
      <EvilModal toggle={setConnection} display={!connection} />
      {loadingUser ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      ) : (
        <WebView
          source={{ uri: 'http://localhost:3000/cas' }}
          injectedJavaScript={getHtmlContent}
          style={{ marginTop: 50, flex: 1 }}
          onMessage={handleLogin}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
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
