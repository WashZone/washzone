import React, { FC, useState } from "react"
import { View, Pressable, FlatList, TextStyle, ViewStyle, RefreshControl } from "react-native"
import { Icon, Screen, Text } from "../../components"
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
import { MREC_AD_UNIT_ID } from "../../utils/AppLovin"
import AppLovinMAX from "react-native-applovin-max/src/index"
import { $flex1 } from "../styles"
import Share from "react-native-share"

const Actions = ({ itemId }: { itemId: string }) => {
  const [status, setStatus] = useState<"liked" | "disliked" | null>(null)
  return (
    <View style={$actionsContainer}>
      <Icon
        icon={status === "liked" ? "likefill" : "like"}
        size={20}
        style={{ marginRight: spacing.medium }}
        onPress={() => setStatus(status === "liked" ? null : "liked")}
      />
      <Icon
        icon={status === "disliked" ? "dislikefill" : "dislike"}
        size={20}
        style={{ marginRight: spacing.medium }}
        onPress={() => setStatus(status === "disliked" ? null : "disliked")}
      />
      <Icon
        icon="share"
        size={25}
        onPress={() =>
          Share.open({ message: "", title: "", url: `washzone://story-topic/${itemId}` })
            .then((res) => {
              console.log(res)
            })
            .catch((err) => {
              err && console.log(err)
            })
        }
      />
    </View>
  )
}

export const TopicComponent = ({ topic, index }) => {
  const navigation = useNavigation<NavigationProp<TopicsTabParamList>>()
  console.log("TOPICTOPCITOPCI", topic)
  const topicDetails = {
    picture: topic?.userId?.picture,
    first_name: topic?.userId?.first_name,
    last_name: topic?.userId?.last_name,
    attachmentUrl: topic?.attachmentUrl,
    createdAt: topic?.createdAt,
    content: topic?.topicContent,
  }

  return (
    <>
      <Pressable
        style={[$postContainer, $postParentContainer]}
        onPress={() => navigation.navigate("TopicInfo", { topic })}
      >
        <View style={$flex1}>
          <View style={$publisherInfoContainer}>
            <FastImage
              source={{
                uri:
                  topicDetails?.picture || "https://edigitalcare.in/public/uploads/user-dummy.png",
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
          <Text style={$postContent} text={topicDetails.content} numberOfLines={3} />
          <Actions itemId={topic?._id} />
        </View>
        <View style={$contentCenter}>
          <FastImage
            style={$attachment}
            source={{
              uri:
                topic?.attachmentUrl ||
                "https://www.classify24.com/wp-content/uploads/2015/11/no-image.png",
            }}
            resizeMode="cover"
          />
        </View>
      </Pressable>
      {/* <Actions /> */}
      {index % 5 === 0 && (
        <AppLovinMAX.AdView
          adUnitId={MREC_AD_UNIT_ID}
          adFormat={AppLovinMAX.AdFormat.BANNER}
          style={$mrecStyle}
        />
      )}
    </>
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

  return (
    <Screen contentContainerStyle={$container}>
      <FlatList
        ListHeaderComponent={<CreateTopic />}
        stickyHeaderIndices={[0]}
        style={$container}
        onEndReached={loadMoreTopics}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={topics.topics}
        renderItem={({ item, index }) => <TopicComponent topic={item} index={index} />}
      />
    </Screen>
  )
})

const $contentCenter: ViewStyle = {}

const $mrecStyle: ViewStyle = { marginTop: 10, alignSelf: "center" }

const postContainerRadius = 10

const $container: ViewStyle = { flex: 1 }

const $actionsContainer: ViewStyle = {
  flexDirection: "row",
  padding: spacing.medium,
  zIndex: 999,
}

const $attachment: ImageStyle = {
  height: 120,
  width: 120,
  margin: 10,
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
  flexDirection: "row",
}

const $postParentContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  width: "100%",
  borderRadius: postContainerRadius,
  justifyContent: "space-between",
  marginTop: 10,
}

const $publisherInfoContainer: ViewStyle = {
  height: 68,
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
