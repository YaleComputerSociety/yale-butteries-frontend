import { StatusBar } from 'expo-status-bar'
import React, { FC, useEffect } from 'react'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import store from './store/ReduxStore'
import { useAppSelector, useAppDispatch } from './store/TypedHooks'
import { asyncFetchCurrentUser } from './store/slices/CurrentUser'

export default function App() {
  return (
    <Provider store={store}>
      <TestingInner />
    </Provider>
  )
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
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      {isLoadingCurrentUser || currentUser == null ? (
        <Text>{'Loading...'}</Text>
      ) : (
        <Text>{`User ${currentUser.name} loaded.`}</Text>
      )}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
