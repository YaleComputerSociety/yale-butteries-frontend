import React, { useState} from 'react';
import { View, Text, Pressable} from 'react-native';
import { item } from '../styles/MenuStyles';
import { priceToText } from '../Functions';

export const MenuItem = ({menuItem, updateItem}:any) => {

  const incrementQuantity = () => {
    if(menuItem.count<12) {
      ++menuItem.count;
      updateItem(menuItem);
    } 
  }

  const decrementQuantity = () => {
    if(menuItem.count>0) {
      --menuItem.count;
      updateItem(menuItem);
    } 
  }

  return (
    <View style={item.card}>
      <View style={item.leftSide}>
        <View style={item.spacer}/>
        <Text style={item.itemName}>{menuItem.name}</Text>
        <Text style={item.itemDescription}>{menuItem.description}</Text>
        <Text style={item.itemPrice}>{priceToText(menuItem.price)}</Text>
      </View>
      
      <View style={item.spacer}/>
      <Pressable onPress={decrementQuantity} style={({ pressed }) => [{ backgroundColor: pressed ? '#bbb' : '#eee' }, item.button ]}>
        <Text style={item.buttonText}>-</Text>
      </Pressable>
      <View style={item.buttonSpacer}>
        <Text style={item.countText}>{menuItem.count}</Text>
      </View>
      <Pressable onPress={incrementQuantity} style={({ pressed }) => [{ backgroundColor: pressed ? '#bbb' : '#eee' }, item.button ]}>
        <Text style={item.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}