import React, { useEffect, useMemo, useState } from "react"
import { Image, TextStyle, View, ViewStyle, Pressable, ActivityIndicator } from "react-native"
import { $fontWeightStyles, Icon, iconRegistry, Text, TextField, TOnTopic } from "../../components"
import { colors, spacing } from "../../theme"
import { useStores } from "../../models"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { MediaPicker } from "../../utils/device/MediaPicker"
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"
import Toast from "react-native-toast-message"
import { toastMessages } from "../../utils/toastMessages"
import { observer } from "mobx-react-lite"

export const CreateTopic = observer(function CreateTopic({
  inputFocused = false,
  defaultTopic,
  progress,
  selectedImage,
  setSelectedImage,
  onTopic,
}: {
  inputFocused?: boolean
  progress: SharedValue<number>
  defaultTopic?: any
  selectedImage: any
  setSelectedImage: (a: any) => void
  onTopic: TOnTopic
}) {
  const { userStore } = useStores()
  const [topicDescription, setTopicDescription] = useState(
    defaultTopic ? defaultTopic.topicContent : "",
  )
  const [topicTitle, setTopicTitle] = useState(defaultTopic ? defaultTopic.title : "")
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    setLoading(true)
    if (topicTitle.replace(/\s/g, "")?.length === 0) {
      Toast.show(toastMessages.inputTitle)
      setLoading(false)
      return
    }
    if (topicDescription.replace(/\s/g, "")?.length === 0) {
      Toast.show(toastMessages.inputDescription)
      setLoading(false)
      return
    }
    try {
      onTopic({
        title: topicTitle.trim(),
        topicContent: topicDescription.trim(),
        file: selectedImage,
        topicId: defaultTopic?._id,
      })
    } catch (error) {
    } finally {
      setLoading(false)
      progress.value = withTiming(0, { duration: 400 })
      setSelectedImage({ height: 1, width: 1 })
    }
  }

  const onFocus = () => {
    if (progress.value < 0.5) {
      progress.value = withTiming(0.5, { duration: 200 })
    }
  }

  useEffect(
    () => () => {
      progress.value = withTiming(0, { duration: 200 })
    },
    [],
  )

  const onGalleryPress = async () => {
    try {
      const image = await MediaPicker({})
      if (image?.uri) {
        setSelectedImage(image)
        setTimeout(() => {
          progress.value = withTiming(1, { duration: 300 })
        }, 100)
      }
    } catch (e) {}
  }

  const onDeletePress = () => {
    progress.value = withTiming(0.5, { duration: 200 })
    setSelectedImage({ height: 1, width: 1 })
  }

  const AnimatedImage = Animated.createAnimatedComponent(Image)
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

  const previewImage: ImageStyle = {
    height: selectedImage.uri ? 80 : 0,
    width: 80,
    alignItems: "center",
    borderRadius: 10,
  }

  const animatedPreviewContainer = useAnimatedStyle(() => {
    const height = interpolate(progress.value, [0.5, 1], [0, 80])
    const opacity = interpolate(progress.value, [0.5, 1], [0, 1])
    const marginBottom = interpolate(progress.value, [0.5, 1], [0, 10])

    return {
      height,
      width: 80,
      marginHorizontal: 20,
      justifyContent: "center",
      marginBottom,
      opacity,
    }
  })

  const animatedPostButton = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.5], [0, 1])
    const height = interpolate(progress.value, [0, 0.5, 1], [0, 30, 30])
    const width = interpolate(progress.value, [0, 0.5, 1], [0, 100, 100])

    return {
      height,
      width,
      opacity,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.palette.primary100,
      borderRadius: 6,
    }
  })

  const animatedGalleryIcon = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.5], [0, 1])
    const height = interpolate(progress.value, [0, 0.5], [0, 24])

    return {
      height,
      width: 24,
      opacity,
      resizeMode: "contain",
    }
  })

  const animatedMediaContainer = useAnimatedStyle(() => {
    const height = interpolate(progress.value, [0, 0.5, 1], [0, 50, 130])
    return {
      height,
      width: "100%",
      justifyContent: "center",
    }
  })

  return (
    <View>
      <View style={$container}>
        <FastImage source={{ uri: userStore?.picture }} style={$picture} resizeMode="cover" />

        <View style={$contentContainer}>
          <TextField
            value={topicTitle}
            onChangeText={setTopicTitle}
            onFocus={onFocus}
            autoFocus={inputFocused}
            containerStyle={$inputContainerTitle}
            inputWrapperStyle={$inputWrapper}
            style={[$inputText, $fontWeightStyles.medium]}
            placeholder="Title"
            placeholderTextColor={colors.palette.neutral400}
          />
          <TextField
            value={topicDescription}
            onChangeText={setTopicDescription}
            onFocus={onFocus}
            containerStyle={$inputContainer}
            inputWrapperStyle={$inputWrapper}
            multiline
            // numberOfLines={3}
            style={$inputText}
            placeholder="Description"
            placeholderTextColor={colors.palette.neutral400}
          />
        </View>
      </View>
      <Animated.View style={animatedMediaContainer}>
        <Pressable style={$deleteIcon} onPress={onDeletePress}>
          <Icon
            icon="delete"
            color={colors.palette.neutral500}
            size={selectedImage.uri ? 28 : 0.0000001}
          />
        </Pressable>
        <Animated.View style={animatedPreviewContainer}>
          <FastImage source={{ uri: selectedImage?.uri }} style={previewImage} />
        </Animated.View>
        <View style={$bottomActionContainer}>
          <View style={$actionButtonsContainer}>
            <Pressable onPress={onGalleryPress}>
              {useMemo(
                () => (
                  <AnimatedImage source={iconRegistry.gallery} style={animatedGalleryIcon} />
                ),
                [progress],
              )}
            </Pressable>
          </View>
          <AnimatedPressable disabled={loading} onPress={handleCreate} style={animatedPostButton}>
            {loading ? (
              <ActivityIndicator
                color={colors.palette.neutral100}
                style={$loadingIndicator}
                animating
              />
            ) : (
              <Text
                text={defaultTopic ? "Update" : "Create"}
                style={$postTextStyle}
                weight="semiBold"
              />
            )}
          </AnimatedPressable>
        </View>
      </Animated.View>
    </View>
  )
})

