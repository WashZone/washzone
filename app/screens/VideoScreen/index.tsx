import React, { FC, useRef, useState } from "react"
import { View, TextStyle, ViewStyle, Dimensions, Alert, Pressable, ScrollView } from "react-native"
import { Button, Icon, IconTypes, Screen, Text } from "../../components"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { VideosTabProps } from "../../tabs"
import Video from "react-native-video"
import { colors, spacing } from "../../theme"

import { observer } from "mobx-react-lite"
import { fromNow } from "../../utils/agoFromNow"
import { formatName } from "../../utils/formatName"

const videoDetails = {
  title: "How to detail a car - Part 1 ",
  view: 736,
  createdAt: 1669106599000,
  poster:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO_H8dD3eHwgp6oQUJTUaaWkNJVGEhDatMHA&usqp=CAU",
  videoUrl: "https://youtu.be/awLX5qlY-Ts",
  publisher: {
    name: "Pete Quint",
    avatar:
      "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=",
  },
  description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  liked: true,
}

const options: Array<{
  label: string
  icon: IconTypes
  onPress: () => void
  status?: boolean
  iconFill?: IconTypes
}> = [
  {
    label: "Like",
    icon: "like",
    onPress: () => console.log("API RUNING"),
    status: true,
    iconFill: "likefill",
  },
  {
    label: "Dislike",
    icon: "dislike",
    onPress: () => console.log("API RUNING"),
    status: false,
    iconFill: "dislikefill",
  },
  {
    label: "Share",
    icon: 'forward',
    onPress: () => Alert.alert("Shared"),
  },
  {
    label: "Save",
    icon: "save_box",
    onPress: () => Alert.alert("Saved"),
  },
]

const ActionButtons = () => {
  const [liked, setLiked] = useState<boolean>(videoDetails.liked)
  const [disliked, setDisliked] = useState<boolean>(videoDetails.liked)
  return (
    <View style={$actionButtonsContainer}>
      {options.map((option) => (
        <Pressable
          onPress={() => {
            option.onPress()
            option.icon === "like" ? setLiked(!liked) : setDisliked(!disliked)
          }}
          style={$pressableAction}
          key={option.label}
        >
          <Icon
            icon={
              option.icon!=='forward'&&option.icon!=='save_box'? (liked && option.icon === "like") || (disliked && option.icon === "dislike")
                ? option.icon
                : option.iconFill : option.icon
            }
            size={22}
          />
          <Text text={option.label} style={$actionLabel} />
        </Pressable>
      ))}
    </View>
  )
}

const VideoDescription = () => {
  return (
    <View style={$descriptionContainer}>
      <Text style={$titleText} numberOfLines={1} text={videoDetails.title} weight="bold" />
      <Text
        text={videoDetails.view + " views" + " • " + fromNow(new Date(videoDetails.createdAt))}
        numberOfLines={1}
        style={$viewsAndCreated}
      />
      <ActionButtons />
      <View style={$publisherContainer}>
        <FastImage source={{ uri: videoDetails.publisher.avatar }} style={$avatar} />
        <Text
          style={$publisherName}
          text={formatName(videoDetails.publisher.name)}
          weight="semiBold"
        />
      </View>
      <Text text={videoDetails.description} style={$descriptionText} />
    </View>
  )
}

const VideoContainer = () => {
  const videoRef = useRef<Video>()
  return (
    <View style={$screenHeaderContainer}>
      <Video
        source={{
          uri: "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/cq8l59W/blue-car-washed-by-hand-using-a-water-jet-wash-in-a-shiny-day_s7w_zi9ua__40307ebe7e5c30eec07c1ea609790227__P360.mp4",
        }}
        ref={(ref: { current: any }) => (videoRef.current = ref)}
        style={$video}
        paused={false}
        controls
      />
    </View>
  )
}

export const VideoScreen: FC<VideosTabProps<"VideoScreen">> = observer(function VideoScreen(
  _props,
) {
  return (
    <Screen
      preset="fixed"
      backgroundColor={colors.palette.neutral100}
      contentContainerStyle={$flex1}
    >
      <VideoContainer />
      <ScrollView style={$detailsContainer}>
        <VideoDescription />
      </ScrollView>
      <Button style={$shareContainer} text="Share" preset="reversed" textStyle={$buttonTitle} />
    </Screen>
  )
})

export default VideoScreen

const $buttonTitle: TextStyle = {
  fontSize: 18,
  fontWeight: "700",
  letterSpacing: 1.5,
}

const $shareContainer: ViewStyle = {
  width: Dimensions.get("screen").width - spacing.medium * 2,
  height: 50,
  borderRadius: 24,
  alignSelf: "center",
  bottom: spacing.medium,
  position: "absolute",
  borderWidth: 0,
  backgroundColor: colors.palette.primary300,
}

const $flex1: ViewStyle = { flex: 1 }

const screenWidth = Dimensions.get("screen").width

const $actionLabel: TextStyle = {
  fontSize: 14,
  color: colors.palette.neutral700,
}

const $pressableAction: ViewStyle = {
  marginRight: spacing.medium,
  width: 50,
  alignItems: "center",
}

const $actionButtonsContainer: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.medium,
}

const $detailsContainer: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingBottom: spacing.massive,
  flex: 1,
}

const $video: ViewStyle = {
  height: (screenWidth * 9) / 16,
  width: screenWidth,
}

const $titleText: TextStyle = {
  fontSize: 18,
}
const $descriptionText: TextStyle = {
  fontSize: 14,
  textAlign: "justify",
  lineHeight: 20,
}

const $descriptionContainer: ViewStyle = {
  paddingVertical: spacing.medium,
  paddingBottom: 100, // cover the share button
}

const $avatar: ImageStyle = {
  height: 60,
  width: 60,
  borderRadius: 30,
}

const $publisherContainer: ViewStyle = {
  borderTopWidth: 0.5,
  borderBottomWidth: 0.5,
  borderColor: colors.separator,
  paddingVertical: spacing.small,
  marginVertical: spacing.medium,
  flexDirection: "row",
}

const $screenHeaderContainer: ViewStyle = {
  width: screenWidth,
  height: (screenWidth * 9) / 16,
  backgroundColor: colors.palette.neutral900,
}

const $publisherName: TextStyle = {
  fontSize: 14,
  lineHeight: 28,
  marginLeft: spacing.medium,
}

const $viewsAndCreated: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral500,
  lineHeight: 24,
}
