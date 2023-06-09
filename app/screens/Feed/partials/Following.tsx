import React, { useEffect, useState } from "react"
import { Alert, FlatList, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"

import {
  TopicsTabParamList,
  ClassifiedsTabParamList,
  VideosTabParamList,
  HomeTabParamList,
} from "../../../tabs"
import { useHooks } from "../../hooks"
import { useStores } from "../../../models"
import { formatName } from "../../../utils/formatName"
import { colors, spacing } from "../../../theme"
import { Text } from "../../../components"
import { observer } from "mobx-react-lite"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"
import { BROKEN_IMAGE } from "../../../utils"

interface StoryComponentProps {
  item: any
  index: number
  handleStoryUrl: (a: any) => void
}

export const Stories = observer(() => {
  const { getActivities } = useHooks()
  const {
    feedStore: { stories },
  } = useStores()

  useEffect(() => {
    getActivities()
  }, [])

  const navigationTopic = useNavigation<NavigationProp<TopicsTabParamList>>()
  const navigationClassified = useNavigation<NavigationProp<ClassifiedsTabParamList>>()
  const navigationVideo = useNavigation<NavigationProp<VideosTabParamList>>()
  const navigationHome = useNavigation<NavigationProp<HomeTabParamList>>()

  const handleStoryURL = (linkUrl: string) => {
    console.log("URL LINK", linkUrl)
    let valid = false
    if (/story-post/.test(linkUrl)) {
      valid = true
      setTimeout(
        () =>
          navigationHome.navigate("PostInfo", {
            post: linkUrl?.split("/")[linkUrl?.split("/")?.length - 1],
          }),
        200,
      )
    }
    if (/story-classified/.test(linkUrl)) {
      valid = true
      setTimeout(
        () =>
          navigationClassified.navigate("ClassifiedsDetails", {
            classified: linkUrl?.split("/")[linkUrl?.split("/")?.length - 1],
          }),
        200,
      )
    }
    if (/story-topic/.test(linkUrl)) {
      valid = true
      setTimeout(() => {
        navigationTopic.navigate("TopicInfo", {
          topic: linkUrl?.split("/")[linkUrl?.split("/")?.length - 1],

        })
      }, 200)
    }
    if (/story-video/.test(linkUrl)) {
      valid = true

      setTimeout(
        () =>
          navigationVideo.navigate("VideoDetails", {
            data: linkUrl?.split("/")[linkUrl?.split("/")?.length - 1],
          }),
        200,
      )
    }

    // If the URL doesnt fit any of our cases, then!
    if (!valid) {
      Alert.alert("Something Went Wrong!", "Please ask the publisher to either Repost or Delete.")
    }
  }

  return (
    <View style={$container}>
      <FlatList
        removeClippedSubviews
        data={stories}
        horizontal
        renderItem={({ item, index }) => (
          <StoryComponent handleStoryUrl={handleStoryURL} item={item} index={index} />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={$storyList}
      />
    </View>
  )
})

const StoryComponent = ({ item, index, handleStoryUrl }: StoryComponentProps) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <ShimmerPlaceholder
      visible={loaded}
      shimmerStyle={$storyContainer}
      LinearGradient={LinearGradient}
    >
      <Pressable
        style={$storyContainer}
        key={index}
        onPress={() => {
          handleStoryUrl(item?.activityDotUrl)
        }}
      >
        <FastImage
          onLoadEnd={() => setLoaded(true)}
          defaultSource={BROKEN_IMAGE}
          source={{ uri: item?.userId?.picture }}
          resizeMode="cover"
          style={$story}
        />
        <View style={$activityDot}>
        </View>
        <Text text={formatName(item?.userId?.name)} style={$name} numberOfLines={1} />
      </Pressable>
    </ShimmerPlaceholder>
  )
}

const $activityDot : ViewStyle ={
  height:14, width: 14, borderRadius: 7 , backgroundColor:colors.palette.primary300 , position:'absolute' , bottom:25, right : 0
}

const $storyList: ViewStyle = { paddingHorizontal: spacing.homeScreen / 2 }

const $story: ImageStyle = {
  height: 80,
  width: 80,
  borderRadius: 40,
}

const $storyContainer: ViewStyle = {
  height: 100,
  margin: spacing.homeScreen / 2,
  justifyContent: "space-between",
}


const $name: TextStyle = {
  color: colors.palette.neutral700,
  fontSize: 14,
  textAlign:'center',
  textShadowColor: colors.palette.primary400,
  textShadowRadius: 4,
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
