//import * as React from 'react'
import React, { FC, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { useAppSelector, useAppDispatch } from '../../store/ReduxStore'
import { asyncUpdateCurrentUser } from '../../store/slices/CurrentUser'
import Ionicon from 'react-native-vector-icons/Ionicons'
import * as LocalStorage from './../../LocalStorage'
import EvilModal from '../../components/EvilModal'

const Settings: FC<{ navigation: any }> = () => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.currentUser)

  const [newName, setNewName] = useState(currentUser.name)
  const [connection, setConnection] = useState(true)
  const [invalidName, setInvalidName] = useState(false)

  const changeName = async (name: string) => {
    const id = await LocalStorage.getUserInfo('id')
    if (name.length <= 2 || name.length >= 16) {
      setInvalidName(true)
    } else {
      setInvalidName(false)
      const updatedCurrentUser = {
        id: parseInt(id),
        name: name,
        college: null,
        permissions: null,
        token: null,
        email: null,
        netid: currentUser.netid,
      }
      const success = await dispatch(asyncUpdateCurrentUser(updatedCurrentUser))
      if (!success) {
        setConnection(false)
      }
    }
  }

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#eee', display: 'flex' }}>
      <EvilModal toggle={setConnection} display={!connection} />
      <ScrollView>
        <Text style={styles.text}>Account</Text>
        <View style={styles.titleContainer}>
          <View style={styles.sectionContainer}>
            <Ionicon name="create-outline" size={20} color="black" />
            <Text style={styles.text2}>Display Name:</Text>
            <TextInput
              value={newName}
              placeholderTextColor="#000"
              placeholder={newName}
              style={styles.input_text}
              onChangeText={setNewName}
              maxLength={30}
            />
          </View>
          {invalidName && <Text style={styles.error}>Please enter a name between 3 and 15 characters</Text>}
          <TouchableOpacity style={styles.save_button} onPress={() => changeName(newName)}>
            <Text style={styles.button_text}> Save </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  save_button: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#54a1e4',
    borderRadius: 8,
    alignItems: 'center',
    width: '25%',
  },
  button_text: {
    fontSize: 15,
    color: '#FAF9F6',
    padding: 5,
    fontFamily: 'HindSiliguri-Bold',
  },
  input_text: {
    fontSize: 15,
    fontFamily: 'HindSiliguri',
    borderBottomColor: '#ddd',
    flex: 1,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 18,
    marginLeft: 18,
    marginVertical: 10,
    color: 'black',
    justifyContent: 'center',
    fontFamily: 'HindSiliguri-Bold',
    textAlignVertical: 'center',
  },
  text2: {
    fontSize: 15,
    marginHorizontal: 8,
    color: 'black',
    justifyContent: 'center',
    fontFamily: 'HindSiliguri-Bold',
    textAlignVertical: 'center',
  },
  sectionContainer: {
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#FAF9F6',
    flexDirection: 'row',
    borderBottomColor: 'black',
  },
  titleContainer: {
    marginHorizontal: 18,
    backgroundColor: '#FAF9F6',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
  error: {
    color: '#bb3333',
    fontFamily: 'HindSiliguri',
    fontSize: 11,
    marginLeft: 120,
    marginBottom: 10,
  },
})

export default Settings
