import React, { useCallback, useEffect, useState } from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"
import { Text, Button, BottomModal, Icon, $baseTextStyle, TOnPost, TOnTopic } from "."

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
import { useHooks } from "../screens/hooks"
import { getTaggedIds } from "../utils/helpers"
import Toast from "react-native-toast-message"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"
import LinearGradient from "react-native-linear-gradient"

const AnimatedShimmer = Animated.createAnimatedComponent(ShimmerPlaceholder)

export const AddPostModal = () => {
  const [uploading, setUploding] = useState(false)
  const [isVisible, setVisible] = useState(false)
  const { createPost, createTopic } = useHooks()

  const uploadProgress = useSharedValue(0)

  const hideModal = () => setVisible(false)

  const $uploadShimmerStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(uploadProgress.value, [0, 1], [5.6, 56]),
      height: 100,
    }
  })

  const setUploadProgress = useCallback(
    (val: number) => {
      uploadProgress.value = withTiming(val, { duration: 500 })
    },
    [uploadProgress],
  )

  const onPost = async ({ postContent, files }) => {
    hideModal()
    setUploding(true)
    try {
      await createPost({
        tagUser: getTaggedIds(postContent),
        attachments: files,
        content: postContent,
        setUploadProgress,
      })
    } catch (error) {
      console.log("Create Post", error)
    } finally {
      setTimeout(() => {
        setUploding(false)
        Toast.show({ text1: "Posted Successfully !" })
      }, 500)
    }
  }

  const onTopic = async ({ topicContent, file, title }: Parameters<TOnTopic>[0]) => {
    hideModal()
    setUploding(true)
    try {
      await createTopic({
        content: topicContent,
        attachment: file,
        title,
        tagTopicUser: [],
        setUploadProgress,
      })
    } catch (error) {
      console.log("Create Topic", error)
    } finally {
      setTimeout(() => {
        setUploding(false)
        Toast.show({ text1: "Discussion Started Successfully !" })
      }, 500)
    }
  }

  return (
    <View style={{justifyContent:"center",alignItems:"center"}}>
      <Button
        disabled={uploading}
        style={[
          $addButton,
          {
            // bottom: bottom + 72,
            backgroundColor: uploading ? colors.palette.neutral500 : colors.palette.primary100,
          },
        ]}
        onPress={() => setVisible(true)}
      >
        {uploading && (
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <AnimatedShimmer
              LinearGradient={LinearGradient}
              // eslint-disable-next-line react-native/no-inline-styles
              shimmerStyle={{ innerHeight: "100%", width: "100%" }}
              style={$uploadShimmerStyle}
              shimmerColors={[colors.palette.primary100, colors.palette.primary200]}
              location={[0, 1]}
              visible={false}
            ></AnimatedShimmer>
          </View>
        )}
        <Icon
          icon={"plus"}
          size={40}
          color={uploading ? colors.palette.neutral300 : colors.palette.neutral100}
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={{ position: "absolute" }}
        />
      </Button>

      <BottomModal
        avoidKeyboard
        keyboardOffset={-90}
        isVisible={isVisible}
        setVisible={setVisible}
        backgroundColor={colors.palette.neutral100}
        propagateSwipe
      >
        <BottomModalContent onPost={onPost} onTopic={onTopic} hide={hideModal} />
      </BottomModal>
    </View>
  )
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

export const BottomModalContent = ({
  hide,
  onPost,
  onTopic,
}: {
  hide: () => void
  onPost: TOnPost
  onTopic: TOnTopic
}) => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const sharedValPost = useSharedValue(0)
  const sharedValDiscuss = useSharedValue(0)
  const [expanded, setExpanded] = useState<"post" | "discuss" | undefined>(undefined)
  const [postModal, setPostmodal] = useState(false)
  const [topicModal, setTopicmodal] = useState(false)
  // this is to change the progress according to the fact whether the images are present or not
  const [discussionImage, setDiscussionImage] = useState<any>({ height: 1, width: 1 })
  const [selectedPostImages, setSelectedPostImages] = useState<Array<any>>([])

  const expandPost = () => {
    setExpanded("post")
    setPostmodal(true)
    setTopicmodal(false)
  }

  const expandDiscuss = () => {
    setExpanded("discuss")
    setTopicmodal(true)
    setPostmodal(false)
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
      {!postModal ? (
        <TouchableOpacity disabled={expanded === "post"} style={[$button]} onPress={expandPost}>
          <View style={[$flexRow, $contentCenter]}>
            <Icon icon="topics" size={18} containerStyle={{ marginRight: spacing.extraSmall }} />
            <Text style={[$baseTextStyle, { color: colors.palette.neutral100 }]}>
              Create a Post
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={[$absoluteWidthFull]}>
          <CreatePost
            onPost={onPost}
            selectedImages={selectedPostImages}
            setSelectedImages={setSelectedPostImages}
            progress={sharedValPost}
          />
        </View>
      )}

      {/* DISCUSS Button */}
      {!topicModal ? (
        <TouchableOpacity
          disabled={expanded === "discuss"}
          style={[$button]}
          onPress={expandDiscuss}
        >
          <View style={[$flexRow, $contentCenter]}>
            <Icon icon="topics" size={18} containerStyle={{ marginRight: spacing.extraSmall }} />
            <Text style={[$baseTextStyle, { color: colors.palette.neutral100 }]}>
              Start a Discussion
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={[$absoluteWidthFull ,]}>
          <CreateTopic
            onTopic={onTopic}
            progress={sharedValDiscuss}
            selectedImage={discussionImage}
            setSelectedImage={setDiscussionImage}
          />
        </View>
      )}

      {/* CLASSIFIED Button */}
      <TouchableOpacity
        style={[$flexRow, $button, $contentCenter]}
        onPress={() => {
          hide()
          setTimeout(() => navigation.navigate("AddAClassified"), 200)
        }}
      >
        <Icon icon="classifieds" size={18} containerStyle={{ marginRight: spacing.extraSmall }} />
        <Text text="Post a Classified" style={$baseTextStyle} color={colors.palette.neutral100} />
      </TouchableOpacity>

      {/* CANCEL Button */}
      <TouchableOpacity
        onPress={() => {
          hide()
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

const $absoluteWidthFull: ViewStyle = { width: "100%" }

const $addButton: ViewStyle = {
  margin: 12,
  width: 56,
  height: 56,
  borderRadius: 30,
  // position: "absolute",
  // right: 0,
  paddingHorizontal: 0,
  alignItems: "flex-start",
  borderColor: colors.palette.neutral100,
  ...$contentCenter,
}

const $button: ViewStyle = {
  padding: 12,
  marginHorizontal: 12,
  marginVertical: 6,
  borderRadius: 30,
  borderColor: colors.palette.primary100,
  backgroundColor: colors.palette.primary100,
  borderWidth: 1,
  ...$contentCenter,
}

export default AddPostModal
