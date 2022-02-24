import React from 'react';
import { View, ImageBackground, Text, Image, Pressable} from 'react-native';
import { checkout } from '../styles/CheckoutStyles';

export const CheckoutItem = (props:any) => {
  return (
    <View style={checkout.item}>
      <View style={checkout.NAME}><Text style={checkout.itemNameText}>{props.Name}</Text></View>
      <View style={checkout.COUNT}><Text style={checkout.text}>{props.Count}</Text></View>
      <View style={checkout.PRICE}><Text style={checkout.text}>{props.Price}</Text></View>
    </View> 
  );
}

CheckoutItem.defaultProps = {
  Name: 'Chicken Sandwhich',
  Price: '$2.00',
  Count: '10'
}