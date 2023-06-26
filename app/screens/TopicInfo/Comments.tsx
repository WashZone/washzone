import React, { useState } from "react"
import { Dimensions, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { colors, spacing } from "../../theme"
import { ParsedTextComp, Text } from "../../components"
import { fromNow } from "../../utils/agoFromNow"
import { formatName } from "../../utils/formatName"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"
import LinearGradient from "react-native-linear-gradient"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { HomeTabParamList } from "../../tabs"
const windowWidth = Dimensions.get("window").width

export const CommentComponent = ({ comment }: { comment: any }) => {
  const [loaded, setLoaded] = useState(false)
  const navigationHome = useNavigation<NavigationProp<HomeTabParamList>>()
  const [attachmentDimensions, setAttachmentDimensions] = useState({
    height: Dimensions.get("window").width * 0.6,
    width: Dimensions.get("window").width,
  })
  return (
    <>
      <View style={$commentContainer}>
        <TouchableOpacity
          onPress={() => navigationHome.navigate("Profile", { user: comment?.users?._id })}
        >
          <FastImage
            style={$profileImage}
            source={{
              uri: comment?.users?.picture,
            }}
          />
        </TouchableOpacity>
        <View 
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ justifyContent: "space-around" }}>
          <View style={$nameView}>
            <Text text={formatName(comment?.users?.name)} style={$publisherName} weight="medium" />
            <Text text={fromNow(comment?.createdAt)} style={$fromNow} />
          </View>
          <ParsedTextComp text={comment?.comment} style={$commentText} />
        </View>
      </View>
      {comment?.acttachmentUrl && (
        <ShimmerPlaceholder
          visible={loaded}
          shimmerStyle={{
            height: Dimensions.get("window").width * 0.66,
            width: Dimensions.get("window").width,
          }}
          LinearGradient={LinearGradient}
        >
          <FastImage
            style={{ ...attachmentDimensions }}
            onLoad={(res) => {
              setAttachmentDimensions({
                height: (windowWidth * res.nativeEvent.height) / res.nativeEvent.width,
                width: windowWidth,
              })
            }}
            onLoadEnd={() => setLoaded(true)}
            source={{ uri: comment?.acttachmentUrl }}
          />
        </ShimmerPlaceholder>
      )}
    </>
  )
}

const $nameView: ViewStyle = { flexDirection: "row" }

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
  lineHeight: 24,
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
  marginRight: 10,
}
