import * as React from 'react';
import { Text, View, ScrollView, Pressable, FlatList } from 'react-native';
import { checkout } from '../styles/CheckoutStyles';
import { orderCartSlice } from '../store/slices/OrderCart';
import { useSelector } from 'react-redux';

function getPriceTotal(item:any){
  return item.count*(Math.floor(item.price * 100) / 100);
}


function CheckoutItemList(props:any) {
  console.log("HELLO")
}
/*   const listItems = checkoutItemList.map((item:any) => 
    <CheckoutItem item={item} totalPrice={priceToText(getPriceTotal(item))} key={item.id}/>
  );
  return (
    <View style={checkout.orderDetailsContainer}>
      {listItems}  
    </View>
  ); */


export default function CheckoutScreen( { navigation } : {navigation:any} ) {
  return (
    <View style={checkout.wrapper}>
      <View style={{flex:1}}>
        <View style={checkout.upperContainer}>
        <View style={checkout.header}><Text style={checkout.totalText}>Order Summary:</Text></View>
          <ScrollView>
          </ScrollView>
          <View style={checkout.footer}><Text style={checkout.totalText}>Total:  $0.00</Text></View>
        </View>
      </View>
      <View style={checkout.lowerContainer}>
        <Pressable onPress={CheckoutItemList} style={({ pressed }) => [{ backgroundColor: pressed ? '#222' : '#333' }, checkout.checkoutButton]}>
          <Text style={checkout.checkoutText}>Complete Order</Text>
        </Pressable>
      </View>
    </View>
  ); 
}