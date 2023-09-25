import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  Alert,
  Dimensions,
  Pressable,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  LayoutChangeEvent,
  ActivityIndicator,
} from "react-native"
import {
  CustomFlatlist,
  Icon,
  LikesModal,
  Menu,
  ParsedTextComp,
  Text,
  $verticalAbsoluteTop,
} from "../../../components"
import { colors, spacing } from "../../../theme"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { formatName } from "../../../utils/formatName"
import { fromNow } from "../../../utils/agoFromNow"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Change, HomeTabParamList } from "../../../tabs"
import { observer } from "mobx-react-lite"
import { useHooks } from "../../hooks"
import { useStores } from "../../../models"
import { Stories } from "./Following"
import { $contentCenter, $flex1, $flexRow } from "../../styles"
import ShimmerPlaceHolder from "react-native-shimmer-placeholder"
import {
  getIconForInteraction,
  handlingDeleteOnProfile,
  showAlertYesNo,
} from "../../../utils/helpers"
import * as Haptics from "expo-haptics"
import Carousel, { Pagination } from "react-native-snap-carousel"

import NativeAdView from "../../../utils/NativeAd"

import { defaultImages, messageMetadataType } from "../../../utils"
import { ImageViewConfigType } from ".."
import LinearGradient from "react-native-linear-gradient"

import { AVPlaybackStatus, Video } from "expo-av"
import { navigationRef } from "../../../navigators"

export interface PostComponentProps {
  post: any
  navigateOnPress?: boolean
  index: number
  numberOfLines?: number
  setImageViewConfig: (t: ImageViewConfigType) => void
  additionalChildComponent?: React.ReactElement
  onLayout?: (e: LayoutChangeEvent) => void
  isViewable?: boolean
  refreshParent?: (id?: string) => void
}

