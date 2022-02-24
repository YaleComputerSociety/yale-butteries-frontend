import React, { useState} from 'react';
import { View, Text, Pressable} from 'react-native';
import { item } from '../styles/MenuStyles';

export const MenuItem = (props:any) => {
  const [quantity, setLocalQuantity] = useState(0);
  const [totalItems, setGlobalQuantity] = useState(0);

  function priceToText(num: number){
    const dollars = Math.floor(num);
    const cents = Math.floor(num*100 - dollars*100);
    return '$'+dollars+'.'+(cents<10 ? '0' + cents : cents);
  }

  const incrementQuantity = () => {
    if(quantity<12) setLocalQuantity(quantity+1); setGlobalQuantity(totalItems+1);
  }

  const decrementQuantity = () => {
    if(quantity>0) setLocalQuantity(quantity-1);  setGlobalQuantity(totalItems-1);
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
      <View style={item.buttonSpacer}>
        <Text style={item.countText}>{quantity}</Text>
      </View>
      <Pressable onPress={incrementQuantity} style={({ pressed }) => [{ backgroundColor: pressed ? '#bbb' : '#eee' }, item.button ]}>
        <Text style={item.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

MenuItem.defaultProps = {
<<<<<<< HEAD
  name: 'Uundefined',
=======
  name: 'Undefined',
>>>>>>> adb13d0084d082f652d77d0a868c4f274fb7f883
  price: 0,
}
