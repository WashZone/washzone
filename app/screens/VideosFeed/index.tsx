import React, { FC, useEffect, useState } from "react"
import { View, Pressable, FlatList, TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import { CustomFlatlist, Icon, Screen, Text } from "../../components"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { VideosTabParamList, VideosTabProps } from "../../tabs"
import { colors, spacing } from "../../theme"

import { observer } from "mobx-react-lite"
import { fromNow } from "../../utils/agoFromNow"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useHooks } from "../hooks"
import { useStores } from "../../models"
import { AppStackParamList } from "../../navigators"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"
import LinearGradient from "react-native-linear-gradient"
import { BROKEN_IMAGE } from "../../utils"
import { $contentCenter } from "../styles"

export const VideoBlock = ({
  videoDetails,
  disabled,
}: {
  videoDetails: any
  disabled?: boolean
}) => {
  const [loaded, setLoaded] = useState(false)
  const navigation = useNavigation<NavigationProp<VideosTabParamList>>()

  const handleOnPress = () => {
    if (!disabled) {
      if (videoDetails?.vedioPlaylistId && videoDetails?.vedioPlaylistId !== "") {
        navigation.navigate("Playlist", { playlistId: videoDetails?.vedioPlaylistId })
      } else {
        navigation.navigate("VideoDetails", { data: videoDetails })
      }
    }
  }

  return (
    <Pressable style={$videoBlockContainer} onPress={handleOnPress}>
      <ShimmerPlaceholder
        shimmerStyle={$videoPoster}
        visible={loaded}
        LinearGradient={LinearGradient}
      >
        <FastImage
          defaultSource={BROKEN_IMAGE}
          source={{
            uri: `https://img.youtube.com/vi/${videoDetails?.attachmentVideoUrl?.split("=")[1]
              }/0.jpg`,
          }}
          style={$videoPoster}
          resizeMode="cover"
          onLoadEnd={() => setLoaded(true)}
        />
      </ShimmerPlaceholder>
      <View style={$videoDetailsContent}>
        <View style={$flex1}>
          <Text
            text={videoDetails?.videoHeading}
            numberOfLines={1}
            style={$videoTitle}
            weight="bold"
          />
          <Text
            text={videoDetails.UserId?.name}
            numberOfLines={1}
            style={$publisherName}
            weight="medium"
          />
          <Text
            text={
              (videoDetails?.view || 0) +
              ` view${videoDetails?.view > 1 ? "s" : ""}` +
              " • " +
              fromNow(videoDetails.createdAt)
            }
            numberOfLines={1}
            style={$viewsAndCreated}
          />
        </View>
        <Icon icon={"more"} size={20} />
      </View>
    </Pressable>
  )
}

