//import * as React from 'react'
import React, { FC, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Alert, Pressable } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { useAppSelector, useAppDispatch } from '../../store/ReduxStore'
import { asyncUpdateCurrentUser } from '../../store/slices/CurrentUser'
import Ionicon from 'react-native-vector-icons/Ionicons'
import * as LocalStorage from './../../LocalStorage'
// import * as Animatable from 'react-native-animatable'
import * as Haptics from 'expo-haptics'
import EvilModal from '../../components/EvilModal'

const Settings: FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.currentUser)

  const [newName, setNewName] = useState(currentUser.name)
  const [connection, setConnection] = useState(true)
  const [invalidName, setInvalidName] = useState(false)

  const [successView, setSuccessView] = useState(false)

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
      } else {
        setSuccessView(true)
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        Alert.alert('Successfully Saved!')
        setTimeout(() => {
          setSuccessView(false)
        }, 3000)
      }
    }
  }

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#121212', display: 'flex' }}>
      <EvilModal toggle={setConnection} display={!connection} />
      <ScrollView>
        <Text style={styles.text}>Account Information</Text>
        <View style={styles.titleContainer}>
          <View style={styles.sectionContainer}>
            <Ionicon name="create-outline" size={20} color="rgba(255,255,255,0.81)" />
            <Text style={styles.text2}>Display Name:</Text>
            <TextInput
              value={newName}
              placeholderTextColor="rgba(255,255,255, 0.78)"
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
        {/* <Text style={styles.text}>Payment Information</Text> */}
      </ScrollView>
      <View style={{ marginBottom: 35, alignItems: 'center' }}>
        <Pressable
          onPress={() => navigation.navigate('AboutScreen')}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        >
          <Text
            style={{
              fontFamily: 'Roboto',
              textDecorationLine: 'underline',
              color: 'rgba(255,255,255,0.7)',
              fontSize: 16,
            }}
          >
            About
          </Text>
        </Pressable>
      </View>
      {/* {successView == true && (
        <Animatable.View animation="bounceInUp" iterationCount={2} direction="alternate" style={styles.success}>
          <Text style={styles.successText}>Successfully Saved!</Text>
          <Ionicon name="checkmark-circle" size={20} color="white" />
        </Animatable.View>
      )} */}
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
    width: '30%',
  },
  button_text: {
    fontSize: 18,
    color: '#FAF9F6',
    padding: 5,
    fontFamily: 'HindSiliguri-Bold',
  },
  input_text: {
    fontSize: 18,
    fontFamily: 'HindSiliguri',
    borderBottomColor: '#ddd',
    flex: 1,
    color: 'rgba(255,255,255,0.81)',
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 20,
    marginLeft: 18,
    marginVertical: 10,
    color: 'rgba(255,255,255,0.81)',
    justifyContent: 'center',
    fontFamily: 'HindSiliguri-Bold',
    textAlignVertical: 'center',
  },
  text2: {
    fontSize: 18,
    marginHorizontal: 8,
    color: 'rgba(255,255,255,0.81)',
    justifyContent: 'center',
    fontFamily: 'HindSiliguri-Bold',
    textAlignVertical: 'center',
  },
  sectionContainer: {
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#1f1f1f',
    flexDirection: 'row',
    borderBottomColor: 'black',
    alignItems: 'center',
  },
  titleContainer: {
    marginHorizontal: 18,
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
  error: {
    color: '#bb3333',
    fontFamily: 'HindSiliguri-Bold',
    fontSize: 13,
    marginBottom: 10,
    textAlign: 'center',
  },
  success: {
    margin: 20,
    backgroundColor: '#5dc761',
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  successText: {
    fontSize: 18,
    fontFamily: 'HindSiliguri-Bold',
    color: '#fff',
    margin: 8,
  },
})

export default Settings
