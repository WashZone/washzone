import React, { FC, useEffect, useRef, useState } from "react"
import {
  View,
  Pressable,
  TextStyle,
  ViewStyle,
  Dimensions,
  TouchableOpacity,
  Alert,
  LayoutChangeEvent,
} from "react-native"
import {
  $verticalAbsoluteTop,
  CustomFlatlist,
  Icon,
  LikesModal,
  Menu,
  Screen,
  ShimmingImage,
  Text,
} from "../../components"
import FastImage, { ImageStyle } from "react-native-fast-image"
import {  HomeTabParamList, TopicsTabParamList, TopicsTabProps } from "../../tabs"
import { colors, spacing } from "../../theme"
import { fromNow } from "../../utils/agoFromNow"
import { formatName } from "../../utils/formatName"
import { useStores } from "../../models"
import { useHooks } from "../hooks"
import { observer } from "mobx-react-lite"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { $flex1, $flexRow } from "../styles"
import { getIconForInteraction, handlingDeleteOnProfile, showAlertYesNo } from "../../utils/helpers"
import { defaultImages, messageMetadataType } from "../../utils"
import LinearGradient from "react-native-linear-gradient"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"
import NativeAdView from "../../utils/NativeAd"
import * as Haptics from "expo-haptics"
import { Host } from "react-native-portalize"

const Actions = observer(function ActionButtons({
  item,
  children,
}: {
  item: any
  children?: React.ReactNode
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
                  message: item?.topicContent || "",
                  title: item?.title || "",
                  url: `washzone://shared-topic/${item?._id}`,
                  type: messageMetadataType.sharedDiscussion,
                  attachment: item?.attachmentUrl || "",
                })
              }}
            />
          </View>
        </View>
        <View style={[$flexRow, $contentCenter]}>
          {children}
          <Icon icon="flag" size={20} onPress={flagTopic} />
        </View>
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



export const TopicComponent = observer(
  ({ topic, index, refreshParent }: { topic: any; index: number; refreshParent?: () => void }) => {
    const [loaded, setLoaded] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false)
    const {
      userStore: { _id },
      api: { mutateDeleteDetailTopicId },
      topics: { removeFromTopics },
      edit: { editTopic, mode },
    } = useStores()
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
    const isAuthorUser = topic?.userId?._id === _id

    const onDelete = () => {
      setMenuVisible(false)
      showAlertYesNo({
        message: "Are you sure you want to delete this discussion?",
        description: "This action cannot be undone.",
        onYesPress: async () => {
          const topicId = topic?._id

        mutateDeleteDetailTopicId({ topicId }, () => {
            handlingDeleteOnProfile('topic', topic)
            removeFromTopics(topicId)
            refreshParent && refreshParent()
          })
        },
      })
    }
    const onEdit = () => {
      setMenuVisible(false)
      setTimeout(() => editTopic(topic), 0)
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
                  <ShimmingImage
                    source={{
                      uri: topicDetails?.picture || defaultImages.profile,
                    }}
                    style={$picture}
                  />
                </TouchableOpacity>
                <View
                  style={[
                    $textContainer,
                    // eslint-disable-next-line react-native/no-inline-styles
                    { justifyContent: "center" },
                  ]}
                >
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
          <Actions item={topic}>
            {isAuthorUser && (
              <Menu
                data={[
                  {
                    title: "Edit",
                    icon: "note-edit",
                    onPress: onEdit,
                  },
                  {
                    title: "Delete",
                    icon: "delete",
                    onPress: onDelete,
                  },
                ]}
                setVisible={setMenuVisible}
                visible={menuVisible}
                anchorColor={colors.palette.neutral900}
                anchorIconSize={20}
                anchorContainer={{
                  height: 20,
                  width: 20,
                  marginRight: spacing.homeScreen,
                  transform: [{ rotate: "90deg" }],
                }}
              />
            )}
          </Actions>
        </Pressable>
        {index !== 0 && (index === 4 || (index - 4) % 15 === 0) && <NativeAdView />}
      </>
    )
  },
)

export const TopicComponentFullView = ({
  topic,
  additionalChildComponent,
  onLayout,
  refreshParent,
}: {
  topic: any
  additionalChildComponent?: React.ReactElement
  onLayout?: (e: LayoutChangeEvent) => void
  refreshParent?: () => void
}) => {
  const [loaded, setLoaded] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const windowWidth = Dimensions.get("window").width
  const {
    userStore: { _id },
    api: { mutateDeleteDetailTopicId },
    topics: { removeFromTopics },
    edit: { editTopic },
  } = useStores()

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
  const isAuthorUser = topicDetails.userID === _id

  const nativeAdViewRef = useRef<any>()

  useEffect(() => {
    if (nativeAdViewRef.current) {
      nativeAdViewRef.current.loadAd()
    }
  }, [nativeAdViewRef.current])

  const onDelete = () => {
    setMenuVisible(false)
    showAlertYesNo({
      message: "Are you sure you want to delete this topic?",
      description: "This action cannot be undone.",
      onYesPress: async () => {
        const topicId = topic?._id
       await mutateDeleteDetailTopicId({ topicId }, () => {
          removeFromTopics(topicId)
          navigationHome.goBack()
          refreshParent && refreshParent()
        })
      },
    })
  }

  const onEdit = () => {
    setMenuVisible(false)
    setTimeout(() => editTopic(topic), 0)
  }

  return (
    <>
      <View style={[$postContainer, $postParentContainer]} onLayout={onLayout}>
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
            <View
              style={[
                $textContainer,
                !isAuthorUser && $flexRow,
                // eslint-disable-next-line react-native/no-inline-styles
                !isAuthorUser && { alignItems: "center" },
              ]}
            >
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
      {additionalChildComponent}
      <NativeAdView />

      {isAuthorUser && (
        <Menu
          data={[
            {
              title: "Edit",
              icon: "note-edit",
              onPress: onEdit,
            },
            {
              title: "Delete",
              icon: "delete",
              onPress: onDelete,
            },
          ]}
          setVisible={setMenuVisible}
          visible={menuVisible}
          containerStyle={$verticalAbsoluteTop}
        />
      )}
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
