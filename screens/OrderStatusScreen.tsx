import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { OrderStatusBar } from '../components/OrderStatusBar';
import { OrderConfirmation } from '../components/OrderConfirmation';
import {orderStatusScreenSty, orderStatusBarSty} from '../styles/OrderStatusStyles';
import { useAppSelector, useAppDispatch } from '../store/TypedHooks'
import { asyncFetchTransactionHistory } from '../store/slices/TransactionHistory'

export default function OrderStatusScreen( {navigation} : {navigation:any} ) { 
  
	//transactionHistory remains unlinked
	//for now: 0 is queued, 1 is in progress, 2 is done
	const dispatch = useAppDispatch()
  const { transactionHistory, isLoading: isLoadingTransactionHistory } = useAppSelector((state) => state.transactionHistory)

  useEffect(() => {
    if (transactionHistory == null) {
      dispatch(asyncFetchTransactionHistory())
    }
  })

	var orderStatus = 1;
	const orderStatusText = ["Your order is in the queue", "Your order is being prepared", "Your order is ready!"];

	//Order status: 0 = Order is in the queue; 1 = Order is being prepared; 2 = Order is ready
	return (
		<View style={orderStatusScreenSty.pageWrapper}>
			<View style={orderStatusScreenSty.headerWrapper}>
				<View  style={orderStatusScreenSty.headerTextWrapper}> 
					<Text style={orderStatusScreenSty.headerText}>Your Order is Complete! </Text>
				</View>
				<OrderStatusBar orderStatus={orderStatus} />   
				<View  style={orderStatusScreenSty.stepsWrapper}> 
					<Text style={orderStatusScreenSty.stepsText}>{orderStatusText[orderStatus]}</Text>
				</View>
			</View>
			<View style={orderStatusScreenSty.footerWrapper}>
				<OrderConfirmation navigation={navigation} />
			</View>
		</View>
  )
}

		/*<View style={{flex: 1}}>
			<View  style={orderStatusScreenSty.headerWrapper}> 
				<Text style={orderStatusScreenSty.headerText}>Your Order is Complete! </Text>
			</View>
			<OrderStatusBar orderStatus={orderStatus} />   
			<View  style={orderStatusScreenSty.stepsWrapper}> 
				<Text style={orderStatusScreenSty.stepsText}>{orderStatusText[orderStatus]}</Text>
			</View>
			<OrderConfirmation navigation={navigation} />
		</View>*/