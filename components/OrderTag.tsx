import React, { useEffect, useState,} from 'react';
import {Alert, View, Text, StyleSheet, Image, ImageBackgroundBase, ImageStore, SegmentedControlIOSComponent} from 'react-native';

import { COLORS } from '../constants/Colors';
import { TEXTS } from '../constants/Texts';
import { LAYOUTS } from '../constants/Layouts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

import OrderTagPage from './OrderTagPage';

import { useAppDispatch } from '../store/TypedHooks';
import { updateTransactionItem } from '../store/slices/TransactionItems';

const OrderTag = (props) => {
  const dispatch = useAppDispatch()
  const orderTime = "10:37 PM"
  const orderItem = props.children[0].menuItemId
  let transactionItems = props.children[1]
  const transactionIndex = props.children[2]
  const orderFirstName = "Aidan"
  const orderLastName = "Palmer"
  const interactable = props.children[3]
  const orderNum = props.children[0].id + "-";
  const slideIndex = [0, 1, 2, 3, 4]
  const[orderStatus, setOrderStatus] = useState(props.children[0].orderStatus)
  //console.log(props.children)
  //console.log(transactionIndex)
  

  const[tagActive, setTagActive] = useState(0);
  const[isStarted, setIsStarted] = useState(false);
  //console.log(isStarted)
  //let orderStatus = props.children[0].orderStatus
  //'cancelled' | 'queued' | 'in_progress' | 'complete' | 'pending' | 'picked_up'
  //Here we need to find based on the orderstatus where to start the slide index
  const[startingIndex, setStartingIndex] = useState(0);
  useEffect(() => {
    switch(orderStatus) {
      case 'cancelled':
        setStartingIndex(0)
        break
      case 'queued':
        setStartingIndex(1)
        break
      case 'in_progress':
        setStartingIndex(2)
        break
      case 'complete':
        setStartingIndex(3)
        break
      case 'picked_up':
        setStartingIndex(4)
        break
      case 'pending':
        setStartingIndex(0)
        break
    }
  }, [])


  useEffect(() => {
    if(orderStatus != 'pending') {
      setIsStarted(true);
    }
  }, [orderStatus])

  const handleStatus = ( code:number) => {
      let tempStatus = ""
      switch(code) {
        case 0:
          if (!isStarted) {
            tempStatus = "pending"
            setOrderStatus(tempStatus)
          } else {
            Alert.alert("Notice", "Are you sure you want to cancel this order? This can not be undone", 
            [{text: 'Yes',
              onPress: () => {
                tempStatus = "cancelled"  
                setOrderStatus(tempStatus)
                slideIndex.forEach((indx) => {console.log(orderNum + indx)})
                dispatch(updateTransactionItem({...transactionItems.find(element => element.id == transactionIndex), orderStatus: tempStatus}))
              }}, 
              {text: 'No',
                onPress: () => {
                tempStatus = "queued"  
                setOrderStatus(tempStatus)
                slideIndex.forEach((indx) => {console.log(orderNum + indx)})
                dispatch(updateTransactionItem({...transactionItems.find(element => element.id == transactionIndex), orderStatus: tempStatus}))
                setStartingIndex(1)
              }}])
            tempStatus = "cancelled"
            setOrderStatus(tempStatus)
          }
          slideIndex.forEach((indx) => {console.log(orderNum + indx)})
          dispatch(updateTransactionItem({...transactionItems.find(element => element.id == transactionIndex), orderStatus: tempStatus}))
          break;
        case 1:
          tempStatus = "queued"
          setOrderStatus(tempStatus)
          slideIndex.forEach((indx) => {console.log(orderNum + indx)})
          dispatch(updateTransactionItem({...transactionItems.find(element => element.id == transactionIndex), orderStatus: tempStatus}))
          break;
        case 2:
          tempStatus = "in_progress"
          setOrderStatus(tempStatus)
          slideIndex.forEach((indx) => {console.log(orderNum + indx)})
          dispatch(updateTransactionItem({...transactionItems.find(element => element.id == transactionIndex), orderStatus: tempStatus}))
          break;
        case 3: 
          tempStatus = "complete"
          setOrderStatus(tempStatus)
          slideIndex.forEach((indx) => {console.log(orderNum + indx)})
          dispatch(updateTransactionItem({...transactionItems.find(element => element.id == transactionIndex), orderStatus: tempStatus}))
          break;
        case 4: 
         
          Alert.alert("Notice", "Are you sure you this order has been picked up? This can not be undone", 
            [{text: 'Yes',
              onPress: () => {
                tempStatus = "picked_up"  
                setOrderStatus(tempStatus)
                slideIndex.forEach((indx) => {console.log(orderNum + indx)})
                dispatch(updateTransactionItem({...transactionItems.find(element => element.id == transactionIndex), orderStatus: tempStatus}))
              }}, 
              {text: 'No',
                onPress: () => {
                tempStatus = "complete"  
                setOrderStatus(tempStatus)
                slideIndex.forEach((indx) => {console.log(orderNum + indx)})
                dispatch(updateTransactionItem({...transactionItems.find(element => element.id == transactionIndex), orderStatus: tempStatus}))
                setStartingIndex(3)
              }}])
            
          break;
      }
      //console.log(newTransactionItems[transactionIndex])

  }
  //console.log(orderNum)


  const onchange = (nativeEvent) => {
    if(nativeEvent) {
      //console.log(nativeEvent)
      const slide = Math.round(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide != tagActive) {
        setTagActive(slide);
        handleStatus(slide);
        setIsStarted(true);
        //console.log("Stage ")
        //console.log(slide)
      }
      //console.log(tagActive)
    }
  }


  //alright threres some real spaghetti here to get this to work...
  //not proud of it but can be adressed later I suppose
  return (
    //<SafeAreaView style={{flex: 1}}>
      <View style={{...styles.container}}>
        { interactable ? 
        <ScrollView
          onScroll={({nativeEvent}) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
          contentOffset={{x: (startingIndex * LAYOUTS.getWidth(355)), y: 0}}
        >
          {
            slideIndex.map((index) => {
              //console.log(orderNum+index)
              return (
              <OrderTagPage
                status={index}
                orderItem={orderItem}
                key={orderNum+index}
                key2={orderNum+index}
                started={isStarted}/>
            )}
            )
          }
        </ScrollView> :
          <OrderTagPage
            status={startingIndex}
            orderItem={orderItem}
            key={orderNum}
            key2={orderNum}
            started={isStarted}/>
        }
      </View>
    //</SafeAreaView>
    
    //   <View style={{...styles.timeContainer}}>
    //       <Text style={{...styles.boldText}}>
    //       10:37 PM</Text>
    //   </View>
    //   <View style={styles.itemContainer}>
    //     <Text style={{...styles.regularText}}>
    //       Chicken Nuggets
    //     </Text>
    //   </View>
    //   <View style={styles.nameContainer}>
    //     <Text style={{...styles.nameText}}>
    //       Aidan</Text>
    //     <Text style={{...styles.nameText}}>
    //       Palmer</Text>
    //   </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: LAYOUTS.getWidth(50),
    width: LAYOUTS.getWidth(355),
    flex: 1,
    borderRadius: 5,
    marginBottom: LAYOUTS.getWidth(10),
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: COLORS.white,
    // borderColor: 'black',
   // borderWidth: 2
  },
  wrap: {
    height: LAYOUTS.getWidth(50),
    flex: 1,
    borderRadius: 5,
    marginBottom: LAYOUTS.getWidth(10),
    backgroundColor: COLORS.white,
    //borderWidth: 3
  },
  timeContainer: {
    width: LAYOUTS.getWidth(80),
    borderRightWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    //borderWidth: 2
  },
  itemContainer: {
    flex: 1,
    paddingLeft: LAYOUTS.getWidth(8),
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  nameContainer: {
    width: LAYOUTS.getWidth(75),
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: TEXTS.adjust(17),
    color: COLORS.black,
    //fontFamily: 'HindSiliguri-Bold'
  },
  regularText: {
    fontSize: TEXTS.adjust(17),
    color: COLORS.black,
    //fontFamily: 'HindSiliguri'
  },
  nameText: {
    fontSize: TEXTS.adjust(12),
    color: COLORS.black,
    //fontFamily: 'HindSiliguri'
  },
  imageStyle: {
    height: LAYOUTS.getWidth(20),
    width: LAYOUTS.getWidth(20),
  }
});

export default OrderTag;


