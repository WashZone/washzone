import React, { useState, useEffect, useRef, FC } from "react"
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
import { ChooseMediaModal, } from "."
import { TagInput } from "./TagInput"
import { Host } from "react-native-portalize"
// import { getTaggedIds } from "../utils/helpers"

interface CommentInputProps {
  createComment: (text: string, selectedMedia: any) => Promise<void>
  placeholder?: string
  bottomSafe?: boolean
}

export const CommentInput = ({ createComment, bottomSafe, placeholder }: CommentInputProps) => {
  const [commentText, setCommentText] = useState("")
  const [selectedMedia, setSelectedMedia] = useState(undefined)
  const [isCommenting, setIsCommenting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [showChooseMediaModal, setShowChooseMediaModal] = useState(false)
  const focus = useSharedValue(0)
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
  console.log("commentText : ", commentText)
  const onAddImage = async () => {
    const res = await MediaPicker()
    res && setSelectedMedia(res)
  }

  const onCapture = async () => {
    const res = await Capture()
    console.log("RES:onCapture", res)
    res && setSelectedMedia(res)
  }

  const $animatedContainer = useAnimatedStyle(() => {
    return {
      marginBottom: interpolate(focus.value, [0, 1], [bottomSafe ? safeAreInsets.bottom : 0, 0]),
      height: interpolate(focus.value, [0, 1], [54, 100]),
    }
  })

  const $animatedMediaContainer = useAnimatedStyle(() => {
    return {
      bottom: interpolate(focus.value, [0, 1], [bottomSafe ? 54 + safeAreInsets.bottom : 54, 100]),
      position: "absolute",
    }
  })

  useEffect(() => {
    console.log("FOCUSING", isFocused)
    if (isFocused) focus.value = withTiming(1, { duration: 200 })
    else {
      focus.value = withTiming(0, { duration: 200 })
    }
  }, [isFocused])

  return (
    <>
      {selectedMedia && (
        <Animated.View style={$animatedMediaContainer}>
          <FastImage
            source={{ uri: selectedMedia?.uri }}
            style={{ height: 100, width: 100, borderRadius: 2 }}
          />
          <Icon
            icon="x"
            size={20}
            onPress={() => setSelectedMedia(undefined)}
            containerStyle={$iconXContainer}
            disabled={isCommenting}
          />
        </Animated.View>
      )}
      <Animated.View style={[$postCommentContainer, $animatedContainer]}>
        <Icon
          icon="attachment"
          containerStyle={{ marginRight: spacing.extraSmall }}
          disabled={isCommenting}
          size={24}
          onPress={() => setShowChooseMediaModal(true)}
        />

        <View style={$inputWrapper}>
          {/* <TextInput
            ref={inputRef}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={commentText}
            onChangeText={setCommentText}
            placeholder={placeholder || "Write a comment!"}
            placeholderTextColor={colors.palette.overlay50}
            style={$commentInput}
            multiline
          /> */}
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
            suggestionsContainerStyle={{ bottom: 90 }}
          />
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
  top: -5,
  left: 85,
}

const $rightIconContainer: ViewStyle = {
  width: 28,
}

const $inputWrapper: ViewStyle = {
  width: Dimensions.get("window").width - 115,
  backgroundColor: colors.background,
  marginHorizontal: 10,
  borderRadius: 8,
}

const $commentInput: TextStyle = {
  flex: 1,
  backgroundColor: colors.background,
  borderRadius: 10,
  paddingHorizontal: 10,
  // textAlignVertical: "center",
  paddingVertical: spacing.extraSmall,
  // back:'red',
  textAlignVertical: "top",
  color: colors.palette.neutral800,
}

const $postCommentContainer: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.extraSmall,
  backgroundColor: colors.palette.neutral100,
  alignItems: "center",
}
