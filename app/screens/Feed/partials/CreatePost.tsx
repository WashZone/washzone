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
import {
  Icon,
  iconRegistry,
  Text,
  Button,
  TagInput,
} from "../../../components"
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
import { useHooks } from "../../hooks"
import { observer } from "mobx-react-lite"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { HomeTabParamList } from "../../../tabs"
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist"
import { $contentCenter, $flexRow } from "../../styles"
import { getTaggedIds } from "../../../utils/helpers"

export const CreatePost = observer(function CreatePost({
  progress,
  focused,
}: {
  focused: boolean
  progress: SharedValue<number>
}) {
  const { createPost } = useHooks()
  const { userStore } = useStores()
  const [postContent, setPostContent] = useState<string>("")
  const [isPosting, setIsPosting] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<string>("0/0")
  const inputRef = useRef<TextInput>()
  const [selectedImages, setSelectedImages] = useState<Array<any>>([])
  const navigation = useNavigation<NavigationProp<HomeTabParamList>>()

  useEffect(() => {
    console.log("FOCUSING createPost : ", focused)
    focused && inputRef.current.focus()
  }, [focused])

  const onPost = async () => {
    setIsPosting(true)
    try {
      await createPost({
        tagUser: getTaggedIds(postContent),
        attachments: selectedImages,
        content: postContent,
        setUploadProgress,
      })
    } catch (error) {
      console.log("Create Post", error)
    } finally {
      setIsPosting(false)
      progress.value = withTiming(0, { duration: 400 })
      setSelectedImages([])
      setPostContent("")
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
      const images = await MediaPicker({ selectionLimit: 5 })
      console.log(images)
      if (images?.length > 0) {
        setSelectedImages(images)
        setTimeout(() => {
          progress.value = withTiming(1, { duration: 300 })
        }, 100)
      }
    } catch (e) { }
  }

  const onAddMoreImages = async () => {
    try {
      const images = await MediaPicker({ selectionLimit: 5 - selectedImages.length })
      // console.log(images)
      if (images?.length > 0) {
        setSelectedImages([...selectedImages, ...images])
        // setTimeout(() => {
        //   progress.value = withTiming(1, { duration: 300 })
        // }, 100)
      }
    } catch (e) { }
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
      backgroundColor: colors.palette.neutral100,
    }
  })

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ position: "absolute", top: 0, width: "100%" }}>
      <View style={$container}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile", { user: userStore })}>
          <FastImage source={{ uri: userStore?.picture }} style={$picture} resizeMode="cover" />
        </TouchableOpacity>
        <View style={$contentContainer}>
          <TagInput
            value={postContent}
            onChange={setPostContent}
            inputRef={inputRef}
            onFocus={onFocus}
            onBlur={() => {
              console.log("BLURRING")
              if (focused) navigation.setParams({ focused: false })
            }}
            containerStyle={$inputContainer}
            style={$inputText}
            multiline
            placeholder="What's on your mind?"
            placeholderTextColor={colors.palette.neutral700}
            additionalPartTypes={{ isBottomMentionSuggestionsRender: true, trigger: "@" }}
            // eslint-disable-next-line react-native/no-inline-styles
            suggestionsContainerStyle={{ top: 70 }}
            portalized
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
              <Button style={$addImagesButton} onPress={onAddMoreImages}>
                <Icon icon="plus" size={28} color={colors.palette.neutral100} />
              </Button>
            )
          }
          renderItem={({ item, drag, isActive }) => (
            <ScaleDecorator >
              <Pressable onLongPress={drag} disabled={isActive} style={{ width: 120, marginVertical: spacing.extraSmall }} >
                <Animated.View style={animatedPreviewContainer(item)}>
                  <FastImage source={{ uri: item?.uri }} style={previewImage(item)} />
                </Animated.View>

                <Icon icon="x" size={item.uri ? 22 : 0.0001} containerStyle={$deleteIcon} onPress={() => onDeletePress(item)} />

              </Pressable>
            </ScaleDecorator>
          )}
          keyExtractor={function (item: any): string {
            return item?.uri
          }}
        />
        <View style={[$bottomActionContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          { zIndex: -1 }]}>
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
              <View style={$flexRow}>
                {selectedImages?.length > 0 && (
                  <Text
                    text={uploadProgress}
                    color={colors.palette.neutral100}
                    weight="medium"
                    size="xs"
                  />
                )}
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
  marginVertical: spacing.extraSmall
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
  ...$contentCenter
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
