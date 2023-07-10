/* eslint-disable import/namespace */
import Ionicon from 'react-native-vector-icons/Ionicons'
import React, { useCallback } from 'react'
import * as Haptics from 'expo-haptics'
import { View, Text, Pressable, Dimensions } from 'react-native'
import { priceToText } from '../../Functions'
import { checkout } from '../../styles/CheckoutStyles'
import { MenuItem } from '../../store/slices/MenuItems'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";

interface Props {
  decUpdate: (menuItem: MenuItem) => void
  menuItem: MenuItem
  checkoutItem: any
  isDisabled: any
}

const CheckoutItem: any = ({ decUpdate, checkoutItem, isDisabled }: Props) => {
  const { width: SCREEN_WIDTH } = Dimensions.get('window')

  const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.15
  const translateX = useSharedValue(0)

  type ContextType = {
    x: number,
  }

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (_, context) => {
      context.x = translateX.value
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x
    },
    onEnd: (event) => {
      const dismissed = translateX.value < TRANSLATE_X_THRESHOLD
      if (dismissed) {
        translateX.value = withTiming(-75)
      } else {
        translateX.value = withTiming(0)
      }
    }
  })

  const removeItem = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    decUpdate(checkoutItem)
  }

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value, },
    ],
  }))


  return (
    <View>
      <PanGestureHandler onGestureEvent={panGesture}>
          <Animated.View style={[rStyle, checkout.item]}>
            <Pressable
              disabled={isDisabled}
              onPress={removeItem}
              style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, checkout.icon]}
            >
              <Ionicon name="trash" size={20} color="#000" />
            </Pressable>
            <View style={checkout.NAME}>
              <Text style={checkout.itemNameText}>{checkoutItem.orderItem.item}</Text>
            </View>
            <View style={checkout.PRICE}>
              <Text style={checkout.text}>{priceToText(checkoutItem.orderItem.price)}</Text>
            </View>
        </Animated.View>
      </PanGestureHandler>
      <Pressable style={checkout.deleteContainer} onPress={removeItem}>
        <Text style={checkout.deleteContainerText}>Remove</Text>
      </Pressable>
    </View>
  )
}

export default CheckoutItem
