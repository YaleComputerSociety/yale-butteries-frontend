import React, { useState} from 'react';
import { View, Text, Pressable} from 'react-native';
import { item } from '../styles/MenuStyles';

export const MenuItem = (props:any) => {
  const [quantity, setQuantity] = useState(0);

  function priceToText(num: number){
    const dollars = Math.floor(num);
    const cents = Math.floor(num*100 - dollars*100);
    return '$'+dollars+'.'+(cents<10 ? '0' + cents : cents);
  }

  const incrementQuantity = () => {
    if(quantity<12) setQuantity(quantity+1);
  }

  const decrementQuantity = () => {
    if(quantity>0) setQuantity(quantity-1);
  }

  return (
    <View style={item.card}>
      <View style={item.leftSide}>
        <View style={item.spacer}/>
        <Text style={item.itemName}>{props.name}</Text>
        <Text style={item.itemDescription}>{props.description}</Text>
        <Text style={item.itemPrice}>{priceToText(props.price)}</Text>
      </View>
      
      <View style={item.spacer}/>
      <Pressable onPress={decrementQuantity} style={({ pressed }) => [{ backgroundColor: pressed ? '#bbb' : '#eee' }, item.button ]}>
        <Text style={item.buttonText}>-</Text>
      </Pressable>
      <View style={item.spacer}>
        <Text style={item.countText}>{quantity}</Text>
      </View>
      <Pressable onPress={incrementQuantity} style={({ pressed }) => [{ backgroundColor: pressed ? '#bbb' : '#eee' }, item.button ]}>
        <Text style={item.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

MenuItem.defaultProps = {
  name: 'Uundefined',
  price: 0,
}