import React, { FC, useEffect, useState } from 'react'
import { Text, View, Pressable, ScrollView } from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/TypedHooks'
import { asyncFetchMenuItems } from '../store/slices/MenuItems';
import { MenuItem } from '../components/MenuItem';
import { home } from '../styles/HomeStyles';
import { item } from '../styles/MenuStyles';
import store from '../store/ReduxStore';
import { Provider } from 'react-redux'

export default function butteryScreen( {navigation} : {navigation:any} ) { 
  const [itemTotal, setItemTotal] = useState(0);

/*  const updateItem = (newItem:any) => {
    let newItems = [...];
    var temp = newItems.find(menuItem => newItem.id === menuItem.id);
    temp = newItem;
    setItemTotal(newItems);
  } */

  const TestingMenuItems: FC = () => {
    const dispatch = useAppDispatch()
    const { menuItems, isLoading: isLoadingMenuItems } = useAppSelector((state) => state.menuItems)

    
    useEffect(() => {
      if (menuItems == null) {
        dispatch(asyncFetchMenuItems())
      }
    })

    useEffect(() => {itemTotal})

    //console.log(menuItems)
  
    return (
      <View style={home.container}> 
        {isLoadingMenuItems || menuItems == null ? (
          <View style={{flex:1, backgroundColor: "#fff", flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <Text>{'Loading...'}</Text>
          </View>
        ) : (
          <View style={{flex:1}}>
            <ScrollView style={home.app} showsVerticalScrollIndicator={false} >
              <View style={home.menuView}>
                {menuItems.filter(menuItem => {return menuItem.college === navigation.getParam('college_Name') && menuItem.isActive === true}).map(menuItem => (
                  <MenuItem menuItem={menuItem} key={menuItem.id}/>
                ))}
              </View>
            </ScrollView>
              <View style={home.footer}>
                <View style={item.outerContainer}> 
                <View style={item.upperContainer}>
                  <Text style={item.priceText}>Total: $0.00 </Text>
                  <Text style={item.priceText}>Items: {itemTotal}</Text>
                </View>
                <Pressable onPress={() => navigation.navigate("CheckoutScreen")} style={[item.lowerContainer, {backgroundColor: '#bbb'}]}><Text style={item.checkoutText}>Go to Checkout</Text></Pressable>
              </View>
            </View>
          </View>
        )}
      </View>
    )
  }

  return (
    <Provider store={store}>
      <TestingMenuItems/>
    </Provider>
  );
}