import React, { FC, useState } from 'react'
import { WebView } from 'react-native-webview'

const CASLoginScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const handleNavigation = (event) => {
    console.log(event)
  }

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

  const handleLogin = (event) => {
    console.log(event.nativeEvent.data)
  }

  return (
    <WebView
      source={{ uri: 'http://localhost:3000/cas' }}
      injectedJavaScript={getHtmlContent}
      style={{ marginTop: 50 }}
      onMessage={handleLogin}
    />
  )
}

export default CASLoginScreen
