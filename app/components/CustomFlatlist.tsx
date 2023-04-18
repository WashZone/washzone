import React, { useRef, useState } from "react"
import {
  FlatList,
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
} from "react-native"
import { colors } from "../theme"
import Lottie from "lottie-react-native"
import Animated, {
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
      height: refreshing ? 30 : loaderProgress.value * 30,
      width: "100%",
      resizeMode: 'contain',

    }
  })

  const $animatedLoaderParentContainer = useAnimatedStyle(() => {
    return {
      top: 0,
      position: "absolute",
      height: refreshing ? 60 : loaderProgress.value * 60,
      width: "100%",
      justifyContent: 'center',
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
      const newVal = -event.nativeEvent.contentOffset.y / refreshHeight
      loaderProgress.value = newVal < 1 ? newVal : 1
      setLottieProgress(newVal * 0.60)
    }

  }

  return (
    <>
      {loaderProgress.value > 0 &&
        <Animated.View style={$animatedLoaderParentContainer}>
          <Animated.View style={$animatedLoaderContainer}>
            <Lottie
              source={require("../../assets/lottie/loader.json")}
              autoPlay={refreshing}
              progress={lottieProgress}
            />
          </Animated.View>
        </Animated.View>}
      <FlatList
        refreshing={refreshing}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} tintColor={colors.transparent} />}
        onRefresh={onRefresh}
        ref={listRef}
        onScroll={onScroll}
        {...FlatListProps}
      />
    </>
  )
}

