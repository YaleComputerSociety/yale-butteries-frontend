import React from 'react';
import { Text, View, Button, ScrollView} from 'react-native';
import {MenuItem} from '../components/MenuItem';
import {MenuCheckout} from '../components/MenuCheckout';
import {homeStyles } from '../styles/HomeStyles';

export default function butteryScreen( {navigation} : {navigation:any} ) { 
  const pressHandler = () => {
    navigation.goBack()
  }
  return (
    <ScrollView style={homeStyles.app} showsVerticalScrollIndicator={false} >
      <View style={homeStyles.menuView}>
        <MenuItem name='Chicken Sandwich' price={1.75} description="Not only is there a chicken, but as part of a limited time special offer, we're adding two additional flaps of bread."/>
        <MenuItem name='Milkshake' description="I'm cold." price={2.5}/>
        <MenuItem name='Floor Scraps' description="An economical choice" price={0.6}/>
        <MenuItem name='Face Slap' description="Not necessarily food, but refreshing nonetheless" price={0.06}/>
        <MenuItem name='Burger' description="No, this was NOT stolen from the dining hall" price={2.044}/>
        <MenuItem name='Chicken Stir Fry' description="Fried rice with eggs and chicken" price={2}/>
      </View>
      <View>
        <MenuCheckout/>
      </View>
    </ScrollView>
  )
}