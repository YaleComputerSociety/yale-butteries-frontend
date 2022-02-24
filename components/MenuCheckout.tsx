import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, Image, Pressable} from 'react-native';
import { item , checkout} from '../styles/MenuStyles';

function priceToText(num: number){
  const dollars = Math.floor(num);
  const cents = Math.floor(num*100 - dollars*100);
  return '$'+dollars+'.'+(cents<10 ? '0' + cents : cents);
}

// the bottom component on the menu screen with a checkout button and the current price and number of items

export const MenuCheckout = (props:any) => {
  return (
    <View style={checkout.outerContainer}> 
      <View style={item.upperContainer}>
        <Text style={item.priceText}>Total: $10.00 </Text>
        <Text style={item.priceText}>Item Count: 4</Text>
      </View>
      <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#222' : '#333' }, item.lowerContainer]}><Text style={item.checkoutText}>Checkout</Text></Pressable>
    </View>
  );
}