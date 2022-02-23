import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, Image, Pressable} from 'react-native';
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
      <View style={item.button}>
        <Text style={item.countText}>{quantity}</Text>
      </View>
      <Pressable onPress={incrementQuantity} style={({ pressed }) => [{ backgroundColor: pressed ? '#bbb' : '#eee' }, item.button ]}>
        <Text style={item.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

MenuItem.defaultProps = {
  name: 'Undefined',
  
}

{/* <ScrollView style={homeStyles.app} showsVerticalScrollIndicator={false} >
  <View style={homeStyles.menuView}>
    <MenuItem name='Chicken Sandwich' price={1.75} description="Not only is there a chicken, but as part of a limited time special offer, we're adding two additional flaps of bread."/>
    <MenuItem name='Milkshake' description="I'm cold." price={2.5}/>
    <MenuItem name='Floor Scraps' description="An economical choice" price={0.6}/>
    <MenuItem name='Face Slap' description="Not necessarily food, but refreshing nonetheless" price={0.06}/>
    <MenuItem name='Burger' description="No, this was NOT stolen from the dining hall" price={2.044}/>
    <MenuItem name='Chicken Stir Fry' description="Fried rice with eggs and chicken" price={2}/>
  </View>
</ScrollView> */}
