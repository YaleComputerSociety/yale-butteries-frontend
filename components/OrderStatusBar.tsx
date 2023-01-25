import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, Component} from 'react';
import { View, ImageBackground, Text, Image, Pressable} from 'react-native';
import {orderStatusBarSty} from '../styles/OrderStatusStyles';


export const OrderStatusBar = ({orderStatus}:any) => {

	function orderStatusBarStyle(orderStatus:any, barNum: any){
		if(barNum <= orderStatus){
			return orderStatusBarSty.orderStatusBarStripeActive;
		}
    return orderStatusBarSty.orderStatusBarStripePassive;
  }

  return (
    <View style={orderStatusBarSty.orderStatusBarWrapper}> 
			<View style={[orderStatusBarSty.orderStatusBarStripe, orderStatusBarStyle(orderStatus, 0)]} />
			<View style={[orderStatusBarSty.orderStatusBarStripe, orderStatusBarStyle(orderStatus, 1)]} />
			<View style={[orderStatusBarSty.orderStatusBarStripe, orderStatusBarStyle(orderStatus, 2)]} />
    </View>
  );
}