import React, { FC, useEffect, useState } from "react"
import { View, TextStyle, ViewStyle, Pressable, FlatList, NativeSyntheticEvent, NativeScrollEvent, Dimensions, ImageBackground } from "react-native"
import { Screen, Text } from "../../components"
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
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated"

export const VideoBlockFullWidth = ({ videoDetails }) => {

  const navigation = useNavigation<NavigationProp<VideosTabParamList>>()
  return (
    <Pressable
      onPress={() => navigation.navigate("VideoDetails", { data: videoDetails?._id })}
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



const HeaderComponent = ({ playlistData }: { playlistData: any }) => {
  return (
    <ImageBackground source={{ uri: playlistData?.playListbanner }} blurRadius={10} resizeMode='cover' style={$screenHeaderContainer}>
      <FastImage style={$avatar} source={{ uri: playlistData?.playListthumbnail }} />
      <Text
        text={playlistData?.playListName?.toUpperCase()}
        preset="heading"
        style={$heading}
        weight="bold"
      />
    </ImageBackground>
  )
}

export const Playlist: FC<VideosTabProps<"Playlist">> = observer(function Playlist(props) {
  const playlistId = props.route.params?.playlistId
  const [playlistData, setPlaylistData] = useState<any>()
  const [loading, setLoading] = useState(true)
  const { getPlaylist } = useHooks()
  const topOffset = useSharedValue(0)

  const syncPlaylistData = async () => {
    const res = await getPlaylist(playlistId)
    console.log("PLAYLISYT DATA", res)
    setPlaylistData(res)
    setLoading(false)
  }

  useEffect(() => {
    syncPlaylistData()
  }, [])

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    topOffset.value = - event.nativeEvent.contentOffset.y
  }

  const $animatedBg = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      height: topOffset.value + 120,
      backgroundColor: colors.palette.primary400,

    }
  })

  if (loading) return <Loading />

  return (
    <Screen preset="fixed" contentContainerStyle={$flex1}>
      <Animated.View style={[{ width: Dimensions.get('screen').width }, $animatedBg]} >

      </Animated.View>
      <FlatList
        onScroll={onScroll}
        style={$flex1}
        ListHeaderComponent={<HeaderComponent playlistData={playlistData} />}
        data={playlistData?.VideoDetail}
        renderItem={({ item, index }) => (
          <VideoBlockFullWidth key={index} videoDetails={item} />
        )}
      />
    </Screen>
  )
})

export default Playlist

const $backWhite: ViewStyle = { backgroundColor: colors.palette.neutral100 }




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
  marginTop: 10,
  fontSize: 32,
  letterSpacing: -0.5,
}

const $screenHeaderContainer: ViewStyle = {
  height: 200,
  backgroundColor: colors.palette.primary400,
  justifyContent: 'center'
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
