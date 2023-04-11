//import * as React from 'react'
import React, { FC, useState } from 'react'
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { home } from '../../styles/ButtereiesStyles'
import { TextInput } from 'react-native-gesture-handler'
import { useAppSelector, useAppDispatch } from '../../store/ReduxStore'
import { asyncUpdateCurrentUser } from '../../store/slices/CurrentUser'
import { clearAsyncStorage } from '../../LocalStorage'
import * as LocalStorage from './../../LocalStorage'

const Settings: FC<{ navigation: any }> = () => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.currentUser)

  const [newName, setNewName] = useState('')

  const changeName = async (name: string) => {
    const id = await LocalStorage.getUserInfo('id')
    console.log('name changed')
    if (name.length >= 2 || name.length <= 16) {
      const updatedCurrentUser = {
        id: parseInt(id),
        name: name,
        college: null,
        permissions: null,
        token: null,
        email: null,
        netid: currentUser.netid,
      }
      console.log(updatedCurrentUser)
      dispatch(asyncUpdateCurrentUser(updatedCurrentUser))
    }
  }

  return (
    <ScrollView style={home.app} showsVerticalScrollIndicator={false}>
      <View style={home.outerContainer}>
        <TextInput
          placeholder={currentUser.name}
          style={styles.input_text}
          autoCorrect={false}
          onChangeText={(t) => setNewName(t)}
        />
        <TouchableOpacity style={styles.save_button} onPress={() => changeName(newName)}>
          <Text style={styles.text}> Save </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.save_button} onPress={() => clearAsyncStorage()}>
          <Text style={styles.text}> Clear Async Storage </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}> Update Payment Info </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#00b2db',
    alignSelf: 'center',
    marginTop: 200,
  },
  save_button: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginTop: 50,
  },
  input_text: {
    fontSize: 25,
    color: 'black',
    justifyContent: 'center',
    fontFamily: 'HindSiliguri-Bolder',
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: 150,
  },
  text: {
    fontSize: 20,
    color: 'white',
    justifyContent: 'center',
    fontFamily: 'HindSiliguri-Bolder',
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
})

export default Settings
