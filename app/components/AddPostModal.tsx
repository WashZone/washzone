import React, { useEffect, useState } from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"
import { Text, Button, BottomModal, Icon, $baseTextStyle } from "."

import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { $contentCenter, $flexRow } from "../screens/styles"
import { CreatePost } from "../screens/Feed/partials"

import { CreateTopic } from "../screens/TopicsFeed/CreateTopic"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { AppStackParamList } from "../navigators"

export const AddPostModal = () => {
  const [isVisible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  return (
    <>
      <Button style={$addButton} onPress={() => setVisible(true)}>
        <Icon icon={"plus"} size={40} color={colors.palette.primary300} />
      </Button>

      <BottomModal
        disableUnMount={loading}
        avoidKeyboard
        keyboardOffset={-170}
        isVisible={isVisible}
        setVisible={setVisible}
        backgroundColor={colors.palette.neutral100}
        // swipeDown={false}
        propagateSwipe
      >
        <BottomModalContent
          hide={() => setVisible(false)}
          loading={loading}
          setLoading={setLoading}
        />
      </BottomModal>
    </>
  )
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

export const BottomModalContent = ({ hide, setLoading, loading }) => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const sharedValPost = useSharedValue(0)
  const sharedValDiscuss = useSharedValue(0)
  const [expanded, setExpanded] = useState<"post" | "discuss" | undefined>(undefined)

  // this is to change the progress according to the fact whether the images are present or not 
  const [discussionImage, setDiscussionImage] = useState<any>({ height: 1, width: 1 })
  const [selectedPostImages, setSelectedPostImages] = useState<Array<any>>([])

  const expandPost = () => {
    !loading && setExpanded("post")
  }

  const expandDiscuss = () => {
    !loading && setExpanded("discuss")
  }

  useEffect(() => {
    if (expanded === "discuss") {
      sharedValDiscuss.value = withTiming(discussionImage?.uri ? 1 : 0.5, { duration: 300 })
      sharedValPost.value = withTiming(0, { duration: 300 })
    }
    if (expanded === "post") {
      sharedValDiscuss.value = withTiming(0, { duration: 300 })
      sharedValPost.value = withTiming(selectedPostImages?.length > 0 ? 1 : 0.5, { duration: 300 })
    }
    if (expanded === undefined) {
      sharedValDiscuss.value = withTiming(0, { duration: 300 })
      sharedValPost.value = withTiming(0, { duration: 300 })
    }
  }, [expanded])

  const $postButtonAnimated = useAnimatedStyle(() => {
    return {
      height: interpolate(sharedValPost.value, [0, 0.5, 1], [52, 150, 235]),
      backgroundColor: interpolateColor(
        sharedValPost.value,
        [0, 0.5],
        [colors.palette.primary300, colors.transparent],
      ),
    }
  })

  const $discussButtonAnimated = useAnimatedStyle(() => {
    return {
      height: interpolate(sharedValDiscuss.value, [0, 0.5, 1], [52, 180, 280]),

      backgroundColor: interpolateColor(
        sharedValDiscuss.value,
        [0, 0.5],
        [colors.palette.primary300, colors.transparent],
      ),
    }
  })

  const $animatedPostComponent = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: interpolate(sharedValPost.value, [0, 0.5, 1], [1, 0, 0]) }],
    }
  })

  const $animatedDiscussComponent = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: interpolate(sharedValDiscuss.value, [0, 0.5, 1], [1, 0, 0]) }],
    }
  })

  const $animatedCreateTopicContainer = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(sharedValDiscuss.value, [0, 0.5, 1], [0, 1, 1]) }],
    }
  })

  const $animatedCreatePostContainer = useAnimatedStyle(() => {
    const transform = [
      {
        scale: interpolate(sharedValPost.value, [0, 0.5, 1], [0, 1, 1]),
      },
    ]
    return {
      transform,
    }
  })

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ height: "auto" }}
    >
      <Text
        text="Would you like to post or discuss?"
        numberOfLines={2}
        style={$headerText}
        weight="medium"
      />

      <AnimatedTouchable
        disabled={expanded === "discuss"}
        style={[$button, $discussButtonAnimated]}
        onPress={expandDiscuss}
      >
        <Animated.View style={[$flexRow, $animatedDiscussComponent]}>
          <Icon icon='topics' size={20} />
          <Animated.Text
            style={[$baseTextStyle, { color: colors.palette.neutral100 }, $animatedDiscussComponent]}
          >
            DISCUSS
          </Animated.Text>
        </Animated.View>
        <Animated.View
          // eslint-disable-next-line react-native/no-inline-styles
          style={[{ width: "100%", position: "absolute" }, $animatedCreateTopicContainer]}
        >
          <CreateTopic
            hideModal={hide}
            loading={loading}
            progress={sharedValDiscuss}
            setLoading={setLoading}
            selectedImage={discussionImage}
            setSelectedImage={setDiscussionImage}
          />
        </Animated.View>
      </AnimatedTouchable>
      <AnimatedTouchable
        disabled={expanded === "post"}
        style={[$button, $postButtonAnimated]}
        onPress={expandPost}
      >
        <Animated.View style={[$flexRow, $animatedPostComponent]}>
          <Icon icon='classifieds' size={20} />
          <Animated.Text
            style={[$baseTextStyle, { color: colors.palette.neutral100 }, $animatedPostComponent]}
          >
            POST
          </Animated.Text>
        </Animated.View>
        <Animated.View
          // eslint-disable-next-line react-native/no-inline-styles
          style={[{ width: "100%", position: "absolute" }, $animatedCreatePostContainer]}
        >
          <CreatePost
            hideModal={hide}
            loading={loading}
            selectedImages={selectedPostImages}
            setSelectedImages={setSelectedPostImages}
            focused={false}
            progress={sharedValPost}
            setLoading={setLoading}
          />
        </Animated.View>
      </AnimatedTouchable>
      <Button
        text="CLASSIFIED"
        textColor={colors.palette.neutral100}
        style={[$button, { backgroundColor: colors.palette.primary300 }]}
        onPress={() => {
          if (!loading) { hide(); setTimeout(() => navigation.navigate('AddAClassified'), 200) }
        }}
      />
      {/* <Button
        text="CANCEL"
        textColor={colors.palette.primary300}
        style={$button}
        onPress={() => {
          !loading && hide()
        }}
      /> */}
      <TouchableOpacity>
        <Text  text="CANCEL"/>
      </TouchableOpacity>
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
