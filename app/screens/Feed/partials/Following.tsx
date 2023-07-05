import React, { useEffect, useState } from "react"
import { FlatList, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"

import { HomeTabParamList } from "../../../tabs"
import { useHooks } from "../../hooks"
import { useStores } from "../../../models"
import { formatName } from "../../../utils/formatName"
import { colors, spacing } from "../../../theme"
import { Text } from "../../../components"
import { observer } from "mobx-react-lite"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"
import { BROKEN_IMAGE } from "../../../utils"
import { $contentCenter } from "../../styles"

interface StoryComponentProps {
  item: any
  index: number
}

function compareFn(a: any, b: any) {
  return b?.unreadCount - a?.unreadCount
}

export const Stories = observer(() => {
  const { getActivities } = useHooks()
  const {
    feedStore: { stories },
  } = useStores()

  useEffect(() => {
    getActivities()
  }, [])

  // const navigationTopic = useNavigation<NavigationProp<TopicsTabParamList>>()
  // const navigationClassified = useNavigation<NavigationProp<ClassifiedsTabParamList>>()
  // const navigationVideo = useNavigation<NavigationProp<VideosTabParamList>>()
  // const navigationHome = useNavigation<NavigationProp<HomeTabParamList>>()

  // const handleStoryURL = (linkUrl: string) => {
  //   console.log("URL LINK", linkUrl)
  //   let valid = false
  //   if (/story-post/.test(linkUrl)) {
  //     valid = true
  //     setTimeout(
  //       () =>
  //         navigationHome.navigate("PostInfo", {
  //           post: linkUrl?.split("/")[linkUrl?.split("/")?.length - 1],
  //         }),
  //       200,
  //     )
  //   }
  //   if (/story-classified/.test(linkUrl)) {
  //     valid = true
  //     setTimeout(
  //       () =>
  //         navigationClassified.navigate("ClassifiedsDetails", {
  //           classified: linkUrl?.split("/")[linkUrl?.split("/")?.length - 1],
  //         }),
  //       200,
  //     )
  //   }
  //   if (/story-topic/.test(linkUrl)) {
  //     valid = true
  //     setTimeout(() => {
  //       navigationTopic.navigate("TopicInfo", {
  //         topic: linkUrl?.split("/")[linkUrl?.split("/")?.length - 1],
  //       })
  //     }, 200)
  //   }
  //   if (/story-video/.test(linkUrl)) {
  //     valid = true

  //     setTimeout(
  //       () =>
  //         navigationVideo.navigate("VideoDetails", {
  //           data: linkUrl?.split("/")[linkUrl?.split("/")?.length - 1],
  //         }),
  //       200,
  //     )
  //   }

  //   // If the URL doesnt fit any of our cases, then!
  //   if (!valid) {
  //     Alert.alert("Something Went Wrong!", "Please ask the publisher to either Repost or Delete.")
  //   }
  // }
  if (stories.length === 0) return null

  return (
    <View style={$container}>
      <FlatList
        removeClippedSubviews
        data={stories.slice().sort(compareFn)}
        horizontal
        renderItem={({ item, index }) => <StoryComponent item={item} index={index} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={$storyList}
      />
    </View>
  )
})

const StoryComponent = ({ item, index }: StoryComponentProps) => {
  const [loaded, setLoaded] = useState(false)
  const navigationHome = useNavigation<NavigationProp<HomeTabParamList>>()
  return (
    <ShimmerPlaceholder
      visible={loaded}
      shimmerStyle={$storyContainer}
      LinearGradient={LinearGradient}
    >
      <Pressable
        onPress={() => navigationHome.navigate("PostList", { user: item?.followId })}
        style={$storyContainer}
        key={index}
      >
        <FastImage
          onLoadEnd={() => setLoaded(true)}
          defaultSource={BROKEN_IMAGE}
          source={{ uri: item?.followId?.picture }}
          resizeMode="cover"
          style={$story}
        />
        {item?.unreadCount !== 0 && item?.unreadCount !== -1 && (
          <View style={$activityDot}>
            <Text style={$unreadCountText} text={item?.unreadCount} weight="semiBold" />
          </View>
        )}
        <Text
          text={formatName(item?.followId?.name)}
          style={[
            $name,
            item?.unreadCount !== 0 &&
              item?.unreadCount !== -1 && {
                textShadowRadius: spacing.tiny,
              },
          ]}
          numberOfLines={1}
        />
      </Pressable>
    </ShimmerPlaceholder>
  )
}

const $unreadCountText: TextStyle = {
  fontSize: 12,
  lineHeight: 15,
  color: colors.palette.neutral100,
}

const $activityDot: ViewStyle = {
  height: 18,
  width: 18,
  borderRadius: 10,
  backgroundColor: colors.palette.primary300,
  position: "absolute",
  bottom: 25,
  right: 0,
  ...$contentCenter,
}

const $storyList: ViewStyle = { paddingHorizontal: spacing.homeScreen / 2 }

const $story: ImageStyle = {
  height: 80,
  width: 80,
  borderRadius: 40,
}

const $storyContainer: ViewStyle = {
  height: 100,
  width: 80,
  margin: spacing.homeScreen / 2,
  justifyContent: "space-between",
}

const $name: TextStyle = {
  color: colors.palette.neutral700,
  fontSize: 14,
  textAlign: "center",
  textShadowColor: colors.palette.primary400,
  textShadowOffset: { height: -2, width: 0 },
}

const $container: ViewStyle = {
  width: "100%",
  height: 120,
  backgroundColor: colors.palette.neutral100,
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 10,
}
