import React from "react"
import { FlatList, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../../components"
import { colors, spacing } from "../../../theme"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { stories, Story } from "../../../mock/Home/Stories"
import LinearGradient from "react-native-linear-gradient"

interface StoryComponentProps {
  item: Story
  index: number
}

export function Stories() {
  const StoryComponent = ({ item, index }: StoryComponentProps) => {
    return (
      <Pressable style={$storyContainer} key={index}>
        <FastImage source={{ uri: item.thumbnailUrl }} resizeMode="cover" style={$story} />
        <View style={$pictureContainer}>
          <FastImage source={{ uri: item.publisher.picture }} style={$picture} />
        </View>
        <LinearGradient colors={["transparent", colors.palette.primary200]} style={$nameContainer}>
          <Text
            text={item.publisher.first_name + " " + item.publisher.first_name[0] + "."}
            style={$name}
          />
        </LinearGradient>
      </Pressable>
    )
  }

  return (
    <View style={$container}>
      <FlatList
        data={stories}
        horizontal
        renderItem={StoryComponent}
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
