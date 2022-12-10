//import * as React from 'react'
import React, { FC, useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, TouchableOpacity, Text} from 'react-native'
import { home } from '../styles/HomeStyles'
import { TextInput } from 'react-native-gesture-handler'
import { useAppSelector, useAppDispatch} from '../store/TypedHooks'
import { asyncFetchCurrentUser} from '../store/slices/CurrentUser'


const Settings: React.FC<{ navigation: any }> = ({ navigation }) => {

  const dispatch = useAppDispatch()
  
  const { currentUser, isLoading: isLoadingMenuItems } = useAppSelector((state) => state.currentUser)

  //useEffect(() => {
    //dispatch(asyncFetchCurrentUser())
  //}, [])
  
  return (
    <ScrollView style={home.app} showsVerticalScrollIndicator={false}>
        <View style={home.outerContainer}>
          <TextInput
            placeholder={currentUser.name}
            style={styles.input_text}
            autoCorrect={false}
          />
          <TouchableOpacity
              style={styles.button}>
              <Text style={styles.text}> Update Payment Info </Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.save_button}>
              <Text style={styles.text}> Save </Text>
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
    top: '450%'
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
    top: '200%'
  },
  input_text: {
    fontSize: 25,
    color: 'black',
    justifyContent: 'center',
    fontFamily: 'HindSiliguri-Bolder', 
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    top: '200%'
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
});

export default Settings