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
        <Icon icon={"addBold"} size={40} color={colors.palette.primary100} />
      </Button>

      <BottomModal
        disableUnMount={loading}
        avoidKeyboard
        keyboardOffset={-90}
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
        [colors.palette.primary100, colors.transparent],
      ),
    }
  })

  const $discussButtonAnimated = useAnimatedStyle(() => {
    return {
      height: interpolate(sharedValDiscuss.value, [0, 0.5, 1], [52, 180, 280]),

      backgroundColor: interpolateColor(
        sharedValDiscuss.value,
        [0, 0.5],
        [colors.palette.primary100, colors.transparent],
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
      {/* POST Button */}
      <AnimatedTouchable
        disabled={expanded === "post"}
        style={[$button, $postButtonAnimated]}
        onPress={expandPost}
      >
        <Animated.View style={[$flexRow, $animatedPostComponent, $contentCenter]}>
          <Icon icon="topics" size={18} containerStyle={{ marginRight: spacing.extraSmall }} />
          <Animated.Text
            style={[$baseTextStyle, { color: colors.palette.neutral100 }, $animatedPostComponent]}
          >
            Create a Post
          </Animated.Text>
        </Animated.View>
        <Animated.View style={[$absoluteWidthFull, $animatedCreatePostContainer]}>
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



      {/* DISCUSS Button */}
      <AnimatedTouchable
        disabled={expanded === "discuss"}
        style={[$button, $discussButtonAnimated]}
        onPress={expandDiscuss}
      >
        <Animated.View style={[$flexRow, $animatedDiscussComponent, $contentCenter]}>
          <Icon icon="topics" size={18} containerStyle={{ marginRight: spacing.extraSmall }} />
          <Animated.Text
            style={[
              $baseTextStyle,
              { color: colors.palette.neutral100 },
              $animatedDiscussComponent,
            ]}
          >
            Start a Discussion
          </Animated.Text>
        </Animated.View>
        <Animated.View style={[$absoluteWidthFull, $animatedCreateTopicContainer]}>
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



      {/* CLASSIFIED Button */}
      <TouchableOpacity
        style={[$flexRow, $button, $contentCenter]}
        onPress={() => {
          if (!loading) {
            hide()
            setTimeout(() => navigation.navigate("AddAClassified"), 200)
          }
        }}
      >
        <Icon icon="classifieds" size={18} containerStyle={{ marginRight: spacing.extraSmall }} />
        <Text text="Post a Classified" style={$baseTextStyle} color={colors.palette.neutral100} />
      </TouchableOpacity>

      {/* CANCEL Button */}
      <TouchableOpacity
        onPress={() => {
          !loading && hide()
        }}
        style={[
          $button,
          {
            backgroundColor: colors.transparent,
            borderColor: colors.transparent,
            margin: spacing.zero,
          },
        ]}
      >
        <Text text="CANCEL" style={$baseTextStyle} color={colors.palette.neutral500} />
      </TouchableOpacity>
    </View>
  )
}

const $absoluteWidthFull: ViewStyle = { width: "100%", position: "absolute" }

const $addButton: ViewStyle = {
  padding: 12,
  margin: 12,
  width: 56,
  height: 56,
  borderRadius: 30,
  borderColor: colors.palette.primary100,
  borderWidth: 1,
}

const $headerText: TextStyle = {
  marginVertical: spacing.medium,
  textAlign: "center",
}

const $button: ViewStyle = {
  padding: 12,
  marginHorizontal: 12,
  marginVertical:6,
  borderRadius: 30,
  borderColor: colors.palette.primary100,
  backgroundColor: colors.palette.primary100,
  borderWidth: 1,
  ...$contentCenter,
}

export default AddPostModal
