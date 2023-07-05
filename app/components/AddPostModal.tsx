import React, { useEffect, useState } from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"
import { Text, Button, BottomModal, Icon, $baseTextStyle } from "."
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { HomeTabParamList } from "../tabs"
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { $contentCenter } from "../screens/styles"
import { CreatePost } from "../screens/Feed/partials"

import { CreateTopic } from "../screens/TopicsFeed/CreateTopic"



export const AddPostModal = () => {
  const [isVisible, setVisible] = useState(false)

  return (
    <>
      <Button style={$addButton} onPress={() => setVisible(true)}>
        <Icon icon={"plus"} size={40} color={colors.palette.primary300} />
      </Button>
      <BottomModal
        avoidKeyboard
        keyboardOffset = {-100}
        isVisible={isVisible}
        setVisible={setVisible}
        backgroundColor={colors.palette.neutral100}
      >
        <BottomModalContent hide={() => setVisible(false)} />
      </BottomModal>
    </>
  )
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

export const BottomModalContent = ({ hide }) => {
  const sharedValPost = useSharedValue(0)
  const sharedValDiscuss = useSharedValue(0)
  const [expanded, setExpanded] = useState<'post' | 'discuss' | undefined>(undefined)

  const expandPost = () => {
    setExpanded('post')
  }

  const expandDiscuss = () => {
    setExpanded('discuss')
  }


  useEffect(() => {
    if (expanded === 'discuss') {
      sharedValDiscuss.value = withTiming(0.5, { duration: 300 })
      sharedValPost.value = withTiming(0, { duration: 300 })
    }
    if (expanded === 'post') {
      sharedValDiscuss.value = withTiming(0, { duration: 300 })
      sharedValPost.value = withTiming(0.5, { duration: 300 })
    }
    if (expanded === undefined) {
      sharedValDiscuss.value = withTiming(0, { duration: 300 })
      sharedValPost.value = withTiming(0, { duration: 300 })
    }
  }, [expanded])



  const $postButtonAnimated = useAnimatedStyle(() => {
    return {
      height: interpolate(sharedValPost.value, [0, 0.5, 1], [52, 150, 235]),
      backgroundColor: interpolateColor(sharedValPost.value, [0, 0.5], [colors.palette.primary300, colors.transparent])
    }
  })

  const $discussButtonAnimated = useAnimatedStyle(() => {
    return {
      height: interpolate(sharedValDiscuss.value, [0, 0.5, 1], [52, 180, 280]),

      backgroundColor: interpolateColor(sharedValDiscuss.value, [0, 0.5], [colors.palette.primary300, colors.transparent])
    }
  })

  const $animatedPostText = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: interpolate(sharedValPost.value, [0, 0.5, 1], [1, 0, 0]) }]
    }
  })

  const $animatedDiscussText = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: interpolate(sharedValDiscuss.value, [0, 0.5, 1], [1, 0, 0]), }]
    }
  })

  const $animatedCreateTopicContainer = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(sharedValDiscuss.value, [0, 0.5, 1], [0, 1, 1]) }]
    }
  })

  const $animatedCreatePostContainer = useAnimatedStyle(() => {
    const transform = [{
      scale: interpolate(sharedValPost.value, [0, 0.5, 1], [0, 1, 1]),
    }]
    return {
      transform
    }
  })



  return (
    <View>
      <Text
        text="Would you like to post or discuss?"
        numberOfLines={2}
        style={$headerText}
        weight="medium"
      />

      <AnimatedTouchable
        disabled={expanded === 'post'}
        style={[$button, $postButtonAnimated]}
        onPress={expandPost}
      >
        <Animated.Text style={[$baseTextStyle, { color: colors.palette.neutral100 }, $animatedPostText]}>POST</Animated.Text>
        <Animated.View style={[{ width: '100%', position: 'absolute' }, $animatedCreatePostContainer]}><CreatePost focused={false} progress={sharedValPost} /></Animated.View >
      </AnimatedTouchable>

      <AnimatedTouchable
        disabled={expanded === 'discuss'}
        style={[$button, $discussButtonAnimated]}
        onPress={expandDiscuss}
      >
        <Animated.Text style={[$baseTextStyle, { color: colors.palette.neutral100 }, $animatedDiscussText]}>DISCUSS</Animated.Text>
        <Animated.View style={[{ width: '100%', position: 'absolute' }, $animatedCreateTopicContainer]}><CreateTopic progress={sharedValDiscuss} /></Animated.View >
      </AnimatedTouchable>


      <Button text="CANCEL" textColor={colors.palette.primary300} style={$button} onPress={hide} />

    </View>
  )
}

const $addButton: ViewStyle = {
  padding: 12,
  margin: 12,
  width: 80,
  height: 50,
  borderRadius: 30,
  borderColor: colors.palette.primary300,
  borderWidth: 1,
}

const $headerText: TextStyle = {
  marginVertical: spacing.medium,
  textAlign: "center",

}

const $button: ViewStyle = {
  padding: 12,
  margin: 12,
  borderRadius: 30,
  borderColor: colors.palette.primary300,
  borderWidth: 1,
  ...$contentCenter,
}

export default AddPostModal
