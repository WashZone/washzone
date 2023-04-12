import React, { ReactElement, useMemo, useRef, useState } from "react"
import {
  FlatList,
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TextStyle,
  ViewStyle,
} from "react-native"
import { colors, spacing } from "../theme"
import Lottie from "lottie-react-native"
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"

export interface CustomListProps extends FlatListProps<any> {
  customRefresh: () => Promise<void>
}

/**
 * A styled row component that can be used in FlatList, SectionList, or by itself.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-ListItem.md)
 */

const refreshHeight = 100

export function CustomFlatlist(props: CustomListProps) {
  const { customRefresh, ...FlatListProps } = props
  const loaderProgress = useSharedValue(0)
  const [lottieProgress, setLottieProgress] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const listRef = useRef<FlatList>()
  const $animatedLoaderContainer = useAnimatedStyle(() => {
    return {
      position: refreshing ? "relative" : "absolute",
      height: refreshing ? refreshHeight : loaderProgress.value * refreshHeight,
      top: 0,
      width: "100%",
    }
  })
  const onRefresh = async () => {
    console.log("refreshinggggg")
    setRefreshing(true)
    await customRefresh()
    setRefreshing(false)
  }

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log(event.nativeEvent.contentOffset.y / refreshHeight, ":", loaderProgress.value * 24)
    if (!refreshing) {
      loaderProgress.value = -event.nativeEvent.contentOffset.y / refreshHeight
      setLottieProgress(loaderProgress.value * 0.5)
    }
    if (-event.nativeEvent.contentOffset.y / refreshHeight >= 1) {
      onRefresh()
    }
  }

  return (
    <>
      <Animated.View style={$animatedLoaderContainer}>
        <Lottie
          //   resizeMode={"contain"}
          source={require("../../assets/lottie/loader.json")}
          autoPlay={refreshing}
          //   loop
          progress={lottieProgress}
        />
      </Animated.View>
      {useMemo(
        () => (
          <FlatList ref={listRef} {...FlatListProps} onScroll={onScroll} />
        ),
        [props],
      )}
    </>
  )
}

const $separatorTop: ViewStyle = {
  borderTopWidth: 1,
  borderTopColor: colors.separator,
}

const $separatorBottom: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
}

const $textStyle: TextStyle = {
  paddingVertical: spacing.extraSmall,
  alignSelf: "center",
  flexGrow: 1,
  flexShrink: 1,
}

const $touchableStyle: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
}

const $iconContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 0,
}
const $iconContainerLeft: ViewStyle = {
  marginEnd: spacing.medium,
}

const $iconContainerRight: ViewStyle = {
  marginStart: spacing.medium,
}
