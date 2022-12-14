import React, { FC, useEffect, useState } from "react"
import { View, Pressable, FlatList, TextStyle, ViewStyle, RefreshControl } from "react-native"
import { Screen, Text } from "../../components"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { TopicsTabParamList, TopicsTabProps } from "../../tabs"
import { colors, spacing } from "../../theme"
import { fromNow } from "../../utils/agoFromNow"
import { formatName } from "../../utils/formatName"
import { useStores } from "../../models"
import { useHooks } from "../hooks"
import { observer } from "mobx-react-lite"
import { CreateTopic } from "./CreateTopic"
import { NavigationProp, useNavigation } from "@react-navigation/native"

export const TopicComponent = ({ topic }) => {
  const navigation = useNavigation<NavigationProp<TopicsTabParamList>>()

  const topicDetails = {
    picture: topic?.UserId?.picture,
    first_name: topic?.UserId?.first_name,
    last_name: topic?.UserId?.last_name,
    attachmentUrl: topic?.attachmentUrl,
    createdAt: topic?.createdAt,
    heading: topic?.topicHeading,
    content: topic?.topicContent,
  }

  return (
    <Pressable
      style={$postContainer}
      onPress={() => navigation.navigate("TopicDetails", { topic })}
    >
      <View>
        <View style={$publisherInfoContainer}>
          <FastImage
            source={{
              uri: topicDetails?.picture || "https://edigitalcare.in/public/uploads/user-dummy.png",
            }}
            style={$picture}
          />
          <View style={$textContainer}>
            <Text
              text={formatName(topicDetails.first_name + " " + topicDetails.last_name)}
              preset="subheading2"
            />
            <Text text={fromNow(topic.createdAt)} style={$agoStamp} />
          </View>
        </View>
        <Text style={$postContent} text={topicDetails.heading} />
      </View>
      <FastImage
        style={$attachment}
        source={{
          uri:
            topic?.attachmentUrl ||
            "https://www.classify24.com/wp-content/uploads/2015/11/no-image.png",
        }}
        resizeMode="cover"
      />
    </Pressable>
  )
}

export const TopicsFeed: FC<TopicsTabProps<"TopicsFeed">> = observer(function TopicsFeed(_props) {
  const { refreshTopics, loadMoreTopics } = useHooks()
  const { topics } = useStores()

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    refreshTopics()
    setRefreshing(false)
  }

  useEffect(() => {
    refreshTopics()
  }, [])

  return (
    <Screen contentContainerStyle={$container}>
      <FlatList
        ListHeaderComponent={<CreateTopic />}
        stickyHeaderIndices={[0]}
        style={$container}
        onEndReached={loadMoreTopics}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={topics.topics}
        renderItem={({ item }) => <TopicComponent topic={item} />}
      />
    </Screen>
  )
})

const postContainerRadius = 10

const $container: ViewStyle = { flex: 1 }

const $attachment: ImageStyle = {
  height: 120,
  width: 120,
}

const $postContent: TextStyle = {
  fontSize: 13,
  marginHorizontal: spacing.homeScreen,
  marginBottom: spacing.homeScreen,
  lineHeight: 20,
}

const $agoStamp: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral500,
}

const $postContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  width: "100%",
  borderRadius: postContainerRadius,
  justifyContent: "space-between",
  flexDirection: "row",
  marginTop: 10,
}

const $publisherInfoContainer: ViewStyle = {
  height: 68,
  width: "100%",
  borderRadius: 20,
  alignItems: "center",
  flexDirection: "row",
  padding: spacing.homeScreen,
}

const $picture: ImageStyle = {
  height: 40,
  width: 40,
  borderRadius: 20,
  marginRight: spacing.homeScreen,
}

const $textContainer: ViewStyle = {
  justifyContent: "space-around",
  height: "90%",
}
