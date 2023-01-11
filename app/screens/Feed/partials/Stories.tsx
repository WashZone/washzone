import React, { useEffect } from "react"
import { FlatList, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../../components"
import { colors, spacing } from "../../../theme"
import FastImage, { ImageStyle } from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import { useHooks } from "../../hooks"
import { useStores } from "../../../models"
import { formatName } from "../../../utils/formatName"
import { openCustomUrl } from "../../../utils/navigations"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { ClassifiedsTabParamList, VideosTabParamList, TopicsTabParamList } from "../../../tabs"
import { TabParamList } from "../../../navigators/TabNavigator"

interface StoryComponentProps {
  item: any
  index: number
}

export function Stories() {
  const { loadStories } = useHooks()
  const {
    feedStore: { stories },
  } = useStores()

  useEffect(() => {
    loadStories()
  }, [])
  const navigation = useNavigation<NavigationProp<TabParamList>>()
  const navigationTopic = useNavigation<NavigationProp<TopicsTabParamList>>()
  const navigationClassified = useNavigation<NavigationProp<ClassifiedsTabParamList>>()
  const navigationVideo = useNavigation<NavigationProp<VideosTabParamList>>()

  const StoryComponent = ({ item, index }: StoryComponentProps) => {
    return (
      <Pressable
        style={$storyContainer}
        key={index}
        onPress={() => {
          openCustomUrl(
            item?.attachmentUrl,
            navigation,
            navigationTopic,
            navigationClassified,
            navigationVideo,
          )
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

  return (
    <View style={$container}>
      <FlatList
        data={stories}
        horizontal
        renderItem={({ item, index }) => <StoryComponent item={item} index={index} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={$storyList}
      />
    </View>
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
