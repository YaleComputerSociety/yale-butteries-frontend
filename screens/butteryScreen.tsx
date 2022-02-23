import React from 'react';
import { Text, View, Button} from 'react-native';

export default function butteryScreen( {navigation} : {navigation:any} ) { 
  const pressHandler = () => {
    navigation.goBack()
  }
  return (
    <View>
      <Text>{navigation.getParam('college_Name')}</Text>
    </View>
  )
}