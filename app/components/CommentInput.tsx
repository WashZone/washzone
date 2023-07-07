import React, { useState, useEffect, useRef, } from "react"
import {
  View,
  TextInput,
  ViewStyle,
  ActivityIndicator,
  TextStyle,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import FastImage from "react-native-fast-image"
import { colors, spacing } from "../theme"
import { Icon } from "./Icon"
import { Capture, MediaPicker } from "../utils/device/MediaPicker"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ChooseMediaModal } from "."
import { TagInput } from "./TagInput"
// import { getTaggedIds } from "../utils/helpers"

interface CommentInputProps {
  createComment: (text: string, selectedMedia: any) => Promise<void>
  placeholder?: string
  bottomSafe?: boolean
  tagable?: boolean
}

export const CommentInput = ({
  createComment,
  bottomSafe,
  placeholder,
  tagable = true,
}: CommentInputProps) => {
  const [commentText, setCommentText] = useState("")
  const [selectedMedia, setSelectedMedia] = useState(undefined)
  const [isCommenting, setIsCommenting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [showChooseMediaModal, setShowChooseMediaModal] = useState(false)
  const focus = useSharedValue(0)
  const animMediaVal = useSharedValue(0)
  const inputRef = useRef<TextInput>()
  const safeAreInsets = useSafeAreaInsets()

  const onComment = async () => {
    if (commentText?.length === 0 && selectedMedia === undefined) return
    setIsCommenting(true)
    await createComment(commentText.trim(), selectedMedia)
    setCommentText("")
    setSelectedMedia(undefined)
    setIsCommenting(false)
    inputRef.current.blur()
  }

  const onAddImage = async () => {
    const res = await MediaPicker()
    res && setSelectedMedia(res)
  }

  const onCapture = async () => {
    const res = await Capture()
    res && setSelectedMedia(res)
  }

  const $animatedContainer = useAnimatedStyle(() => {
    return {
      marginBottom: interpolate(focus.value, [0, 1], [bottomSafe ? safeAreInsets.bottom : 0, 0]),
      height: interpolate(focus.value, [0, 1], [50, 100]),
    }
  })

  const $animatedMediaContainer = useAnimatedStyle(() => {
    return {
      width: interpolate(animMediaVal.value, [0, 1], [40, 100]),
      height: interpolate(animMediaVal.value, [0, 1], [24, 100]),
      justifyContent: 'center', alignItems: 'center'
    }
  })

  const $animatedImageContainer = useAnimatedStyle(() => {
    return {
      width: interpolate(animMediaVal.value, [0, 1], [0, 100]),
      height: interpolate(animMediaVal.value, [0, 1], [0, 100]),
      position: 'absolute', top: 0, justifyContent: 'center', alignItems: 'center'
    }
  })

  const $animatedAttachIconContainer = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(animMediaVal.value, [0, 1], [1, 0]) }],
      opacity: interpolate(animMediaVal.value, [0, 1], [1, 0]),
     paddingLeft:4
    }
  })
  useEffect(() => {
    if (isFocused) focus.value = withTiming(1, { duration: 200 })
    else {
      if (selectedMedia === undefined) { focus.value = withTiming(0, { duration: 200 }) }
    }
  }, [isFocused])

  useEffect(() => {

    animMediaVal.value = withTiming(selectedMedia ? 1 : 0, { duration: 200 })
    if (selectedMedia !== undefined) { setIsFocused(true) }
  }, [selectedMedia])

  return (
    <>

      <Animated.View style={[$postCommentContainer, $animatedContainer]}>
        <Animated.View style={$animatedMediaContainer}>
          <Animated.View style={$animatedAttachIconContainer}>
            <Icon
              icon="attachment"
              disabled={isCommenting}
              size={24}
              onPress={() => setShowChooseMediaModal(true)}
            />
          </Animated.View>
          <Animated.View style={$animatedImageContainer} >
            <FastImage
              source={{ uri: selectedMedia?.uri }}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ height: '80%', width: '80%', borderRadius: 2 }}
            />
            {selectedMedia && <Icon
              icon="x"
              size={20}
              onPress={() => setSelectedMedia(undefined)}
              containerStyle={$iconXContainer}
              disabled={isCommenting}
            />}
          </Animated.View>

        </Animated.View>
        <View style={$inputWrapper}>
          {tagable ? (
            <TagInput
              value={commentText}
              onChange={setCommentText}
              inputRef={inputRef}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder || "Write a comment!"}
              placeholderTextColor={colors.palette.overlay50}
              containerStyle={$commentInput}
              multiline
              // eslint-disable-next-line react-native/no-inline-styles
              suggestionsContainerStyle={{ bottom: 90 }}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ lineHeight: 20 }}
            />
          ) : (
            <TextInput
              ref={inputRef}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={commentText}
              onChangeText={setCommentText}
              placeholder={placeholder || "Write a comment!"}
              placeholderTextColor={colors.palette.overlay50}
              style={$commentInput}
              multiline
            />
          )}
        </View>
        <TouchableOpacity onPress={!isCommenting && onComment} style={$rightIconContainer}>
          {isCommenting ? (
            <ActivityIndicator animating />
          ) : (
            <Icon
              icon="send"
              size={28}
              onPress={onComment}
              disabled={commentText.length < 2 || selectedMedia}
              color={
                commentText.length > 1 || selectedMedia
                  ? colors.palette.primary100
                  : colors.palette.neutral400
              }
            />
          )}
        </TouchableOpacity>
      </Animated.View>
      <ChooseMediaModal
        onTakePhoto={onCapture}
        onChooseFromLibrary={onAddImage}
        isVisible={showChooseMediaModal}
        setVisible={setShowChooseMediaModal}
      />
    </>
  )
}

const $iconXContainer: ViewStyle = {
  height: 24,
  width: 24,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 8,
  backgroundColor: colors.background,
  position: "absolute",
  top: 5,
  right: 5,
}

const $rightIconContainer: ViewStyle = {
  width: 28,
  marginRight: 10
}

const $inputWrapper: ViewStyle = {
  width: Dimensions.get("window").width,
  backgroundColor: colors.background,
  marginRight: 10,
  marginLeft: 5,
  borderRadius: 8,
  flex: 1,
}

const $commentInput: TextStyle = {
  flex: 1,
  backgroundColor: colors.background,
  borderRadius: 10,
  paddingHorizontal: 10,
  // textAlignVertical: "center",
  // paddingVertical: spacing.extraSmall,
  // back:'red',
  textAlignVertical: "top",
  lineHeight: 20,
  color: colors.palette.neutral800,
}

const $postCommentContainer: ViewStyle = {
  flexDirection: "row",
  // paddingHorizontal: spacing.medium,
  paddingVertical: spacing.extraSmall,
  backgroundColor: colors.palette.neutral100,
  alignItems: "center",
}
