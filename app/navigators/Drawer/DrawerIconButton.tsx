import React, { useEffect } from "react"
import { Pressable, PressableProps, ViewStyle } from "react-native"
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated"
import type { SharedValue } from "react-native-reanimated"
import { isRTL } from "../../i18n"
import { colors } from "../../theme"

interface DrawerIconButtonProps extends PressableProps {
  open: boolean
  progress: SharedValue<number>
}

const AnimatedPressible = Animated.createAnimatedComponent(Pressable)

export function DrawerIconButton(props: DrawerIconButtonProps) {
  const { open, progress, ...PressableProps } = props

  const animatedContainerStyles = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, isRTL ? 60 : -60])

    return {
      transform: [{ translateX }],
    }
  })

  const animatedTopBarStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.palette.neutral100, colors.tint],
    )
    const marginLeft = interpolate(progress.value, [0, 1], [0, -11.5])
    const width = interpolate(progress.value, [0, 1], [6, 0])

    return {
      backgroundColor,
      marginLeft,
      width,
    }
  })

  const animatedMiddleBarStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.palette.neutral100, colors.tint],
    )
    const width = interpolate(progress.value, [0, 1], [6, 0])
    const marginLeft = interpolate(progress.value, [0, 1], [4, -11.5])

    return {
      backgroundColor,
      marginLeft,
      width,
    }
  })

  const animatedBottomBarStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.palette.neutral100, colors.tint],
    )
    const marginLeft = interpolate(progress.value, [0, 1], [4, -11.5])
    const width = interpolate(progress.value, [0, 1], [6, 0])

    return {
      backgroundColor,
      marginLeft,
      width,
    }
  })

  useEffect(() => {
    progress.value = withSpring(open ? 1 : 0)
  }, [open, progress])

  return (
    <AnimatedPressible {...PressableProps} style={[$container, animatedContainerStyles]}>
      <Animated.View style={[$topBar, animatedTopBarStyles]} />
      <Animated.View style={[$middleBar, animatedMiddleBarStyles]} />
      <Animated.View style={[$bottomBar, animatedBottomBarStyles]} />
    </AnimatedPressible>
  )
}

const barHeight = 6

const $container: ViewStyle = {
  alignItems: "center",
  height: 56,
  justifyContent: "center",
  flexDirection: "row",
  width: 56,
}

const $topBar: ViewStyle = {
  height: barHeight,
  borderRadius: 3,
}

const $middleBar: ViewStyle = {
  height: barHeight,

  borderRadius: 3,
}

const $bottomBar: ViewStyle = {
  height: barHeight,
  borderRadius: 3,
}
