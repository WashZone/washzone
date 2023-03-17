import React, { useMemo, useRef, useState } from "react"
import {
  Image,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  Pressable,
  ActivityIndicator,
} from "react-native"
import { $fontWeightStyles, Icon, iconRegistry, Text, TextField } from "../../components"
import { colors, spacing } from "../../theme"
import { useStores } from "../../models"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { MediaPicker } from "../../utils/device/MediaPicker"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { useHooks } from "../hooks"

export function CreateTopic() {
  const {
    userStore: { picture, _id },
  } = useStores()
  const [postContent, setPostContent] = useState<string>("")
  const [topicDescription, setTopicDescription] = useState<string>("")
  const [topicTitle, setTopicTitle] = useState<string>("")
  const [isPosting, setIsPosting] = useState<boolean>(false)
  const progress = useSharedValue(0)
  const inputRef = useRef<TextInput>()
  const inputTitleRef = useRef<TextInput>()
  const [selectedImage, setSelectedImage] = useState<any>({ height: 1, width: 1 })
  const { createTopic, loadStories, refreshTopics } = useHooks()
  const onPost = async () => {
    setIsPosting(true)
    // const data = new FormData()
    // data.append('uri',selectedImage?.uri)
    // data.append('uri',selectedImage?.uri)
    // data.append('uri',selectedImage?.uri)

    try {
      // await uploadFile(selectedImage)
      // const res = await mutateUploadFile({
      //   uri: selectedImage?.uri,
      //   type: selectedImage?.type,
      //   fileName: selectedImage?.fileName,
      // })

      await createTopic({
        content: topicDescription,
        attachment: selectedImage,
        title: topicTitle,
      })
      await refreshTopics()
      await loadStories()
    } catch (error) {
    } finally {
      setIsPosting(false)
      progress.value = withTiming(0, { duration: 400 })
      setSelectedImage({ height: 1, windth: 1 })
      inputRef.current.clear()
      inputTitleRef.current.clear()
      inputRef.current.blur()
    }
  }

  const onFocus = () => {
    if (progress.value < 0.5) {
      progress.value = withTiming(0.5, { duration: 200 })
    }
  }

  const onGalleryPress = async () => {
    try {
      if (selectedImage.uri) {
        setTimeout(() => {
          progress.value = withTiming(0.8, { duration: 300 })
        }, 300)
      }

      const image = await MediaPicker()
      if (image?.uri) {
        setSelectedImage(image)
      }

      setTimeout(() => {
        progress.value = withTiming(1, { duration: 300 })
      }, 100)
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
    width: selectedImage.uri ? (80 * selectedImage?.width) / selectedImage?.height : 0,
    alignItems: "center",
    borderRadius: 10,
  }

  const animatedPreviewContainer = useAnimatedStyle(() => {
    const height = interpolate(progress.value, [0.5, 1], [0, 80])
    const opacity = interpolate(progress.value, [0.5, 1], [0, 1])
    const marginBottom = interpolate(progress.value, [0.5, 1], [0, 10])

    return {
      height,
      width: (80 * selectedImage?.width) / selectedImage?.height,
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
      backgroundColor: colors.palette.neutral100,
    }
  })

  return (
    <>
      <View style={$container}>
        <FastImage source={{ uri: picture }} style={$picture} resizeMode="contain" />
        <View style={$contentContainer}>
          <TextField
            value={topicTitle}
            onChangeText={setTopicTitle}
            ref={inputTitleRef}
            onFocus={onFocus}
            containerStyle={$inputContainerTitle}
            inputWrapperStyle={$inputWrapper}
            style={[$inputText, $fontWeightStyles.medium]}
            placeholder="Title"
            placeholderTextColor={colors.palette.neutral400}
          />
          <TextField
            value={topicDescription}
            onChangeText={setTopicDescription}
            ref={inputRef}
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
          <AnimatedPressable disabled={isPosting} onPress={onPost} style={animatedPostButton}>
            {isPosting ? (
              <ActivityIndicator
                color={colors.palette.neutral100}
                style={$loadingIndicator}
                animating
              />
            ) : (
              <Text text="Create" style={$postTextStyle} weight="semiBold" />
            )}
          </AnimatedPressable>
        </View>
      </Animated.View>
    </>
  )
}

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
  marginBottom: 10,
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
  backgroundColor: colors.palette.neutral100,
  paddingHorizontal: spacing.homeScreen,
  flexDirection: "row",
  alignItems: "center",
  shadowColor: colors.background,
  shadowRadius: 10,
  shadowOpacity: 0.9,
  shadowOffset: { height: -10, width: 1 },
}
