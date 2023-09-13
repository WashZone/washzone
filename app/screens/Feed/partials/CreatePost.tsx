import React, { useEffect, useMemo, useRef, useState } from "react"
import {
  Image,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  Pressable,
  ActivityIndicator,
} from "react-native"
import { Icon, iconRegistry, Text, Button, TagInput, TOnPost } from "../../../components"
import { colors, spacing } from "../../../theme"
import { useStores } from "../../../models"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { MediaPicker } from "../../../utils/device/MediaPicker"
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"
import { observer } from "mobx-react-lite"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { HomeTabParamList } from "../../../tabs"
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist"
import { $contentCenter, $flexRow } from "../../styles"
import { ResizeMode, Video } from "expo-av"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"
import LinearGradient from "react-native-linear-gradient"

export const CreatePost = observer(function CreatePost({
  progress,
  focused,
  setLoading,
  loading,
  hideModal,
  selectedImages,
  setSelectedImages,
  onPost,
}: {
  focused: boolean
  loading: boolean
  progress: SharedValue<number>
  setLoading: (b: boolean) => void
  hideModal: () => void
  onPost: TOnPost
  selectedImages: Array<any>
  setSelectedImages: (s: Array<any>) => void
}) {
  const { userStore } = useStores()
  const [postContent, setPostContent] = useState<string>("")
  const inputRef = useRef<TextInput>()
  const navigation = useNavigation<NavigationProp<HomeTabParamList>>()

  useEffect(() => {
    focused && inputRef.current.focus()
  }, [focused])

  const handlePost = async () => {
    if (postContent?.trim()?.length === 0 && selectedImages?.length === 0) return
    setLoading(true)
    onPost({ files: selectedImages, postContent })
    progress.value = withTiming(0, { duration: 400 })
    setSelectedImages([])
    setPostContent("")
    inputRef.current.blur()
    hideModal()
    setLoading(false)
  }

  const onFocus = () => {
    if (progress.value < 0.5) {
      progress.value = withTiming(0.5, { duration: 200 })
    }
  }

  useEffect(() => {
    progress.value = withTiming(0, { duration: 200 })
  }, [])

  const onGalleryPress = async () => {
    try {
      const images = await MediaPicker({
        selectionLimit: 5 - selectedImages.length,
        mediaType: "mixed",
      })
      if (images?.length > 0) {
        setSelectedImages([...selectedImages, ...images])

        /* A 100ms timeout so that the user actually views the animation post selecting media */
        setTimeout(() => {
          progress.value = withTiming(1, { duration: 300 })
        }, 100)
      }
    } catch (e) {}
  }

  const onDeletePress = (item) => {
    const temp = selectedImages.filter((i) => i !== item)
    if (temp.length === 0) {
      progress.value = withTiming(0.5, { duration: 200 })
    }
    setSelectedImages(temp)
  }

  const AnimatedImage = Animated.createAnimatedComponent(Image)
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

  const previewImage = (item: any) => {
    return {
      height: item?.uri ? 80 : 0,
      width: item?.uri ? 80 : 0,
      borderRadius: 10,
    }
  }

  const animatedPreviewContainer = (item) =>
    useAnimatedStyle(() => {
      const height = interpolate(progress.value, [0.5, 1], [0, 80])
      const opacity = interpolate(progress.value, [0.5, 1], [0, 1])
      // const marginBottom = interpolate(progress.value, [0.5, 1], [0, 10])

      return {
        height,
        width: (80 * item?.width) / item?.height,
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
      // backgroundColor: colors.palette.neutral100,
    }
  })

  return (
    <View>
      <View style={$container}>
        <FastImage source={{ uri: userStore?.picture }} style={$picture} resizeMode="cover" />
        <View style={$contentContainer}>
          <TagInput
            value={postContent}
            onChange={(e) => {
              if (!loading) {
                setPostContent(e)
              }
            }}
            inputRef={inputRef}
            onFocus={onFocus}
            onBlur={() => {
              if (focused) navigation.setParams({ focused: false })
            }}
            containerStyle={$inputContainer}
            style={$inputText}
            multiline
            placeholder="What's on your mind?"
            placeholderTextColor={colors.palette.neutral700}
            // eslint-disable-next-line react-native/no-inline-styles
            suggestionsContainerStyle={{ bottom: 70 }}
          />
        </View>
      </View>
      <Animated.View style={animatedMediaContainer}>
        <DraggableFlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={selectedImages}
          onDragEnd={({ data }) => setSelectedImages(data)}
          ListFooterComponent={
            selectedImages?.length < 5 &&
            selectedImages?.length > 0 && (
              <Button style={$addImagesButton} onPress={onGalleryPress}>
                <Icon icon="plus" size={28} color={colors.palette.neutral100} />
              </Button>
            )
          }
          renderItem={({ item, drag, isActive }) => {
            const videoRef = useRef<Video>()
            const isVideo = item.type.startsWith("video")
            const [loaded, setLoaded] = useState(false)
            return (
              <ScaleDecorator>
                <Pressable
                  onLongPress={drag}
                  disabled={isActive}
                  // onPress={() =>  }
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{ width: 120, marginVertical: spacing.extraSmall }}
                >
                  <Animated.View style={animatedPreviewContainer(item)}>
                    {isVideo ? (
                      <ShimmerPlaceholder
                        shimmerStyle={previewImage(item)}
                        LinearGradient={LinearGradient}
                        visible={loaded}
                      >
                        <Video
                          ref={videoRef}
                          onReadyForDisplay={() => setLoaded(true)}
                          shouldPlay
                          source={{ uri: item?.uri || item?.url }}
                          style={previewImage(item)}
                          resizeMode={ResizeMode.COVER}
                        />
                      </ShimmerPlaceholder>
                    ) : (
                      <FastImage source={{ uri: item?.uri }} style={previewImage(item)} />
                    )}
                  </Animated.View>

                  <Icon
                    icon="x"
                    size={item.uri ? 22 : 0.0001}
                    containerStyle={$deleteIcon}
                    onPress={() => onDeletePress(item)}
                  />
                  {isVideo && (
                    <Icon
                      icon="play"
                      size={item.uri ? 27 : 0.0001}
                      containerStyle={$playIcon}
                      onPress={() => videoRef.current.presentFullscreenPlayer()}
                    />
                  )}
                </Pressable>
              </ScaleDecorator>
            )
          }}
          keyExtractor={function (item: any): string {
            return item?.uri
          }}
        />
        <View
          style={[
            $bottomActionContainer,
            // eslint-disable-next-line react-native/no-inline-styles
            { zIndex: -1 },
          ]}
        >
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
          <AnimatedPressable disabled={loading} onPress={handlePost} style={animatedPostButton}>
            {loading ? (
              <View style={$flexRow}>
                {/* {selectedImages?.length > 0 && (
                  <Text
                    text={uploadProgress}
                    color={colors.palette.neutral100}
                    weight="medium"
                    size="xs"
                  />
                )} */}
                <ActivityIndicator
                  color={colors.palette.neutral100}
                  style={$loadingIndicator}
                  animating
                />
              </View>
            ) : (
              <Text text="Post" style={$postTextStyle} weight="semiBold" />
            )}
          </AnimatedPressable>
        </View>
      </Animated.View>
    </View>
  )
})

const $addImagesButton: ViewStyle = {
  height: 80,
  width: 80,
  borderRadius: 10,
  marginLeft: 30,
  marginRight: 40,
  backgroundColor: colors.palette.primary300,
  marginVertical: spacing.extraSmall,
}

const $loadingIndicator: ViewStyle = {
  transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }],
  marginLeft: spacing.extraSmall,
}

const $deleteIcon: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 8,
  backgroundColor: colors.background,
  position: "absolute",
  top: -5,
  left: 85,
  ...$contentCenter,
}

const $playIcon: ViewStyle = {
  position: "absolute",
  left: 46,
  top: 28,
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
  paddingHorizontal: spacing.extraSmall,
  width: "100%",
}

const $container: ViewStyle = {
  width: "100%",
  height: 80,
  // backgroundColor: colors.palette.neutral100,
  paddingHorizontal: spacing.homeScreen,
  flexDirection: "row",
  alignItems: "center",
  // borderBottomWidth: 0.5,
  // borderBottomColor: colors.background,
}
