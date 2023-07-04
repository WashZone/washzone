import React, { useEffect, useRef } from "react"
import { Dimensions, ViewStyle, TouchableWithoutFeedback, PanResponder, View } from "react-native"
import Animated, {
  Easing,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { colors } from "../theme"
import { BottomModalContent, Text } from "../components"
import { GestureEvent, PanGestureHandler } from "react-native-gesture-handler"
import { $contentCenter } from "../screens/styles"

export const CustomAddSection = ({ visible, hide }) => {
  const open = useSharedValue(0)
  const HEIGHT = Dimensions.get("screen").height

  useEffect(() => {
    open.value = withTiming(visible ? 1 : 0, {
      duration: 300,
      easing: Easing.out(Easing.elastic(1)),
    })
  }, [visible])

  const $animatedContainer = useAnimatedStyle(() => {
    return {
      bottom: interpolate(open.value, [0, 1], [-HEIGHT, 0]),
    }
  })

  const panGestureEvent = (event: GestureEvent) => {
    console.log(event.nativeEvent)
    open.value = interpolate(event.nativeEvent?.translationY, [0, HEIGHT], [1, 0])
  }

  const onPanGestureEnd = (event: GestureEvent) => {
    console.log("onPanGestureEnd", event.nativeEvent)

    if (event.nativeEvent?.absoluteY > 400) hide()
    else {
      open.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.elastic(1)),
      })
    }
  }

  return (
    <Animated.View style={[$container, $animatedContainer]}>
      <PanGestureHandler onGestureEvent={panGestureEvent} onEnded={onPanGestureEnd}>
        <Animated.View style={$handleContainer}>
          <View style={$handle} />
        </Animated.View>
      </PanGestureHandler>
      <BottomModalContent hide={hide}/>
      <Text text="sdafsdkfjn;sdflsadnf" />
    </Animated.View>
  )
}

const $handle: ViewStyle = {
  height: 4,
  width: 100,
  borderRadius: 30,
  backgroundColor: colors.palette.primary100,
}

const $handleContainer: ViewStyle = {
  height: 20,
  width: "100%",
  backgroundColor: colors.palette.neutral100,
  borderTopRightRadius: 100,
  borderTopLeftRadius: 100,
  ...$contentCenter,
}

const $backdropContainer: ViewStyle = {
  position: "absolute",
  height: "100%",
  width: "100%",
}
const $container: ViewStyle = {
  position: "absolute",
  height: "100%",
  borderTopRightRadius: 20,
  borderTopLeftRadius: 20,
  width: "100%",
  backgroundColor: colors.palette.overlay20,
}