const Actions = observer(function ActionButtons({ item }: { item: any }) {
  const [loading, setLoading] = useState<boolean>(false)
  const { interactWithHomePost } = useHooks()
  const [dynamicData, setDynamicData] = useState({
    interaction: item?.interaction,
    dislikeviews: item?.dislikeviews,
    likeviews: item?.likeviews,
  })
  const [isLikesModalVisible, setLikesModalVisible] = useState(false)

  const {
    api: { mutateFlagsOnFeed },
    userStore: { _id },
    share: { share },
  } = useStores()

  const flagPost = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    showAlertYesNo({
      message: "Flag " + item?.userId?.first_name + "'s post ?",
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

  useEffect(() => {
    setDynamicData({
      interaction: item?.interaction,
      dislikeviews: item?.dislikeviews,
      likeviews: item?.likeviews,
    })
  }, [item])

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
                  const res = await interactWithHomePost({
                    postId: item?._id,
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
                  const res = await interactWithHomePost({
                    postId: item?._id,
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
                const thumbnailUrl = item.attachmentUrl[0].thumbnailUrl
                const url = item.attachmentUrl[0].url
                share({
                  message: item?.content || "",
                  title: "",
                  url: `washzone://shared-post/${item?._id}`,
                  type: messageMetadataType.sharedPost,
                  attachment: thumbnailUrl ? thumbnailUrl : url || "",
                })
              }}
            />
          </View>
        </View>

        <Icon icon="flag" size={20} onPress={flagPost} />
      </View>
      <LikesModal
        key={item?._id}
        module="post"
        moduleId={item?._id}
        likesCount={dynamicData?.likeviews}
        isVisible={isLikesModalVisible}
        setVisible={setLikesModalVisible}
      />
    </>
  )
})

const CourouselItem = ({ item, index, onAttachmentsPress, inViewPort, currentItemActive }) => {
  const isVideo = item?.type?.startsWith("video")
  const [isLoaded, setLoaded] = useState(false)
  const [playing, setPlaying] = useState<boolean>(false)
  const [videoStatus, setVideoStatus] = useState<
    "not-playing" | "playing" | "buffering" | "notloaded"
  >("notloaded")
  const fullScreenTimer = useRef<NodeJS.Timeout>()
  const onPlay = () => setPlaying(true)

  const videoRef = useRef<Video>(null)

  const onError = (error) => {
    Alert.alert("An Error Occured", error)
  }

  const onPlayBackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!inViewPort) {
      clearTimeout(fullScreenTimer.current)
      fullScreenTimer.current = undefined
    }
    if (!currentItemActive) {
      videoRef.current.stopAsync()
      return
    }
    if (!status.isLoaded) {
      setVideoStatus("notloaded")

      // Update your UI for the unloaded state
    } else {
      // setLoaded(true)

      // Update your UI for the loaded state

      if (status.isPlaying) {
        setVideoStatus("playing")
        if (!fullScreenTimer.current)
        fullScreenTimer.current = setTimeout(() => videoRef.current._setFullscreen(true), 2000)

        // Update your UI for the playing state
      } else {
        setVideoStatus("not-playing")
      }
      if (status.didJustFinish) {
        // videoRef.current._setFullscreen(false)
      }

      if (status.isBuffering) {
        setVideoStatus("buffering")
      }
    }
  }


  return (
    <Pressable key={index} style={$carouselItem} onPress={isVideo ? onPlay : onAttachmentsPress}>
      <ShimmerPlaceHolder
        visible={isLoaded}
        shimmerStyle={$carouselItem}
        LinearGradient={LinearGradient}
        contentStyle={$contentCenter}
      >
        {isVideo ? (
          <>
            <Video
              key={item?.url + index}
              ref={(el) => (videoRef.current = el)} // Store reference
              onError={onError} // Callback when video cannot be loaded
              onLoad={(status) => {
                setLoaded(status.isLoaded)
              }}
              isLooping
              onPlaybackStatusUpdate={onPlayBackStatusUpdate}
              useNativeControls
              style={$flexFull}
              shouldPlay={inViewPort}
              usePoster
              posterSource={{ uri: item.thumbnailUrl }}
              source={{
                uri: item?.url,
              }}
            />
            {inViewPort ? (
              <>
                {videoStatus === "not-playing" && (
                  <View style={$playIcon}>
                    <Icon
                      icon="play"
                      size={32}
                      containerStyle={$playIcon}
                      color={colors.palette.neutral100}
                      onPress={() => videoRef.current.playAsync()}
                    />
                  </View>
                )}
                {videoStatus === "notloaded" ||
                  (videoStatus === "buffering" && (
                    <View style={$playIcon}>
                      <ActivityIndicator animating color={colors.palette.neutral100} />
                    </View>
                  ))}
              </>
            ) : (
              <View style={$playIcon}>
                <Icon
                  icon="play"
                  size={32}
                  containerStyle={$playIcon}
                  color={colors.palette.neutral100}
                  onPress={() => videoRef.current.playAsync()}
                />
              </View>
            )}
          </>
        ) : (
          <FastImage
            onLoadEnd={() => {
              setLoaded(true)
            }}
            source={{ uri: item.url }}
            style={$flexFull}
            resizeMode="contain"
          />
        )}
      </ShimmerPlaceHolder>
    </Pressable>
  )
}

export const PostComponent = ({
  post,
  navigateOnPress,
  index,
  numberOfLines,
  setImageViewConfig,
  onLayout,
  additionalChildComponent,
  isViewable,
  refreshParent,
}: PostComponentProps) => {
  const {
    userStore,
    api: { mutateDeleteDetailHomePageId },
    feedStore: { removeFromHomeFeed },
    edit: { editPost },
  } = useStores()

  const isAuthorUser = post?.userId?._id === userStore._id
  const SCREEN_WIDTH = Dimensions.get("screen").width

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMore, setShowMore] = useState(undefined)
  const [tempNumberOfLines, setTempNumberOfLines] = useState(undefined)
  const [optionsVisible, setOptionsVisible] = useState(false)

  const navigation = useNavigation<NavigationProp<HomeTabParamList>>()
  const onContainerPress = () => {
    if (navigateOnPress !== undefined && navigateOnPress) {
      navigation.navigate("PostInfo", {
        post,
      })
    }
  }

  const postDetails = {
    picture: post?.userId?.picture,
    first_name: post?.userId?.first_name,
    last_name: post?.userId?.last_name,
    attachmentUrl: post?.attachmentUrl,
    createdAt: post?.createdAt,
    content: post?.Discription,
  }

  const onAttachmentsPress = () => {
    const images = postDetails.attachmentUrl?.map((i, index) => {
      return { id: index, uri: i }
    })

    setImageViewConfig({
      images,
      currentIndex,
      show: true,
    })
  }

  useEffect(() => {
    showMore && setTempNumberOfLines(numberOfLines)
  }, [showMore])

  const onTextLayout = useCallback((e) => {
    if (showMore === undefined && tempNumberOfLines === undefined) {
      numberOfLines &&
        e.nativeEvent.lines.length > numberOfLines &&
        setShowMore(e.nativeEvent.lines.length > numberOfLines)
    }
  }, [])

  const onEdit = () => {
    setOptionsVisible(false)
    setTimeout(() => editPost(post), 0)
  }

  const onDelete = async () => {
    setOptionsVisible(false)
    showAlertYesNo({
      message: "Are you sure you want to delete this post?",
      description: "This action cannot be undone.",
      onYesPress: async () => {
        const postId = post?._id
        removeFromHomeFeed(postId)
        handlingDeleteOnProfile("post", postId)
        await mutateDeleteDetailHomePageId({ homePageId: postId }, refreshParent && refreshParent)
      },
    })
  }

  return (
    <>
      <View key={post?._id} style={$postContainer} onLayout={onLayout}>
        <Pressable onPress={onContainerPress} style={$publisherInfoContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile", { user: post?.userId })}>
            <FastImage
              source={{
                uri: postDetails.picture || defaultImages.profile,
              }}
              style={$picture}
            />
          </TouchableOpacity>
          <View style={$textContainer}>
            <Text
              text={formatName(postDetails?.first_name + " " + postDetails?.last_name)}
              preset="subheading2"
            />
            <Text text={fromNow(post?.createdAt)} style={$agoStamp} />
          </View>
        </Pressable>
        <Pressable onPress={onContainerPress}>
          <ParsedTextComp
            style={$postContent}
            numberOfLines={tempNumberOfLines}
            onTextLayout={onTextLayout}
            text={postDetails.content}
            size="xs"
          />
        </Pressable>
        {showMore && tempNumberOfLines && (
          <TouchableOpacity onPress={() => setTempNumberOfLines(undefined)}>
            <Text
              size="xxs"
              weight="bold"
              style={{ marginLeft: spacing.homeScreen }}
              color={colors.palette.primary100}
              text={"Read More"}
            />
          </TouchableOpacity>
        )}
        <View style={{ backgroundColor: colors.palette.overlayNeutral50 }}>
          <Carousel
            pagingEnabled
            pinchGestureEnabled
            data={post.attachmentUrl}
            firstItem={0}
            layout={"default"}
            renderItem={({ item, index }) => (
              <CourouselItem
                inViewPort={isViewable}
                onAttachmentsPress={onAttachmentsPress}
                item={item}
                index={index}
                currentItemActive={currentIndex === index}
              />
            )}
            onSnapToItem={(ind) => setCurrentIndex(ind)}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH}
          />

          <Pagination
            activeDotIndex={currentIndex}
            dotsLength={postDetails.attachmentUrl?.length}
            renderDots={(activeIndex, total) => {
              return (
                <View
                  style={[
                    $flexRow,

                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      padding: 5,
                      backgroundColor: colors.palette.overlayNeutral50,
                      borderRadius: 10,
                    },
                  ]}
                >
                  {[...Array(total).keys()].map((i, index) => (
                    <View
                      key={index}
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{
                        height: 6,
                        width: 6,
                        borderRadius: 3,
                        marginHorizontal: 3,
                        backgroundColor:
                          activeIndex === index
                            ? colors.palette.primary100
                            : colors.palette.neutral100,
                      }}
                    />
                  ))}
                </View>
              )
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            containerStyle={{
              position: "absolute",
              bottom: -10,
              justifyContent: "center",
              width: "100%",
            }}
          />
        </View>
        <Actions item={post} />
      </View>
      {additionalChildComponent}
      {index !== 0 && (index === 4 || (index - 4) % 15 === 0) && (
        <>
          <NativeAdView />
        </>
      )}
      {isAuthorUser && (
        <Menu
          visible={optionsVisible}
          setVisible={setOptionsVisible}
          data={[
            { title: "Edit", onPress: onEdit, icon: "note-edit" },
            { title: "Delete", onPress: onDelete, icon: "delete" },
          ]}
          containerStyle={$verticalAbsoluteTop}
        />
      )}
    </>
  )
}

