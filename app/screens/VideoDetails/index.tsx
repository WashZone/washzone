import React, { FC, useEffect, useState } from "react"
import {
  View,
  TextStyle,
  ViewStyle,
  Dimensions,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import { Button, Icon, IconTypes, Screen, Text } from "../../components"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { VideosTabProps } from "../../tabs"
import { colors, spacing } from "../../theme"
import { observer } from "mobx-react-lite"
import Share from "react-native-share"

import { fromNow } from "../../utils/agoFromNow"
import { formatName } from "../../utils/formatName"
import { useStores } from "../../models"
import YoutubePlayer from "react-native-youtube-iframe"
import { $loaderContainer } from "../styles"
import { useHooks } from "../hooks"
import { getIconForInteraction } from "../../utils/helpers"

// const videoDetails = {
//   title: "How to detail a car - Part 1 ",
//   view: 736,
//   createdAt: 1669106599000,
//   poster:
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO_H8dD3eHwgp6oQUJTUaaWkNJVGEhDatMHA&usqp=CAU",
//   videoUrl: "https://www.youtube.com/watch?v=awLX5qlY-Ts",
//   publisher: {
//     name: "Pete Quint",
//     avatar:
//       "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=",
//   },
//   description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
//   liked: true,
// }

const ActionButtons = observer(function TopicsFeed({ data }: { data: any }) {
  const {
    userStore: { _id },
    interaction: { getInteractionOnVideo, videos },
  } = useStores()
  const [loading, setLoading] = useState<boolean>(false)
  const { interactWithVideo, interactWithSaveOnVideo } = useHooks()
  console.log("Interaction", videos)
  const options: Array<{
    label: string
    icon: IconTypes
    onPress: () => void
    status?: boolean
  }> = [
    {
      label: "Like",
      icon: getIconForInteraction(getInteractionOnVideo(data?._id), "liked"),
      onPress: async () => {
        setLoading(true)
        await interactWithVideo(data?._id, "like")
        setLoading(false)
      },
      status: true,
    },
    {
      label: "Dislike",
      icon: getIconForInteraction(getInteractionOnVideo(data?._id), "disliked"),
      onPress: async () => {
        setLoading(true)
        await interactWithVideo(data?._id, "dislike")
        setLoading(false)
      },
      status: false,
    },
    {
      label: "Share",
      icon: "forward",
      onPress: () =>
        Share.open({
          message: `washzone://shared-video/${data?._id}`,
          title: "",
          url: "",
        })
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            err && console.log(err)
          }),
    },
    {
      label: "Save",
      icon: "save_box",
      onPress: async () => {
        setLoading(true)
        await interactWithSaveOnVideo(data?._id)
        setLoading(false)
      },
    },
  ]
  return (
    <View style={$actionButtonsContainer}>
      {options.map((option) => (
        <View style={$pressableAction} key={option.label}>
          <Icon
            icon={option.icon}
            size={22}
            onPress={() => {
              !loading && option.onPress()
            }}
          />
          <Text text={option.label} style={$actionLabel} />
        </View>
      ))}
    </View>
  )
})

const VideoDescription = ({ data }: { data: any }) => {
  return (
    <View style={$descriptionContainer}>
      <Text style={$titleText} numberOfLines={1} text={data?.videoHeading} weight="bold" />
      <Text
        text={
          (data?.view || "0") +
          ` view${data?.view > 1 ? "s" : ""}` +
          " • " +
          fromNow(new Date(data?.createdAt))
        }
        numberOfLines={1}
        style={$viewsAndCreated}
      />
      <ActionButtons data={data} />
      <View style={$publisherContainer}>
        <FastImage
          source={{ uri: data?.userId?.length ? data?.userId[0]?.picture : data?.userId?.picture }}
          style={$avatar}
        />
        <Text
          style={$publisherName}
          text={formatName(data?.userId?.length ? data?.userId[0]?.name : data?.userId?.name)}
          weight="semiBold"
        />
      </View>
      <Text text={data?.description} style={$descriptionText} />
    </View>
  )
}

const VideoContainer = ({ uri, videoId }: { uri: string; videoId: string }) => {
  const {
    api: { mutateUpdateVideoViews },
    userStore: { _id },
  } = useStores()

  const onVideoLoad = async () => {
    console.log(uri)
    const res = await mutateUpdateVideoViews({ videoId, userId: _id })
    console.log("onVideoLoad", res)
  }

  return (
    <View style={[$video, $screenHeaderContainer]}>
      <YoutubePlayer
        onReady={onVideoLoad}
        height={300}
        play={true}
        videoId={uri?.split("=")[1]}
        onError={(e) => console.log(e)}
        allowWebViewZoom={false}
      />
    </View>
  )
}

export const VideoDetails: FC<VideosTabProps<"VideoDetails">> = observer(function VideoDetails(
  props,
) {
  const { data } = props.route.params
  const [videoDetails, setVideoDetails] = useState<any>(data)
  const [loading, setLoading] = useState<boolean>(typeof data === "string")
  const {
    api: { mutateGetUploadVideoByVideoId },
  } = useStores()

  const handleDataType = async () => {
    if (typeof data === "string") {
      if (typeof data === "string") {
        setLoading(true)
        const res = await mutateGetUploadVideoByVideoId({ videoId: data })
        console.log("mutateGetUploadVideoByVideoId", JSON.stringify(res))
        setVideoDetails(
          res.getUploadVideoByVideoId?.data?.length === 1 && res.getUploadVideoByVideoId?.data[0],
        )
        setLoading(false)
      }
    } else {
      setVideoDetails(data)
    }
  }

  useEffect(() => {
    handleDataType()
  }, [data])

  const shareVideo = () => {
    Share.open({
      message: "",
      title: `washzone://shared-video/${data?._id}`,
      url: `washzone://shared-video/${data?._id}`,
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        err && console.log(err)
      })
  }

  if (loading) {
    return (
      <Screen
        preset="fixed"
        backgroundColor={colors.palette.neutral100}
        contentContainerStyle={$loaderContainer}
      >
        <ActivityIndicator animating color={colors.palette.primary100} />
      </Screen>
    )
  }

  return (
    <Screen
      preset="fixed"
      backgroundColor={colors.palette.neutral100}
      contentContainerStyle={$flex1}
    >
      <VideoContainer videoId={videoDetails?._id} uri={videoDetails?.attachmentVideoUrl} />
      <ScrollView style={$detailsContainer}>
        <VideoDescription data={videoDetails} />
      </ScrollView>
      <Button
        onPress={shareVideo}
        style={$shareContainer}
        text="Share"
        preset="reversed"
        textStyle={$buttonTitle}
      />
    </Screen>
  )
})

export default VideoDetails

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
  backgroundColor: colors.palette.neutral100,
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
  backgroundColor: colors.palette.neutral100,
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
