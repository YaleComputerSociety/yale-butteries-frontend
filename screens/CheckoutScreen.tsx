import * as React from 'react'
import { Text, View, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import { checkout } from '../styles/CheckoutStyles'
import { useAppDispatch, useAppSelector } from '../store/TypedHooks'
import { loading } from '../styles/GlobalStyles'
import CheckoutItem from '../components/CheckoutItem'

/*   const listItems = checkoutItemList.map((item:any) => 
    <CheckoutItem item={item} totalPrice={priceToText(getPriceTotal(item))} key={item.id}/>
  )
  return (
    <View style={checkout.orderDetailsContainer}>
      {listItems}  
    </View>
  ) */

const CheckoutScreen: React.FC<{ navigation: Navigator }> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const { orderItems, isLoading: isLoadingOrderCart } = useAppSelector((state) => state.orderCart)


  return (
    <View style={checkout.wrapper}>
      {isLoadingOrderCart ? (
        <View style={loading.container}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={checkout.upperContainer}>
            <View style={checkout.header}>
              <Text style={checkout.totalText}>Order Summary:</Text>
            </View>
            <ScrollView style={checkout.orderList}>
              {orderItems.map((checkoutItem, index) => (
                <CheckoutItem checkoutItem={checkoutItem} key={index} />
              ))}
            </ScrollView>
            <View style={checkout.footer}>
              <Text style={checkout.totalText}>Total: $0.00</Text>
            </View>
          </View>
          <View style={checkout.lowerContainer}>
            <Pressable
              style={({ pressed }) => [{ backgroundColor: pressed ? '#222' : '#333' }, checkout.checkoutButton]}
            >
              <Text style={checkout.checkoutText}>Complete Order</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  )
}

export default CheckoutScreen