export const Posts = observer(
  ({ setImageViewConfig }: { setImageViewConfig: (t: ImageViewConfigType) => void }) => {
    const {
      feedStore: { homeFeed },
    } = useStores()
    const { refreshHomeFeed, loadMoreHomeFeed, getActivities } = useHooks()

    const [viewableIndexes, setViewableIndexes] = useState([])

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
      setViewableIndexes(viewableItems.map((item) => item.index))
    }, [])

    useEffect(() => {
      refreshHomeFeed()
    }, [])

    const onRefresh = async () => {
      await refreshHomeFeed()
      await getActivities()
    }

    return (
      <View style={$flex1}>
        <CustomFlatlist
          ListHeaderComponent={<Stories />}
          customRefresh={onRefresh}
          onEndReached={loadMoreHomeFeed}
          data={homeFeed}
          removeClippedSubviews
          viewabilityConfig={{
            waitForInteraction: false,
            // viewAreaCoveragePercentThreshold: 60,
            itemVisiblePercentThreshold: 90,
          }}
          onViewableItemsChanged={onViewableItemsChanged}
          renderItem={({ item, index }) => (
            <PostComponent
              setImageViewConfig={setImageViewConfig}
              numberOfLines={7}
              key={item?._id}
              post={item}
              navigateOnPress={true}
              index={index}
              isViewable={viewableIndexes.includes(index)}
            />
          )}
        />
      </View>
    )
  },
)

