import React from 'react';
import { View, ImageBackground, Text, Image, Pressable} from 'react-native';
import { checkout } from '../styles/CheckoutStyles';

export const CheckoutItem = (props:any) => {
  return (
    <View style={checkout.item}>
      <Text>{props.Name}</Text>
      <Text>{props.Price}</Text>
      <Text>{props.Count}</Text>
    </View>
  );
}

CheckoutItem.defaultProps = {
  Name: 'Hello World!',
  Price: '$2.00',
  Count: '1'
}