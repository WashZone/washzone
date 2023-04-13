import React, { FC, useEffect, useRef, useState } from "react"
import {
  View,
  Pressable,
  FlatList,
  TextStyle,
  ViewStyle,
  RefreshControl,
  Dimensions,
} from "react-native"
import { CustomFlatlist, Icon, Screen, Text } from "../../components"
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
// import AppLovinMAX from "react-native-applovin-max/src/index"
import { $flex1, $flexRow } from "../styles"
import Share from "react-native-share"
import { getIconForInteraction } from "../../utils/helpers"
import { defaultImages } from "../../utils"
import LinearGradient from "react-native-linear-gradient"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"
import NativeAdView from "../../utils/NativeAd"

const Actions = observer(function ActionButtons({ item }: { item: any }) {
  const [loading, setLoading] = useState<boolean>(false)
  const { interactWithTopic } = useHooks()
  const [dynamicData, setDynamicData] = useState({
    interaction: item?.interaction,
    dislikeviews: item?.dislikeviews,
    likeviews: item?.likeviews,
  })

  useEffect(() => {
    console.log("CHANGING DYANMIC DATA")
    setDynamicData({
      interaction: item?.interaction,
      dislikeviews: item?.dislikeviews,
      likeviews: item?.likeviews,
    })
  }, [item])
  return (
    <View style={$actionsContainer}>
      <View style={$actionContainer}>
        <Icon
          icon={getIconForInteraction(dynamicData.interaction, "liked")}
          size={20}
          style={{ marginRight: spacing.extraSmall }}
          onPress={async () => {
            if (!loading) {
              setLoading(true)
              const res = await interactWithTopic({
                topicId: item?._id,
                button: "like",
                previousData: dynamicData,
              })
              setDynamicData(res)
              setLoading(false)
            }
          }}
        />
        <Text>{dynamicData?.likeviews}</Text>
      </View>
      <View style={$actionContainer}>
        <Icon
          icon={getIconForInteraction(dynamicData.interaction, "disliked")}
          size={20}
          style={{ marginRight: spacing.extraSmall }}
          onPress={async () => {
            if (!loading) {
              setLoading(true)
              const res = await interactWithTopic({
                topicId: item?._id,
                button: "dislike",
                previousData: dynamicData,
              })
              setDynamicData(res)
              setLoading(false)
            }
          }}
        />
        <Text>{dynamicData?.dislikeviews}</Text>
      </View>
      <View style={$actionContainer}>
        <Icon
          icon="shareCursive"
          size={20}
          onPress={() =>
            Share.open({ message: "", title: "", url: `washzone://shared-topic/${item?._id}` })
          }
        />
      </View>
    </View>
  )
})

export const TopicComponent = observer(({ topic }: { topic: any }) => {
  const [loaded, setLoaded] = useState(false)
  const navigation = useNavigation<NavigationProp<TopicsTabParamList>>()
  const topicDetails = {
    picture: topic?.userId?.picture,
    first_name: topic?.userId?.first_name,
    last_name: topic?.userId?.last_name,
    attachmentUrl: topic?.attachmentUrl,
    createdAt: topic?.createdAt,
    content: topic?.topicContent,
    title: topic?.title,
  }

  return (
    <>
      <Pressable
        style={[$postContainer, $postParentContainer, $flexRow]}
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
            <View style={[$textContainer, { justifyContent: "center" }]}>
              <Text
                text={formatName(topicDetails.first_name + " " + topicDetails.last_name)}
                preset="subheading2"
              />
              <Text
                text={fromNow(topicDetails.createdAt)}
                size="xxs"
                color={colors.palette.neutral500}
              />
            </View>
          </View>
          <Text style={$postContent} text={topicDetails.title} numberOfLines={1} weight="medium" />
          <Text style={$postContent} text={topicDetails.content} numberOfLines={3} size="xs" />
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
                uri: topic?.attachmentUrl,
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
})

export const TopicComponentFullView = ({ topic }) => {
  const [loaded, setLoaded] = useState(false)
  const [attachmentDimensions, setAttachmentDimensions] = useState({ height: 0, width: 0 })
  const navigation = useNavigation<NavigationProp<TopicsTabParamList>>()
  const topicDetails = {
    picture: topic?.userId?.picture,
    first_name: topic?.userId?.first_name,
    last_name: topic?.userId?.last_name,
    attachmentUrl: topic?.attachmentUrl,
    createdAt: topic?.createdAt,
    content: topic?.topicContent,
    title: topic?.title,
  }
  const windowWidth = Dimensions.get("window").width
  const nativeAdViewRef = useRef<any>()

  useEffect(() => {
    if (nativeAdViewRef?.current) {
      nativeAdViewRef.current?.loadAd()
    }
  }, [nativeAdViewRef.current])

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
            <View style={[$textContainer, $flexRow, { alignItems: "center" }]}>
              <Text
                text={formatName(topicDetails.first_name + " " + topicDetails.last_name)}
                preset="subheading2"
              />
              <Text text={fromNow(topicDetails.createdAt)} style={$agoStamp} />
            </View>
          </View>
          <Text
            style={$postContent}
            text={topicDetails.title}
            numberOfLines={1}
            weight="medium"
            size="md"
          />
          <Text style={$postContent} text={topicDetails.content} size="xs" />
        </View>
        <View style={[$contentCenter, { marginTop: spacing.tiny }]}>
          <ShimmerPlaceholder
            visible={loaded}
            shimmerStyle={$attachment}
            LinearGradient={LinearGradient}
          >
            <FastImage
              style={attachmentDimensions}
              source={{
                uri: topic?.attachmentUrl,
              }}
              onLoad={(res) => {
                setAttachmentDimensions({
                  height: (windowWidth * res.nativeEvent.height) / res.nativeEvent.width,
                  width: windowWidth,
                })
              }}
              onLoadEnd={() => setLoaded(true)}
              resizeMode="cover"
            />
          </ShimmerPlaceholder>
        </View>
        <Actions item={topic} />
      </Pressable>
      <NativeAdView ref={nativeAdViewRef} />
    </>
  )
}

export const TopicsFeed: FC<TopicsTabProps<"TopicsFeed">> = observer(function TopicsFeed(_props) {
  const { refreshTopics, loadMoreTopics } = useHooks()
  const {
    topics: { topics },
  } = useStores()


  const onRefresh = async () => {
    await refreshTopics()

  }

  return (
    <Screen contentContainerStyle={$container} keyboardOffset={-180}>
      <CustomFlatlist
        customRefresh={onRefresh}
        ListHeaderComponent={<CreateTopic />}
        stickyHeaderIndices={[0]}
        style={$container}
        onEndReached={loadMoreTopics}
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

const $contentCenter: ViewStyle = { alignSelf: "center" }

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
  marginHorizontal: spacing.homeScreen,
  marginBottom: spacing.tiny,
}

const $agoStamp: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral500,
}

const $postContainer: ViewStyle = {
  // flexDirection: "row",
}

const $postParentContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  width: "100%",
  justifyContent: "space-between",
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
  // marginTop: 10,
}

const $publisherInfoContainer: ViewStyle = {
  height: 64,
  alignItems: "center",
  flexDirection: "row",
  padding: spacing.homeScreen,
}

const $picture: ImageStyle = {
  height: 40,
  width: 40,
  borderRadius: 20,
  marginRight: spacing.extraSmall,
}

const $textContainer: ViewStyle = {
  justifyContent: "space-between",
  flex: 1,
  height: "100%",
  // backgroundColor:'red'
}
