import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, Image, Pressable} from 'react-native';
import {item} from '../styles/MenuStyles';


// the bottom component on the menu screen with a checkout button and the current price and number of items
export const MenuCheckout = (props:any) => {

  function priceToText(num: number){
    const dollars = Math.floor(num);
    const cents = Math.floor(num*100 - dollars*100);
    return '$'+dollars+'.'+(cents<10 ? '0' + cents : cents);
  }

  return (
    <View> 
      <View>
        <Text>Price</Text>
        <Text>Number of Items</Text>
      </View>
      <Pressable>
        <Text>Checkout</Text>
      </Pressable>
    </View>
  );
}