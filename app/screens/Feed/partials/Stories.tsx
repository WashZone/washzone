import React, { useEffect } from "react"
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

interface StoryComponentProps {
  item: any
  index: number
  handleStoryUrl: (a: any) => void
}

export const Stories = observer(() => {
  const { loadStories } = useHooks()
  const {
    feedStore: { stories },
  } = useStores()

  useEffect(() => {
    loadStories()
  }, [])

  const navigationTopic = useNavigation<NavigationProp<TopicsTabParamList>>()
  const navigationClassified = useNavigation<NavigationProp<ClassifiedsTabParamList>>()
  const navigationVideo = useNavigation<NavigationProp<VideosTabParamList>>()
  const navigationHome = useNavigation<NavigationProp<HomeTabParamList>>()

  const handleStoryURL = (linkUrl: string) => {
    console.log("URL LINK",linkUrl )
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
  return (
    <Pressable
      style={$storyContainer}
      key={index}
      onPress={() => {
        handleStoryUrl(item?.attachmentUrl)
      }}
    >
      <FastImage source={{ uri: item?.thumbnailUrl }} resizeMode="cover" style={$story} />
      <View style={$pictureContainer}>
        <FastImage source={{ uri: item?.userId?.picture }} style={$picture} />
      </View>
      <LinearGradient colors={["transparent", colors.palette.primary200]} style={$nameContainer}>
        <Text text={formatName(item?.userId?.name)} style={$name} numberOfLines={1} />
      </LinearGradient>
    </Pressable>
  )
}

const storyContainerRadius = 10

const $storyList: ViewStyle = { paddingHorizontal: spacing.homeScreen / 2 }

const $story: ImageStyle = {
  height: "100%",
  width: "100%",
  borderRadius: storyContainerRadius,
  position: "absolute",
}

const $storyContainer: ViewStyle = {
  height: 180,
  backgroundColor: colors.palette.neutral300,
  width: 100,
  borderRadius: storyContainerRadius,
  margin: spacing.homeScreen / 2,
  justifyContent: "space-between",
}

const $pictureContainer: ViewStyle = {
  height: 44,
  width: 44,
  borderRadius: 20,
  backgroundColor: colors.palette.primary200,
  margin: 5,
  alignItems: "center",
  justifyContent: "center",
}

const $picture: ImageStyle = {
  height: 40,
  width: 40,
  borderRadius: 20,
}

const $nameContainer: ViewStyle = {
  borderBottomEndRadius: storyContainerRadius,
  borderBottomLeftRadius: storyContainerRadius,
  paddingLeft: 12,
}

const $name: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 14,
  textShadowColor: colors.palette.neutral700,
  textShadowRadius: 4,
  textShadowOffset: { height: -2, width: 0 },
}

const $container: ViewStyle = {
  width: "100%",
  height: 210,
  backgroundColor: colors.palette.neutral100,
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 10,
}
