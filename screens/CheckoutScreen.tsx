import * as React from 'react';
import { Text, View, ScrollView, Pressable, FlatList } from 'react-native';
import { checkout } from '../styles/CheckoutStyles';
import { CheckoutItem } from '../components/CheckoutItem';
import { priceToText } from '../Functions';

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

export default function CheckoutScreen( { navigation } : {navigation:any} ) {
  return (
    <View style={checkout.wrapper}>
      <View style={checkout.upperContainer}>
        <View style={checkout.itemList}>
        <View style={checkout.header}><Text style={checkout.totalText}>Order Summary:</Text></View>
          <ScrollView style={checkout.scrollStyle}>
            <CheckoutItemList checkoutItemList={navigation.getParam('item')}/>
          </ScrollView>
          <View style={checkout.footer}><Text style={checkout.totalText}>Total:  { navigation.getParam('totalPrice') }</Text></View>
        </View>
      </View>
      <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#222' : '#333' }, checkout.checkoutButton]}>
          <Text style={checkout.checkoutText}>Complete Order</Text>
      </Pressable>
    </View>
  ); 
}
