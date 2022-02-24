import React from 'react';
import {useState} from 'react';
import { Text, View, Button, ScrollView} from 'react-native';
import {MenuItem} from '../components/MenuItem';
import {MenuCheckout} from '../components/MenuCheckout';
import { home } from '../styles/HomeStyles';

export default function butteryScreen( {navigation} : {navigation:any} ) { 
  const [items, setItems] = useState([
    {name:'Chicken Sandwich', price:1.75, count: 0, description:"Not only is there a chicken, but as part of a limited time special offer, we're adding two additional flaps of bread.", id:0},
    {name:'Milkshake', description:"I'm cold.", price:2.5, count: 0, id:1},
    {name:'Floor Scraps', description:"An economical choice", price:2.5, count: 0, id:2},
    {name:'Face Slap', description:"Not necessarily food, but refreshig nonetheless", price:2.5, count: 0, id:3},
    {name:'Burger', description:"No, this was NOT stolen from the dining hall", price:2.5, count: 0, id:4},
    {name:'Chicken Stir Fry', description:"Fried rice with eggs and chicken", price:2.5, count: 0, id:5},
    {name:'Lemon', description:"Slurp", price:2.5, id:6},
  ]);

  const updateItem = (newItem:any) => {
    let newItems = [...items];
    var temp = newItems.find(menuItem => newItem.id === menuItem.id);
    temp = newItem;
    console.log(temp);
    console.log(newItems);
    setItems(newItems);
  }

  const pressHandler = () => {
    navigation.goBack()
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
          <MenuCheckout/>
      </View>
    </View>
  )
}