import React, { useEffect, useMemo, useRef, useState } from "react"
import {
  Image,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"
import { Icon, iconRegistry, Text, TextField } from "../../../components"
import { colors, spacing } from "../../../theme"
import { useStores } from "../../../models"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { MediaPicker } from "../../../utils/device/MediaPicker"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { useHooks } from "../../hooks"
import { observer } from "mobx-react-lite"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { HomeTabParamList } from "../../../tabs"

export const CreatePost = observer(function CreatePost() {
  const { createPost } = useHooks()
  const { userStore } = useStores()
  const [postContent, setPostContent] = useState<string>("")
  const [isPosting, setIsPosting] = useState<boolean>(false)
  const progress = useSharedValue(0)
  const inputRef = useRef<TextInput>()
  const [selectedImage, setSelectedImage] = useState<any>({ height: 1, width: 1 })
  const navigation = useNavigation<NavigationProp<HomeTabParamList>>()

  const onPost = async () => {
    setIsPosting(true)
    try {
      await createPost({
        attachment: selectedImage,
        content: postContent,
      })
    } catch (error) {
      console.log("Create Post", error)
    } finally {
      setIsPosting(false)
      progress.value = withTiming(0, { duration: 400 })
      setSelectedImage({ height: 1, width: 1 })
      inputRef.current.clear()
      inputRef.current.blur()
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
      const image = await MediaPicker()
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
    width: selectedImage.uri ? 80 : 0,
    alignItems: "center",
    borderRadius: 10,
  }

  const animatedPreviewContainer = useAnimatedStyle(() => {
    const height = interpolate(progress.value, [0.5, 1], [0, 80])
    const opacity = interpolate(progress.value, [0.5, 1], [0, 1])
    // const marginBottom = interpolate(progress.value, [0.5, 1], [0, 10])

    return {
      height,
      width: (80 * selectedImage?.width) / selectedImage?.height,
      marginHorizontal: 20,
      justifyContent: "center",
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
    <View>
      <View style={$container}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile", { user: userStore })}>
          <FastImage source={{ uri: userStore?.picture }} style={$picture} resizeMode="cover" />
        </TouchableOpacity>
        <View style={$contentContainer}>
          <TextField
            value={postContent}
            onChangeText={setPostContent}
            ref={inputRef}
            onFocus={onFocus}
            containerStyle={$inputContainer}
            inputWrapperStyle={$inputWrapper}
            multiline
            style={$inputText}
            placeholderTx="HomeSreen.createPostPlaceholder"
            placeholderTextColor={colors.palette.neutral700}
          />
        </View>
      </View>
      <Animated.View style={animatedMediaContainer}>
        <Animated.View style={animatedPreviewContainer}>
          <FastImage source={{ uri: selectedImage?.uri }} style={previewImage} />
        </Animated.View>
        <Pressable style={$deleteIcon} onPress={onDeletePress}>
          <Icon icon="delete" size={selectedImage.uri ? 24 : 0.0001} />
        </Pressable>
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
              <Text text="Post" style={$postTextStyle} weight="semiBold" />
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
  top: 3,
  right: spacing.small,
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
  height: 50,
  width: 50,
  borderRadius: 25,
}

const $inputText: TextStyle = {
  color: colors.palette.neutral700,
  fontSize: 13,
}
const $contentContainer: ViewStyle = {
  height: 65,
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const $inputContainer: ViewStyle = {
  marginLeft: spacing.homeScreen / 2,
  flex: 1,
  borderWidth: 0,
  padding: 0,
}

const $inputWrapper: ViewStyle = {
  width: "100%",
  maxHeight: "100%",
  borderBottomWidth: 0,
}

const $container: ViewStyle = {
  width: "100%",
  height: 80,
  backgroundColor: colors.palette.neutral100,
  paddingHorizontal: spacing.homeScreen,
  flexDirection: "row",
  alignItems: "center",
  // borderBottomWidth: 0.5,
  // borderBottomColor: colors.background,
  shadowColor: colors.background,
  shadowRadius: 10,
  shadowOpacity: 0.8,
  shadowOffset: { height: 1, width: 0 },
}
