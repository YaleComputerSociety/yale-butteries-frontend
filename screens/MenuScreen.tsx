import React, { useState } from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { MenuItem } from '../components/MenuItem';
import { home } from '../styles/HomeStyles';
import { item } from '../styles/MenuStyles';
import { priceToText } from '../Functions';

export default function butteryScreen( {navigation} : {navigation:any} ) { 
  const [items, setItems] = useState([
    {name:'Chicken Sandwich', price:56.75, count: 0, description:"Not only is there a chicken, but as part of a limited time special offer, we're adding two additional flaps of bread.", id:0},
    {name:'Milkshake', description:"I'm cold.", price:225.35, count: 0, id:1},
    {name:'Floor Scraps', description:"An economical choice", price:0.6, count: 0, id:2},
    {name:'Face Slap', description:"Not necessarily food, but refreshig nonetheless", price:0.056, count: 0, id:3},
    {name:'Burger', description:"No, this was NOT stolen from the dining hall", price:3, count: 0, id:4},
    {name:'Chicken Stir Fry', description:"Fried rice with eggs and chicken", price: 2.75, count: 0, id:5},
    {name:'Lemon', description:"Slurp", price:0.75, count: 0, id:6},
  ]);

  const updateItem = (newItem:any) => {
    let newItems = [...items];
    var temp = newItems.find(menuItem => newItem.id === menuItem.id);
    temp = newItem;
    setItems(newItems);
  }

  function getPriceTotal(){
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
      sum += items[i].count*(Math.floor(items[i].price * 100) / 100);
    }
    return sum;
  }

  function getItemCount(){
    let sum = 0;
    for(let i = 0; i<items.length; i++){
      sum += items[i].count;
    }
    return sum;
  }

  function getTotalItemData(){
    const ITEMDATA = []
    for(let i = 0; i<items.length; i++){
      if (items[i].count > 0) {
        ITEMDATA.push(items[i])
      }
    }
    return ITEMDATA;
  }

  return (
    <View style={{flex:1}}>
      <ScrollView style={home.app} showsVerticalScrollIndicator={false} >
        <View style={home.menuView}>
          {items.map((menuItem) => (
            <MenuItem menuItem={menuItem} updateItem={updateItem} key={menuItem.id}/>
          ))}
        </View>
      </ScrollView>
      <View style={home.footer}>
        <View style={item.outerContainer}> 
        <View style={item.upperContainer}>
          <Text style={item.priceText}>Total: {priceToText(getPriceTotal())} </Text>
          <Text style={item.priceText}>Items: {getItemCount()}</Text>
        </View>
        <Pressable onPress={() => navigation.navigate("CheckoutScreen", 
            {
              item : getTotalItemData(), //get total items to display in checkout screen
              totalPrice : priceToText(getPriceTotal())
            })} 
            style={({ pressed }) => [{ backgroundColor: pressed ? '#222' : '#333' }, item.lowerContainer]}><Text style={item.checkoutText}>Go to Checkout</Text></Pressable>
      </View>
      </View>
    </View>
  )
}