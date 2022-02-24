import * as React from 'react';
import { Text, View, ScrollView, Pressable, Button } from 'react-native';
import { checkout } from '../styles/CheckoutStyles';
import { CheckoutItem } from '../components/CheckoutItem';

export default function CheckoutScreen( { navigation } : {navigation:any} ) {
  const pressHandler = () => {
    navigation.goBack()
  }
  return (
    <View style={checkout.wrapper}>
      <View style={{flex:1}}>
        <View style={checkout.upperContainer}>
          <ScrollView>
            <View style={checkout.orderDetailsContainer}>
              <CheckoutItem style={checkout.item}/>
              <CheckoutItem style={checkout.item}/>
              <CheckoutItem style={checkout.item}/>
            </View>
          </ScrollView>
          <View style={checkout.footer}><Text style={checkout.totalText}>Total:  $NaN</Text></View>
        </View>
      </View>
      <View style={checkout.lowerContainer}>
        <Pressable style={checkout.checkoutButton}><Text style={checkout.checkoutText}>Complete Order</Text></Pressable>
      </View>
    </View>
  ); 
}
