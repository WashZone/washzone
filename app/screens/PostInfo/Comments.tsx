import React from "react"
import { Dimensions, TextStyle, View, ViewStyle } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { colors, spacing } from "../../theme"
import { Text } from "../../components"
import { fromNow } from "../../utils/agoFromNow"
import { formatName } from "../../utils/formatName"

export const CommentComponent = ({ comment }: { comment: any }) => {
    console.log('CommentComponent', comment)
  return (
    <View style={$commentContainer}>
      <FastImage
        style={$profileImage}
        source={{
          uri: comment?.users?.picture,
        }}
      />
      <View>
        <View style={$nameView}>
          <Text text={formatName(comment?.users?.name)} style={$publisherName} weight="medium" />
          <Text text={fromNow(comment?.createdAt)} style={$fromNow} />
        </View>
        <Text text={comment?.comment} style={$commentText} />
      </View>
    </View>
  )
}

const $nameView : ViewStyle={flexDirection: "row", marginBottom: 5 }

const $fromNow: TextStyle = {
  fontSize: 10,
  lineHeight: 16,
  opacity: 0.5,
}
const $commentText: TextStyle = {
  width: Dimensions.get("screen").width - 100,
  fontSize: 12,
  lineHeight: 17,
  textAlign: "justify",
}

const $publisherName: TextStyle = {
  fontSize: 16,
  lineHeight: 16,
  marginRight: 10,
}

const $commentContainer: ViewStyle = {
  paddingHorizontal: spacing.homeScreen,
  paddingVertical: spacing.medium,
  width: "100%",
  flexDirection: "row",
  alignItems: "flex-start",
  borderBottomColor: colors.palette.neutral300,
  borderBottomWidth: 0.5,
}

const $profileImage: ImageStyle = {
  height: 46,
  width: 46,
  borderRadius: 23,
  marginRight: 20,
}
