import React, { useEffect } from "react"
import { ViewStyle } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import { colors } from "../../../theme"

export const Ring = ({ delay }) => {
  const ring = useSharedValue(0)

  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.8 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [0, 4]),
        },
      ],
    }
  })
  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 4000,
        }),
        -1,
        false,
      ),
    )
  }, [])
  return <Animated.View style={[$ringBase, ringStyle]} />
}

const $ringBase: ViewStyle = {
  position: "absolute",
  width: 80,
  height: 80,
  borderRadius: 40,
  borderColor: colors.palette.status.online,
  borderWidth: 10,
}
