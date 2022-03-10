import * as React from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { checkout } from '../styles/CheckoutStyles';
import { CheckoutItem } from '../components/CheckoutItem';
import { priceToText } from '../Functions';
import {orderStatusScreenSty} from '../styles/OrderStatusStyles';

function getPriceTotal(item:any){
  return item.count*(Math.floor(item.price * 100) / 100);
}

function CheckoutItemList(props:any) {
  const checkoutItemList = props.checkoutItemList;
  const listItems = checkoutItemList.map((item:any) => 
    <CheckoutItem item={item} totalPrice={priceToText(getPriceTotal(item))} key={item.id}/>
  );
  return (
    <View style={checkout.orderDetailsContainer}>
      {listItems}  
    </View>
  );
}

export const OrderConfirmation = ({navigation}:any) => {
  return (
    <View style={checkout.wrapper}>
      <View style={{flex:1}}>
        <View style={checkout.upperContainer}>
        <View style={orderStatusScreenSty.header}><Text style={checkout.totalText}>Order Summary:</Text></View>
          <ScrollView>
            <CheckoutItemList checkoutItemList={navigation.getParam('item')}/>
          </ScrollView>
          <View><Text style={checkout.totalText}>Total:  { navigation.getParam('totalPrice') }</Text></View>
        </View>
      </View>
      <View style={checkout.lowerContainer}>
      </View>
    </View>
  );
}