const $flexFull = { height: "100%", width: "100%" }

const $playIcon: ViewStyle = {
  width: 54,
  height: 54,
  borderRadius: 27,
  position: "absolute",
  shadowColor: colors.palette.overlayNeutral10050,
  backgroundColor: colors.palette.primary100,
  shadowOpacity: 1,
  shadowOffset: { height: 4, width: 2 },
  ...$contentCenter,
}

const $carouselItem = {
  width: Dimensions.get("window").width,
  height: 300,
}

const $postContent: TextStyle = {
  marginHorizontal: spacing.homeScreen,
  lineHeight: 20,
}

const $agoStamp: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral500,
}

const $postContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  // backgroundColor:'red',
  // marginTop: 6,
  marginBottom: 6,
  width: "100%",
  justifyContent: "space-between",
}

const $publisherInfoContainer: ViewStyle = {
  height: 68,
  width: "100%",
  alignItems: "center",
  flexDirection: "row",
  padding: spacing.homeScreen,
}

const $textContainer: ViewStyle = {
  justifyContent: "space-around",
  height: "90%",
}

const $picture: ImageStyle = {
  height: 40,
  width: 40,
  borderRadius: 20,
  marginRight: spacing.homeScreen,
}

const $actionContainer: ViewStyle = {
  width: 60,
  alignItems: "center",
  justifyContent: "flex-start",
  flexDirection: "row",
}

const $actionsContainer: ViewStyle = {
  flexDirection: "row",
  padding: spacing.medium,
  zIndex: 999,
  justifyContent: "space-between",
}
