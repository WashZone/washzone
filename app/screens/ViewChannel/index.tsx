import React, { FC, useEffect, useState } from "react"
import { View, TextStyle, ViewStyle, Pressable, FlatList, Dimensions } from "react-native"
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
import { VideoBlockFullWidth } from "../Playlist"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"
import LinearGradient from "react-native-linear-gradient"

export const ViewChannel: FC<VideosTabProps<"ViewChannel">> = observer(function ViewChannel(props) {
  const { publisher } = props.route.params
  //   const navigation = useNavigation<NavigationProp<VideosTabParamList>>()

  const [data, setData] = useState<any>([{}, {}, {}])
  const [loading, setLoading] = useState(true)

  const { getUserVideos } = useHooks()

  const syncPlaylistData = async () => {
    setLoading(true)
    const res = await getUserVideos(publisher?._id)

    setData(res)
    setLoading(false)
  }

  useEffect(() => {
    syncPlaylistData()
  }, [])

  return (
    <Screen preset="fixed" contentContainerStyle={$flex1}>
      <FlatList
        style={$flex1}
        ListHeaderComponent={<HeaderComponent publisher={publisher} />}
        data={data}
        renderItem={({ item, index }) =>
          loading ? (
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              shimmerStyle={$shimmer}
            />
          ) : (
            <VideoBlockFullWidth index={index} key={index} videoDetails={item} />
          )
        }
      />
    </Screen>
  )
})

const HeaderComponent = ({ publisher }: { publisher: any }) => {
  return (
    <View style={$screenHeaderContainer}>
      <FastImage style={$avatar} source={{ uri: publisher?.picture }} />
      <Text text={formatName(publisher?.name)} preset="heading" style={$heading} weight="bold" />
    </View>
  )
}

export default ViewChannel

const $shimmer:ViewStyle={
    marginHorizontal: spacing.medium,
    marginTop: spacing.medium,
    height: 100,
    width: Dimensions.get("window").width,
  }

const $avatar: ImageStyle = {
  height: 60,
  width: 60,
  borderRadius: 30,
  alignSelf: "center",
  marginTop: 10,
}

const $heading: TextStyle = {
  color: colors.palette.neutral100,
  alignSelf: "center",
  fontSize: 32,
  letterSpacing: -0.5,
}

const $screenHeaderContainer: ViewStyle = {
  height: 155,
  backgroundColor: colors.palette.primary400,
  justifyContent: "center",
  marginBottom: spacing.homeScreen,
}