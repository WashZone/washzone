import React, { FC, useEffect, useState } from "react"
import { View, TextStyle, ViewStyle, Pressable, FlatList } from "react-native"
import { Button, Icon, Screen, Text } from "../../components"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { VideosTabParamList, VideosTabProps } from "../../tabs"
import { colors, spacing } from "../../theme"

import { observer } from "mobx-react-lite"
import { fromNow } from "../../utils/agoFromNow"
import { formatName } from "../../utils/formatName"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { $flex1 } from "../styles"
import { useHooks } from "../hooks"
import Loading from "../../components/Loading"

export const VideoBlockFullWidth = ({ videoDetails, index }) => {
  const navigation = useNavigation<NavigationProp<VideosTabParamList>>()

  return (
    <Pressable
      onPress={() => navigation.navigate("VideoDetails", { data: videoDetails?._id.toString() })}
      style={$backWhite}
    >
      <View style={$videoBlockContainer}>
        <FastImage
          source={{ uri: videoDetails?.thumbnailUrl }}
          style={$videoPoster}
          resizeMode="cover"
        />
        <View style={$videoDetailsContent}>
          <Text
            text={videoDetails?.videoHeading}
            numberOfLines={1}
            style={$videoTitle}
            weight="bold"
          />
          <Text
            text={videoDetails.view + " views" + " • " + fromNow(videoDetails?.createdAt)}
            numberOfLines={1}
            style={$viewsAndCreated}
          />
        </View>
      </View>
      <View
        style={[
          $seperator,
          {
            backgroundColor: colors.separator,
          },
        ]}
      />
    </Pressable>
  )
}

const PlaylistDescription = () => {
  return (
    <View style={$playlistDescriptionContainer}>
      {/* <Button
        style={$followButton}
        LeftAccessory={() => <Icon icon="add_vector" size={20} color={colors.palette.neutral100} />}
        text="Follow"
        textStyle={$followText}
      /> */}
    </View>
  )
}

const HeaderComponent = ({ playlistData }: { playlistData: any }) => {
  return (
    <View style={$screenHeaderContainer}>
      <Text
        text={playlistData?.playListName?.toUpperCase()}
        preset="heading"
        style={$heading}
        weight="bold"
      />
      <FastImage style={$avatar} source={{ uri: playlistData?.userId?.picture }} />
      <Text
        text={formatName(playlistData?.userId?.name)}
        style={$publisherName}
        weight="semiBold"
      />
    </View>
  )
}

export const Playlist: FC<VideosTabProps<"Playlist">> = observer(function Playlist(props) {
  const playlistId = props.route.params?.playlistId
  const [playlistData, setPlaylistData] = useState<any>()
  const [loading, setLoading] = useState(true)
  const { getPlaylist } = useHooks()

  const syncPlaylistData = async () => {
    const res = await getPlaylist(playlistId)
    setPlaylistData(res)
    setLoading(false)
  }

  useEffect(() => {
    syncPlaylistData()
  }, [])

  if (loading) return <Loading />

  return (
    <Screen preset="fixed" contentContainerStyle={$flex1}>
      <HeaderComponent playlistData={playlistData} />
      <FlatList
        style={$flex1}
        // ListHeaderComponent={<PlaylistDescription />}
        data={playlistData?.VideoDetail}
        renderItem={({ item, index }) => (
          <VideoBlockFullWidth key={index} index={index} videoDetails={item} />
        )}
      />
    </Screen>
  )
})

export default Playlist

const $backWhite: ViewStyle = { backgroundColor: colors.palette.neutral100 }

const $followButton: ViewStyle = {
  width: 120,
  height: 40,
  backgroundColor: colors.palette.primary300,
  borderRadius: 20,
  marginLeft: spacing.medium,
  justifyContent: "space-around",
  paddingHorizontal: spacing.large,
  borderWidth: 0,
}

const $descriptionText: TextStyle = {
  flex: 1,
  textAlign: "justify",
  fontSize: 14,
  lineHeight: 20,
}

const $playlistDescriptionContainer: ViewStyle = {
  flexDirection: "row",
  padding: spacing.medium,
  alignItems: "center",
  ...$backWhite,
}

const $avatar: ImageStyle = {
  height: 60,
  width: 60,
  borderRadius: 30,
  alignSelf: "center",
  marginTop: 20,
}

const $heading: TextStyle = {
  color: colors.palette.neutral100,
  alignSelf: "center",
  marginTop: 30,
  fontSize: 32,
  letterSpacing: -0.5,
}

const $screenHeaderContainer: ViewStyle = {
  height: 200,
  backgroundColor: colors.palette.primary400,
}

const $videoDetailsContent: ViewStyle = {
  paddingHorizontal: spacing.medium,
  flex: 1,
}

const $videoBlockContainer: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingTop: spacing.medium,
  flexDirection: "row",
}

const $seperator: ViewStyle = {
  marginHorizontal: spacing.medium,
  marginTop: spacing.medium,
  height: 1,
}

const $followText: TextStyle = {
  fontSize: 13,
  color: colors.palette.neutral100,
  lineHeight: 20,
}

const videoPosterWidth = 150

const $videoPoster: ImageStyle = {
  height: (videoPosterWidth * 9) / 16,
  width: videoPosterWidth,
  borderRadius: 5,
}

const $videoTitle: TextStyle = {
  fontSize: 16,
  lineHeight: 22,
}

const $publisherName: TextStyle = {
  fontSize: 14,
  lineHeight: 28,
  color: colors.palette.neutral100,
  alignSelf: "center",
}

const $viewsAndCreated: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral500,
  lineHeight: 22,
}
