import React, { FC, useEffect, useState } from "react"
import { View, Pressable, FlatList, TextStyle, ViewStyle } from "react-native"
import { Icon, Screen, Text } from "../../components"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { VideosTabParamList, VideosTabProps } from "../../tabs"
import { colors, spacing } from "../../theme"

import { observer } from "mobx-react-lite"
import { fromNow } from "../../utils/agoFromNow"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useHooks } from "../hooks"
import { useStores } from "../../models"

export const VideoBlock = ({
  videoDetails,
  disabled,
}: {
  videoDetails: any
  disabled?: boolean
}) => {
  const navigation = useNavigation<NavigationProp<VideosTabParamList>>()

  const handleOnPress = () => {
    if (!disabled) {
      console.log(":IN", videoDetails)
      if (videoDetails?.vedioPlaylistId !== "") {
        // if (videoDetails?.vedioPlaylistId === "") {
        //   navigation.navigate("VideoDetails", { data: videoDetails })
        // } else {
        navigation.navigate("Playlist", { playlistId: videoDetails?.vedioPlaylistId })
        // }
      } else {
        navigation.navigate("VideoDetails", { data: videoDetails })
      }
    }
  }

  return (
    <Pressable style={$videoBlockContainer} onPress={handleOnPress}>
      <FastImage
        source={{
          uri: `https://img.youtube.com/vi/${videoDetails.attachmentVideoUrl.split("=")[1]}/0.jpg`,
        }}
        style={$videoPoster}
        resizeMode="cover"
      />
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
            text={videoDetails.views || 0 + " views" + " • " + fromNow(videoDetails.createdAt)}
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
  return (
    <View style={$videoRowContainer}>
      <View style={$containerCondition}>
        <View style={$conditionContainer}>
          <Text
            text={channelDetails[0]?.UserId?.first_name + `'s Channel`}
            weight="bold"
            style={$titleText}
          />
          <Text text="View All" weight="medium" style={$textViewAll} />
        </View>
        <Icon icon="caretRight" size={20} color={colors.palette.primary200} />
      </View>
      <FlatList
        ListHeaderComponent={<View style={{ paddingLeft: spacing.medium }} />}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={channelDetails}
        renderItem={({ item }) => <VideoBlock videoDetails={item} />}
      />
    </View>
  )
}

export const VideosFeed: FC<VideosTabProps<"VideosFeed">> = observer(function VideosFeed(_props) {
  const { getVideos } = useHooks()
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const {
    videos: { videos },
  } = useStores()

  const fetchVideos = async () => {
    setRefreshing(true)
    await getVideos()
    setRefreshing(false)
  }

  useEffect(() => {
    if (videos?.length === 0) {
      fetchVideos()
    }
  }, [])

  return (
    <>
      <Screen contentContainerStyle={$container}>
        <FlatList
          onRefresh={fetchVideos}
          refreshing={refreshing}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<View style={$listHeader} />}
          data={videos}
          renderItem={({ item }) => <VideoRowList channelDetails={item} />}
        />
      </Screen>
      <Pressable style={$uploadContainer}>
        <Icon icon="upload" size={20} />
        <Text text="Upload" style={$uploadText} weight="bold" />
      </Pressable>
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

const $uploadContainer: ViewStyle = {
  position: "absolute",
  backgroundColor: colors.palette.primary300,
  height: 36,
  width: 100,
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
