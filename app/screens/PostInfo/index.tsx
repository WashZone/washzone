import React, { FC } from "react"
import { ScrollView, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { Icon, Screen } from "../../components"
import { colors, spacing } from "../../theme"
import { HomeTabProps } from "../../tabs/Home"
import { PostComponent } from "../Feed/partials"
import { Capture } from "../../utils/device/MediaPicker"

export const PostInfo: FC<HomeTabProps<"PostInfo">> = function PostInfo(props) {
  console.log(props)
  const { post } = props.route.params
  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <ScrollView style={$contentContainer}>
        <PostComponent post={post} />
      </ScrollView>
      <View style={$postCommentContainer}>
        <Icon icon="camera" size={28} onPress={Capture} />
        <TextInput
          placeholder="Write a comment!"
          placeholderTextColor={colors.palette.overlay50}
          style={$commentInput}
        />
      </View>
    </Screen>
  )
}

const $commentInput: TextStyle = {
  flex: 1,
  height: 34,
  backgroundColor: colors.background,
  marginLeft: 10,
  borderRadius: 24,
  paddingHorizontal: 10,
}

const $container: ViewStyle = {
  flex: 1,
}

const $contentContainer: ViewStyle = {
  flex: 1,
}

const $postCommentContainer: ViewStyle = {
  height: 46,
  flexDirection: "row",
  paddingHorizontal: spacing.medium,
  backgroundColor: colors.palette.neutral100,
  alignItems: "center",
}
