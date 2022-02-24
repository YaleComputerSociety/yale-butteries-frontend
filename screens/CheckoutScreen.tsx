import * as React from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { checkout } from '../styles/CheckoutStyles';
import { CheckoutItem } from '../components/CheckoutItem';

export default function CheckoutScreen( { navigation } : {navigation:any} ) {
  const pressHandler = () => {
    navigation.goBack()
  }
  return (
    <View style={checkout.wrapper}>
      <View style={checkout.upperContainer}>
        <View style={checkout.orderDetailsContainer}>
          <CheckoutItem style={checkout.item}/>
          <CheckoutItem style={checkout.item}/>
          <CheckoutItem style={checkout.item}/>
        </View>
      </View>
      <View style={checkout.lowerContainer}>

      </View>
    </View>
  ); 
}
