import React from 'react';
import { View, ImageBackground, Text, Image, Pressable} from 'react-native';
import { checkout } from '../styles/CheckoutStyles';

export const CheckoutItem = (props:any) => {
  return (
    <View style={checkout.item}>
      <Text style={checkout.itemNameText}>{props.Name}</Text>
      <Text>{props.Count}</Text>
      <Text>{props.Price}</Text>
    </View>
  );
}

CheckoutItem.defaultProps = {
  Name: 'Hello World!',
  Price: '$2.00',
  Count: '1'
}