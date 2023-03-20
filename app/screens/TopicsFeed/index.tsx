import React, { FC, useState } from "react"
import { View, Pressable, FlatList, TextStyle, ViewStyle, RefreshControl, Dimensions } from "react-native"
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
// import AppLovinMAX from "react-native-applovin-max/src/index"
import { $flex1 } from "../styles"
import Share from "react-native-share"
import { getIconForInteraction } from "../../utils/helpers"
import { defaultImages, DEFAULT_LOADING } from "../../utils"
import LinearGradient from "react-native-linear-gradient"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"

const Actions = observer(function ActionButtons({ item }: { item: any }) {
  const [loading, setLoading] = useState<boolean>(false)
  const { interactWithTopic } = useHooks()
  const {
    interaction: { getInteractionOnTopic, getTopicInteractionOffset },
  } = useStores()

  const interaction = getInteractionOnTopic(item?._id)
  const interactionOffset = getTopicInteractionOffset(item?._id)

  return (
    <View style={$actionsContainer}>
      <View style={$actionContainer}>
        <Icon
          icon={getIconForInteraction(interaction, "liked")}
          size={20}
          style={{ marginRight: spacing.extraSmall }}
          onPress={async () => {
            if (!loading) {
              setLoading(true)
              await interactWithTopic(item?._id, "like")
              setLoading(false)
            }
          }}
        />
        <Text>{item?.likeviews - interactionOffset.likedOffset}</Text>
      </View>
      <View style={$actionContainer}>
        <Icon
          icon={getIconForInteraction(interaction, "disliked")}
          size={20}
          style={{ marginRight: spacing.extraSmall }}
          onPress={async () => {
            if (!loading) {
              setLoading(true)
              await interactWithTopic(item?._id, "dislike")
              setLoading(false)
            }
          }}
        />
        <Text>{item?.dislikeviews - interactionOffset.dislikedOffset}</Text>
      </View>
      <View style={$actionContainer}>
        <Icon
          icon="share"
          size={25}
          onPress={() =>
            Share.open({ message: "", title: "", url: `washzone://shared-topic/${item?._id}` })
          }
        />
      </View>
    </View>
  )
})

export const TopicComponent = ({ topic, index }) => {
  const [loaded, setLoaded] = useState(false)
  const navigation = useNavigation<NavigationProp<TopicsTabParamList>>()
  const topicDetails = {
    picture: topic?.userId?.picture,
    first_name: topic?.userId?.first_name,
    last_name: topic?.userId?.last_name,
    attachmentUrl: topic?.attachmentUrl,
    createdAt: topic?.createdAt,
    content: topic?.topicContent,
    title : topic?.title
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
                uri: topicDetails?.picture || defaultImages.profile,
              }}
              style={$picture}
            />
            <View style={$textContainer}>
              <Text
                text={formatName(topicDetails.first_name + " " + topicDetails.last_name)}
                preset="subheading2"
              />
              <Text text={fromNow(topicDetails.createdAt)} style={$agoStamp} />
            </View>
          </View>
          <Text style={$postContent} text={topicDetails.title} numberOfLines={1} weight='medium'/>
          <Text style={$postContent} text={topicDetails.content} numberOfLines={3} />
          <Actions item={topic} />
        </View>
        <View style={$contentCenter}>
        <ShimmerPlaceholder
          visible={loaded}
          shimmerStyle={$attachment}
          LinearGradient={LinearGradient}
        >
          <FastImage
            style={$attachment}
            source={{
              uri:
                topic?.attachmentUrl
            }}
            onLoadEnd={() => setLoaded(true)}
            resizeMode="cover"
          />
          </ShimmerPlaceholder>
        </View>
      </Pressable>
      {/* {index % 5 === 0 && (
        <AppLovinMAX.AdView
          adUnitId={MREC_AD_UNIT_ID}
          adFormat={AppLovinMAX.AdFormat.BANNER}
          style={$mrecStyle}
        />
      )} */}
    </>
  )
}

export const TopicsFeed: FC<TopicsTabProps<"TopicsFeed">> = observer(function TopicsFeed(_props) {
  const { refreshTopics, loadMoreTopics } = useHooks()
  const { topics :{topics} } = useStores()

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    refreshTopics()
    setRefreshing(false)
  }

  return (
    <Screen contentContainerStyle={$container} keyboardOffset={-180}>
      <FlatList
        ListHeaderComponent={<CreateTopic />}
        stickyHeaderIndices={[0]}
        style={$container}
        onEndReached={loadMoreTopics}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}tintColor={colors.palette.primary100} />}
        data={topics}
        renderItem={({ item, index }) => <TopicComponent topic={item} index={item?._id} />}
      />
    </Screen>
  )
})
const $actionContainer: ViewStyle = {
  width: 60,
  alignItems: "center",
  justifyContent: "flex-start",
  flexDirection: "row",
}

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