export const VideoRowList = ({ channelDetails }) => {
  const navigation = useNavigation<NavigationProp<VideosTabParamList>>()
  const {
    userStore: { _id },
  } = useStores()
  return (
    <View style={$videoRowContainer}>
      <View style={$containerCondition}>
        <TouchableOpacity
          style={$conditionContainer}
          onPress={() =>
            navigation.navigate("ViewChannel", { publisher: channelDetails[0]?.userId })
          }
        >
          {!channelDetails?.isEmpty && <Text
            text={
              channelDetails?.isEmpty
                ? "Your Channel"
                : channelDetails[0]?.userId?._id === _id
                  ? "Your Channel"
                  : channelDetails[0]?.userId?.first_name + `'s` + ` Channel`
            }
            weight="bold"
            style={$titleText}
          />}
          {channelDetails?.length > 0 && (
            <Text text="View All" weight="medium" style={$textViewAll} />
          )}
        </TouchableOpacity>
        {channelDetails?.length > 0&& (
          <Icon icon="caretRight" size={20} color={colors.palette.primary200} />
        )}
      </View>
      {channelDetails?.length > 0 ? (
        <FlatList
          ListHeaderComponent={<View style={{ paddingLeft: spacing.medium }} />}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={channelDetails}
          renderItem={({ item }) => <VideoBlock videoDetails={item} />}
        />
      ) : (
        <View style={$contentCenter}>
          <Pressable
            style={$uploadContainerIsUserEmpty}
            onPress={() => navigation.navigate("UploadVideo")}
          >
            <Icon icon="upload" size={28} />
            <Text text="Post a Video" color={colors.palette.neutral100} size="lg" weight="bold" />
          </Pressable>
          <Text
            text={`You have not posted a video.\nShare videos with the WashZone community.`}
            style={{ marginTop: spacing.medium, marginHorizontal: spacing.medium, textAlign: 'center' }}
            color={colors.palette.neutral600}
            weight="medium"
          />
        </View>
      )}
    </View>
  )
}
// https://www.youtube.com/watch?v=7gMtv_Ylc78
export const VideosFeed: FC<VideosTabProps<"VideosFeed">> = observer(function VideosFeed(_props) {
  const { refreshVideos } = useHooks()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const {
    videos: { videos },
  } = useStores()

  const fetchVideos = async () => {
    await refreshVideos()
  }

  useEffect(() => {
    if (videos?.length === 0) {
      fetchVideos()
    }
  }, [])

  return (
    <>
      <Screen contentContainerStyle={$container}>
        <CustomFlatlist
          customRefresh={fetchVideos}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={!videos[0]?.isEmpty && <View style={$listHeader} />}
          data={videos}
          renderItem={({ item }) => <VideoRowList channelDetails={item} />}
        />
      </Screen>
      {!videos[0]?.isEmpty && <Pressable style={$uploadContainer} onPress={() => navigation.navigate("UploadVideo")}>
        <Icon icon="upload" size={20} />
        <Text text="Post a Video" style={$uploadText} weight="bold" />
      </Pressable>}
    </>
  )
})

export default VideosFeed

const $flex1: ViewStyle = { flex: 1 }

const $listHeader: ViewStyle = { height: 30 }

const $videoDetailsContent: ViewStyle = {
  padding: spacing.homeScreen,
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
}

const $containerCondition: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.medium,
  paddingBottom: spacing.medium + spacing.micro,
  alignItems: "center",
  paddingHorizontal: spacing.medium,
}

const $videoBlockContainer: ViewStyle = {
  width: 240,
  borderRadius: 10,
  borderColor: colors.palette.overlay20,
  borderWidth: 0.5,
  marginRight: spacing.medium,
  backgroundColor: colors.palette.neutral200,
}

const $conditionContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  flex: 1,
}

const $uploadContainerIsUserEmpty: ViewStyle = {
  backgroundColor: colors.palette.primary300,
  height: 50,
  width: 200,
  borderRadius: 10,
  flexDirection: "row",
  alignItems: "center",
  padding: spacing.medium / 2,
  justifyContent: "space-around",
}

const $uploadContainer: ViewStyle = {
  position: "absolute",
  backgroundColor: colors.palette.primary300,
  height: 36,
  width: 140,
  right: spacing.medium,
  top: spacing.medium,
  borderRadius: 10,
  flexDirection: "row",
  alignItems: "center",
  padding: spacing.medium / 2,
  justifyContent: "space-around",
}

const $container: ViewStyle = { flex: 1 }

const $videoRowContainer: ViewStyle = {
  marginVertical: spacing.medium,
}

const $uploadText: TextStyle = {
  fontSize: 13,
  color: colors.palette.neutral100,
  lineHeight: 20,
}

const $textViewAll: TextStyle = {
  fontSize: 14,
  color: colors.palette.primary300,
}

const $videoPoster: ImageStyle = {
  height: (238 * 9) / 16,
  width: 238,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
}

const $titleText: TextStyle = {
  fontSize: 18,
}

const $videoTitle: TextStyle = {
  fontSize: 16,
  lineHeight: 22,
}

const $publisherName: TextStyle = {
  fontSize: 14,
  lineHeight: 22,
}

const $viewsAndCreated: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral500,
  lineHeight: 22,
}