const $loadingIndicator: ViewStyle = {
  transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }],
}

const $deleteIcon: ViewStyle = {
  position: "absolute",
  top: 0,
  right: spacing.medium,
}

const $actionButtonsContainer: ViewStyle = {
  height: "100%",
  flexDirection: "row",
  alignItems: "center",
}

const $postTextStyle: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 12,
}

const $bottomActionContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  // marginBottom: 10,
}

const $picture: ImageStyle = {
  height: 70,
  width: 70,
  borderRadius: 35,
}

const $inputText: TextStyle = {
  color: colors.palette.neutral700,
  fontSize: 13,
}
const $contentContainer: ViewStyle = {
  height: 100,
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  // backgroundColor: "red",
}

const $inputContainer: ViewStyle = {
  marginLeft: spacing.homeScreen / 2,
  flex: 1,
  borderWidth: 0,
  padding: 0,
  // backgroundColor:'blue'
}

const $inputContainerTitle: ViewStyle = {
  marginLeft: spacing.homeScreen / 2,
  borderWidth: 0,
  padding: 0,
  // backgroundColor:'green',
  height: 28,
}

const $inputWrapper: ViewStyle = {
  width: "100%",
  maxHeight: "100%",
  borderBottomWidth: 0,
}

const $container: ViewStyle = {
  width: "100%",
  height: 115,

  paddingHorizontal: spacing.homeScreen,
  flexDirection: "row",
  alignItems: "center",
  // shadowColor: colors.background,
  // shadowRadius: 10,
  // shadowOpacity: 0.9,
  // shadowOffset: { height: -10, width: 1 },
}
