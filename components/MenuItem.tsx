import React, { useState, useEffect } from 'react';
import { View, Text, Pressable} from 'react-native';
import { item } from '../styles/MenuStyles';
import { priceToText } from '../Functions';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/TypedHooks';
import { setMenuItemsState } from '../store/slices/MenuItems';
import { addOrderItem , removeOrderItem } from '../store/slices/OrderCart';

export const MenuItem = ({ menuItem, updateItem }:any) => {
  const [count, setCount] = useState(0);
  
  const addItem = () => {
    if (count < 12) {
      addOrderItem(menuItem)
      setCount(count+1);
      //updateItem(menuItem)
    }
  }

  const removeItem = () => {
    if (count > 0) {
      removeOrderItem(menuItem)
      setCount(count-1);
      //updateItem(menuItem)
    }
  }

  useEffect(() => {count})

  return (
    <View style={item.card}>
      <View style={item.leftSide}>
        <View style={item.spacer}/>
        <Text style={item.itemName}>{menuItem.item}</Text>
        <Text style={item.itemDescription}>{menuItem.description}</Text>
        <Text style={item.itemPrice}>{priceToText(menuItem.price)}</Text>
      </View>
      
      <View style={item.spacer}/>
      <Pressable onPress={removeItem} style={({ pressed }) => [{ backgroundColor: pressed ? '#bbb' : '#eee' }, item.button ]}>
        <Text style={item.buttonText}>-</Text>
      </Pressable>
      <View style={item.buttonSpacer}>
        <Text style={item.countText}>{count}</Text>
      </View>
      <Pressable onPress={addItem} style={({ pressed }) => [{ backgroundColor: pressed ? '#bbb' : '#eee' }, item.button ]}>
        <Text style={item.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}