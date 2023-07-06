import React, { FC, useEffect, useRef, useState } from "react"
import {
  View,
  Pressable,
  TextStyle,
  ViewStyle,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native"
import { CustomFlatlist, Icon, LikesModal, Screen, Text } from "../../components"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { HomeTabParamList, TopicsTabParamList, TopicsTabProps } from "../../tabs"
import { colors, spacing } from "../../theme"
import { fromNow } from "../../utils/agoFromNow"
import { formatName } from "../../utils/formatName"
import { useStores } from "../../models"
import { useHooks } from "../hooks"
import { observer } from "mobx-react-lite"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { $flex1, $flexRow } from "../styles"
import { getIconForInteraction, showAlertYesNo } from "../../utils/helpers"
import { defaultImages, messageMetadataType } from "../../utils"
import LinearGradient from "react-native-linear-gradient"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"
import NativeAdView from "../../utils/NativeAd"
import * as Haptics from "expo-haptics"
import { Host } from "react-native-portalize"

const Actions = observer(function ActionButtons({
  item,
}: {
  item: any
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [isLikesModalVisible, setLikesModalVisible] = useState(false)
  const { interactWithTopic } = useHooks()
  const [dynamicData, setDynamicData] = useState({
    interaction: item?.interaction,
    dislikeviews: item?.dislikeviews,
    likeviews: item?.likeviews,
  })
  const {
    userStore: { _id },
    api: { mutateFlagsOnFeed },
    share: { share },
  } = useStores()

  useEffect(() => {
    setDynamicData({
      interaction: item?.interaction,
      dislikeviews: item?.dislikeviews,
      likeviews: item?.likeviews,
    })
  }, [item])
  const flagTopic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    showAlertYesNo({
      message: "Flag " + item?.userId?.first_name + "'s discussion ?",
      description:
        "Our team will review the flagged content promptly and take appropriate action based on our community guidelines and policies.",
      onYesPress: async () => {
        try {
          await mutateFlagsOnFeed({
            flagsById: _id,
            type: "post",
            postId: item?._id,
          })
          Alert.alert("Success!", "We will review the flagged content within 24 hours.")
        } catch (err) {
          Alert.alert(err?.response?.errors?.[0]?.message)
        }
      },
    })
  }

  return (
    <>
      <View style={$actionsContainer}>
        <View style={$flexRow}>
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
            <Text onPress={() => dynamicData?.likeviews > 0 && setLikesModalVisible(true)}>
              {dynamicData?.likeviews}
            </Text>
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
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                share({
                  message: item?.topicContent || '',
                  title:item?.title || '',
                  url: `washzone://shared-topic/${item?._id}`,
                  type: messageMetadataType.sharedDiscussion,
                  attachment: item?.attachmentUrl || ''
                })
              }}
            />
          </View>
        </View>
        <Icon icon="flag" size={20} onPress={flagTopic} />
      </View>
      <LikesModal
        likesCount={dynamicData?.likeviews}
        key={item?._id}
        module="discussion"
        moduleId={item?._id}
        isVisible={isLikesModalVisible}
        setVisible={setLikesModalVisible}
      />
    </>
  )
})

export const TopicComponent = observer(({ topic, index }: { topic: any; index: number }) => {
  const [loaded, setLoaded] = useState(false)
  const navigation = useNavigation<NavigationProp<TopicsTabParamList>>()
  const navigationHome = useNavigation<NavigationProp<HomeTabParamList>>()
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
        style={[$postContainer, $postParentContainer]}
        onPress={() => navigation.navigate("TopicInfo", { topic })}
      >
        <View style={$flexRow}>
          <View style={$flex1}>
            <View style={$publisherInfoContainer}>
              <TouchableOpacity
                onPress={() => navigationHome.navigate("Profile", { user: topic?.userId })}
              >
                <FastImage
                  source={{
                    uri: topicDetails?.picture || defaultImages.profile,
                  }}
                  style={$picture}
                />
              </TouchableOpacity>
              <View style={[$textContainer,
                // eslint-disable-next-line react-native/no-inline-styles
                { justifyContent: "center" }]}>
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
            <Text
              style={$postContent}
              text={topicDetails.title}
              numberOfLines={1}
              weight="medium"
            />
            <Text style={$postContent} text={topicDetails.content} numberOfLines={3} size="xs" />
          </View>
          {topic?.attachmentUrl && (
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
          )}
        </View>
        <Actions item={topic} />
      </Pressable>
      {index % 5 === 0 && <NativeAdView />}

    </>
  )
})

export const TopicComponentFullView = ({ topic }) => {
  const [loaded, setLoaded] = useState(false)
  const windowWidth = Dimensions.get("window").width

  const [attachmentDimensions, setAttachmentDimensions] = useState({
    width: windowWidth,
    height: (windowWidth * 9) / 16,
  })
  const navigationHome = useNavigation<NavigationProp<HomeTabParamList>>()
  const topicDetails = {
    picture: topic?.userId?.picture,
    first_name: topic?.userId?.first_name,
    last_name: topic?.userId?.last_name,
    attachmentUrl: topic?.attachmentUrl,
    createdAt: topic?.createdAt,
    content: topic?.topicContent,
    title: topic?.title,
    userID: topic?.userId?._id,
  }
  const nativeAdViewRef = useRef<any>()

  useEffect(() => {
    if (nativeAdViewRef?.current) {
      nativeAdViewRef.current?.loadAd()
    }
  }, [nativeAdViewRef.current])

  return (
    <>
      <View style={[$postContainer, $postParentContainer]}>
        <View style={$flex1}>
          <View style={$publisherInfoContainer}>
            <TouchableOpacity
              onPress={() => navigationHome.navigate("Profile", { user: topic?.userId })}
            >
              <FastImage
                source={{
                  uri: topicDetails?.picture || defaultImages.profile,
                }}
                style={$picture}
              />
            </TouchableOpacity>
            <View style={[$textContainer, $flexRow,
              // eslint-disable-next-line react-native/no-inline-styles
              { alignItems: "center" }]}>
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
        {topic?.attachmentUrl && (
          <View style={[$contentCenter, { marginTop: spacing.tiny }]}>
            <ShimmerPlaceholder
              visible={loaded}
              shimmerStyle={{ width: windowWidth, height: (windowWidth * 9) / 16 }}
              LinearGradient={LinearGradient}
            >
              <FastImage
                resizeMode={FastImage.resizeMode.stretch}
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
              />
            </ShimmerPlaceholder>
          </View>
        )}
        <Actions item={topic} />
      </View>
      <NativeAdView />
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
      <Host>
        <CustomFlatlist
          customRefresh={onRefresh}
          // ListHeaderComponent={<CreateTopic focused={props.route.params?.focused} />}
          style={$container}
          onEndReached={loadMoreTopics}
          data={topics}
          renderItem={({ item, index }) => <TopicComponent topic={item} index={index} />}
        />
      </Host>
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
  justifyContent: "space-between",
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
  marginTop: 6,
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
