import React, { useCallback, useEffect, useState } from "react"
import { Alert, Dimensions, Pressable, TextStyle, View, ViewStyle, TouchableOpacity } from "react-native"
import {
  CustomFlatlist,
  Icon,
  LikesModal,
  ParsedTextComp,
  Text,
} from "../../../components"
import { colors, spacing } from "../../../theme"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { formatName } from "../../../utils/formatName"
import { fromNow } from "../../../utils/agoFromNow"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { HomeTabParamList } from "../../../tabs"
import { observer } from "mobx-react-lite"
import { useHooks } from "../../hooks"
import { useStores } from "../../../models"
import { Stories } from "./Following"
import { $flex1, $flexRow } from "../../styles"
import ShimmerPlaceHolder from "react-native-shimmer-placeholder"
import { getIconForInteraction, showAlertYesNo } from "../../../utils/helpers"
import * as Haptics from "expo-haptics"
import Carousel, { Pagination } from "react-native-snap-carousel"

import NativeAdView from "../../../utils/NativeAd"

import { defaultImages, messageMetadataType } from "../../../utils"
import { ImageViewConfigType } from ".."
import LinearGradient from "react-native-linear-gradient"

export interface PostComponentProps {
  post: any
  navigateOnPress?: boolean
  index: number
  numberOfLines?: number
  setImageViewConfig: (t: ImageViewConfigType) => void
}
const Actions = observer(function ActionButtons({
  item,

}: {
  item: any

}) {
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
                share({
                  message: item?.content || '',
                  title: '',
                  url: `washzone://shared-post/${item?._id}`,
                  type: messageMetadataType.sharedPost,
                  attachment: item?.attachmentUrl?.[0] || ''
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


const CourouselItem = ({ item, index, onAttachmentsPress }) => {
  const [isLoaded, setLoaded] = useState(false)
  return (
    <Pressable key={index} onPress={onAttachmentsPress}>
      <ShimmerPlaceHolder visible={isLoaded} shimmerStyle={$carouselItem} LinearGradient={LinearGradient}>
        <FastImage
          onLoadEnd={() => { setLoaded(true); }}
          source={{ uri: item }}
          style={$carouselItem}
          resizeMode="contain"
        />
      </ShimmerPlaceHolder>
      {/* <FastImage source={{ uri: item.imgUrl }} resizeMode={"cover"} style={{ width: SCREEN_WIDTH, height: 240 }} /> */}
    </Pressable>
  )
}
export const PostComponent = ({
  post,
  navigateOnPress,
  index,
  numberOfLines,
  setImageViewConfig,
}: PostComponentProps) => {
  const SCREEN_WIDTH = Dimensions.get("screen").width

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMore, setShowMore] = useState(undefined)
  const [tempNumberOfLines, setTempNumberOfLines] = useState(undefined)


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
    const images = postDetails.attachmentUrl.map((i, index) => {
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



  return (
    <>
      <View style={$postContainer}>
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
          <Text
            size="xxs"
            weight="bold"
            style={{ marginLeft: spacing.homeScreen }}
            color={colors.palette.primary100}
            text={"Read More"}
            onPress={() => setTempNumberOfLines(undefined)}
          />
        )}
        <View style={{ backgroundColor: colors.palette.overlayNeutral50 }}>
          <Carousel
            pagingEnabled
            pinchGestureEnabled
            //  ref={(c) => { this._carousel = c; }}
            data={postDetails.attachmentUrl}
            firstItem={0}
            // autoplay={true}
            layout={"default"}
            // loop={true}
            renderItem={({ item, index }) => <CourouselItem onAttachmentsPress={onAttachmentsPress} item={item} index={index} />}
            onSnapToItem={(ind) => setCurrentIndex(ind)}
            //  loopClonesPerSide={bannersDataLength}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH}
          />

          <Pagination
            activeDotIndex={currentIndex}
            dotsLength={postDetails.attachmentUrl.length}
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
      {index % 5 === 0 && (
        <>
          <NativeAdView />
        </>
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
          renderItem={({ item, index }) => (
            <PostComponent
              setImageViewConfig={setImageViewConfig}
              numberOfLines={7}
              key={item?._id}
              post={item}
              navigateOnPress={true}
              index={index}
            />
          )}
        />
      </View>
    )
  },
)

const $carouselItem: ImageStyle = { width: Dimensions.get("window").width, height: 300 }

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
  marginTop: 6,
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
