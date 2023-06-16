import React, { FC, useEffect, useMemo, useState } from "react"
import {
  View,
  TextStyle,
  ViewStyle,
  Dimensions,
  ScrollView,
  Share,
  TouchableOpacity,
} from "react-native"
import { Button, Icon, IconTypes, LikesModal, Screen, Text } from "../../components"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { HomeTabParamList, VideosTabProps } from "../../tabs"
import { colors, spacing } from "../../theme"
import { observer } from "mobx-react-lite"

import { fromNow } from "../../utils/agoFromNow"
import { formatName } from "../../utils/formatName"
import { useStores } from "../../models"
import YoutubePlayer from "react-native-youtube-iframe"
import { useHooks } from "../hooks"
import { getIconForInteraction } from "../../utils/helpers"
import Loading from "../../components/Loading"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import * as Haptics from "expo-haptics"
import { messageMetadataType } from "../../utils"

const ActionButtons = observer(function TopicsFeed({
  data,
  setLikesModalVisible,
}: {
  data: any
  setLikesModalVisible: (b: boolean) => void
}) {
  const {
    interaction: { isVideoSaved },
    share: { share },
  } = useStores()
  const [loading, setLoading] = useState<boolean>(false)

  const [dynamicData, setDynamicData] = useState({
    interaction: data?.interaction,
    dislikeviews: data?.dislikeviews,
    likeviews: data?.likeviews,
  })
  const { interactWithVideo, interactWithSaveOnVideo } = useHooks()

  console.log("VIDEO DATA", data)
  const options: Array<{
    label: string
    icon: IconTypes
    onPress: () => void
    status?: boolean
    count?: any
    onTextPress?: () => void
  }> = useMemo(
    () => [
      {
        label: "Like",
        icon: getIconForInteraction(dynamicData?.interaction, "liked"),
        onPress: async () => {
          setLoading(true)
          const res = await interactWithVideo({
            videoId: data?._id,
            button: "like",
            previousData: dynamicData,
          })
          setDynamicData(res)
          setLoading(false)
        },
        status: true,
        count: dynamicData?.likeviews,
        onTextPress: () => dynamicData?.likeviews && setLikesModalVisible(true),
      },
      {
        label: "Dislike",
        icon: getIconForInteraction(dynamicData?.interaction, "disliked"),
        onPress: async () => {
          setLoading(true)
          const res = await interactWithVideo({
            videoId: data?._id,
            button: "dislike",
            previousData: dynamicData,
          })
          setDynamicData(res)
          setLoading(false)
        },
        count: dynamicData?.dislikeviews,
        status: false,
      },
      {
        label: "Share",
        icon: "forward",
        onPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          share({
            url: `washzone://shared-video/${data?._id}`,
            title: "",
            message: "",
            type: messageMetadataType.sharedVideo,
          })
        },
      },
      {
        label: isVideoSaved(data?._id) ? "Saved" : "Save",
        icon: "save_box",
        onPress: async () => {
          setLoading(true)
          await interactWithSaveOnVideo(data?._id)
          setLoading(true)
        },
      },
    ],
    [isVideoSaved(data?._id), dynamicData],
  )

  return (
    <View style={$actionButtonsContainer}>
      {options.map((option) => (
        // eslint-disable-next-line react-native/no-inline-styles
        <View
          style={[$pressableAction, option.count !== undefined && { width: 80 }]}
          key={option.label}
        >
          <Icon
            disabled={loading}
            icon={option.icon}
            size={22}
            onPress={() => {
              !loading && option.onPress()
            }}
          />
          <Text text={option.label} style={$actionLabel} />
          <Text text={option.count || ""} style={$actionLabel} onPress={option?.onTextPress} />
        </View>
      ))}
    </View>
  )
})

const VideoDescription = ({ data }: { data: any }) => {
  const [isLikesModalVisible, setLikesModalVisible] = useState(false)
  const navigation = useNavigation<NavigationProp<HomeTabParamList>>()
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
      <ActionButtons data={data} setLikesModalVisible={setLikesModalVisible} />
      <TouchableOpacity
        style={$publisherContainer}
        onPress={() => navigation.navigate("Profile", { user: data?.userId[0] || data?.userId })}
      >
        <FastImage
          source={{ uri: data?.userId?.length ? data?.userId[0]?.picture : data?.userId?.picture }}
          style={$avatar}
        />
        <Text
          style={$publisherName}
          text={formatName(data?.userId?.length ? data?.userId[0]?.name : data?.userId?.name)}
          weight="semiBold"
        />
      </TouchableOpacity>
      <Text text={data?.description} style={$descriptionText} />
      <LikesModal
        module="video"
        moduleId={data?._id}
        isVisible={isLikesModalVisible}
        setVisible={setLikesModalVisible}
      />
    </View>
  )
}

const VideoContainer = ({ uri, videoId }: { uri: string; videoId: string }) => {
  const {
    api: { mutateUpdateVideoViews },
    userStore: { _id },
  } = useStores()

  const onVideoLoad = async () => {
    await mutateUpdateVideoViews({ videoId, userId: _id })
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
    userStore: { _id },
    api: { mutateGetVideoByVideoId },
    share: { share },
  } = useStores()
  console.log("VIDEO VIDEO", data)

  const handleDataType = async () => {
    if (typeof data === "string") {
      setLoading(true)
      console.log("DATAID", data)
      const res = await mutateGetVideoByVideoId({ videoId: data, callerId: _id })
      console.log("VIDEO DATA FROM API : ", res)

      setVideoDetails(res.getVideoByVideoId?.data?.length === 1 && res.getVideoByVideoId?.data[0])
      setLoading(false)
    } else {
      setVideoDetails(data)
    }
  }

  useEffect(() => {
    handleDataType()
  }, [data])

  const shareVideo = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    share({
      url: `washzone://shared-video/${videoDetails?._id}`,
      type: messageMetadataType.sharedVideo,
      title: "",
      message: "",
    })
  }

  if (loading) {
    return <Loading />
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
