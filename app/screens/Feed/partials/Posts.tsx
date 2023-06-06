import React, { useCallback, useEffect, useRef, useState } from "react"
import { Alert, Dimensions, Pressable, Share, TextStyle, View, ViewStyle } from "react-native"
import { AutoImage, CustomFlatlist, Icon, ParsedTextComp, Text } from "../../../components"
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
import Video from "react-native-video"
import Carousel, { Pagination } from "react-native-snap-carousel"

import NativeAdView from "../../../utils/NativeAd"

import { defaultImages } from "../../../utils"
import LinearGradient from "react-native-linear-gradient"
import { ImageViewConfigType } from ".."
import { ImageSource } from "react-native-image-viewing/dist/@types"
import { TouchableOpacity } from "react-native-gesture-handler"

const testAttachments = [
  {
    id: 1,
    mediaType: "image",
    imgUrl:
      "https://images.unsplash.com/photo-1473177027534-53d906e9abcf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80",
  },

  {
    id: 2,
    mediaType: "image",
    imgUrl:
      "data:image/jpeg;base64,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",
  },
]

export interface PostComponentProps {
  post: any
  navigateOnPress?: boolean
  index: number
  numberOfLines?: number
  setImageViewConfig: (t: ImageViewConfigType) => void
}
const Actions = observer(function ActionButtons({ item }: { item: any }) {
  const [loading, setLoading] = useState<boolean>(false)
  const { interactWithHomePost } = useHooks()
  const [dynamicData, setDynamicData] = useState({
    interaction: item?.interaction,
    dislikeviews: item?.dislikeviews,
    likeviews: item?.likeviews,
  })
  const {
    api: { mutateFlagsOnFeed },
    userStore: { _id },
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

    console.log("FLAGGING POST : ", item?._id)
  }

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

              Share.share({ message: "", title: "", url: `washzone://shared-post/${item?._id}` })
            }}
          />
        </View>
      </View>

      <Icon icon="flag" size={20} onPress={flagPost} />
    </View>
  )
})

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

  const windowWidth = Dimensions.get("window").width

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

  const CourouselItem = ({ item, index }) => {
    const [loaded, setLoaded] = useState(true)
    console.log("CourouselItem : ITEM", item)
    return (
      <Pressable key={index} onPress={onAttachmentsPress}>
        <ShimmerPlaceHolder visible={loaded} shimmerStyle={$carouselItem}>
          <FastImage
            onLoadEnd={() => setLoaded(true)}
            source={{ uri: item }}
            style={$carouselItem}
            resizeMode="contain"
          />
        </ShimmerPlaceHolder>
        {/* <FastImage source={{ uri: item.imgUrl }} resizeMode={"cover"} style={{ width: SCREEN_WIDTH, height: 240 }} /> */}
      </Pressable>
    )
  }

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
        <Pressable 
          onPress={onContainerPress}
          >
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
        {/* {postDetails?.attachmentUrl && (
          <ShimmerPlaceHolder
            visible={loaded}
            shimmerStyle={{
              marginTop: spacing.extraSmall,
              height: windowWidth,
              width: windowWidth,
            }}
            LinearGradient={LinearGradient}
          >
            <FastImage
              style={[attachmentDimensions, { marginTop: spacing.extraSmall }]}
              source={{ uri: postDetails?.attachmentUrl }}
              onLoadStart={() => console.log("LOADINGGGG STARTED")}
              resizeMode={FastImage.resizeMode.stretch}
              onLoad={(res) => {
                console.log("ONLOAD POST ATTACHMENT", res.nativeEvent)
                setAttachmentDimensions({
                  height: (windowWidth * res.nativeEvent.height) / res.nativeEvent.width,
                  width: windowWidth,
                })
              }}
              onLoadEnd={() => {
                setLoaded(true)
              }}
            />
          </ShimmerPlaceHolder>
        )} */}
        <View>
          <Carousel
            pagingEnabled
            pinchGestureEnabled
            //  ref={(c) => { this._carousel = c; }}
            data={postDetails.attachmentUrl}
            firstItem={0}
            // autoplay={true}
            layout={"default"}
            // loop={true}
            renderItem={({ item, index }) => <CourouselItem item={item} index={index} />}
            onSnapToItem={(ind) => setCurrentIndex(ind)}
            //  loopClonesPerSide={bannersDataLength}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH}
          />

          <Pagination
            activeDotIndex={currentIndex}
            dotsLength={postDetails.attachmentUrl.length}
            renderDots={(activeIndex, total) => {
              console.log('activeIndex', activeIndex)
              console.log('total', total)

              return <View style={[$flexRow, { padding: 5, backgroundColor: colors.palette.overlayNeutral50, borderRadius: 10 }]}>
                {
                  [...Array(total).keys()].map((i, index) => (
                    <View
                      key={index}
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{
                        height: 6,
                        width: 6,
                        borderRadius: 3,
                        marginHorizontal: 3,
                        backgroundColor:
                          activeIndex === index ? colors.palette.primary100 : colors.palette.neutral100,
                      }}
                    />
                  ))}
              </View>
            }
            }
            containerStyle={{ position: 'absolute', bottom: -10, justifyContent: 'center', width: '100%' }}
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
    const { refreshHomeFeed, loadMoreHomeFeed, loadStories } = useHooks()
    useEffect(() => {
      refreshHomeFeed()
      loadStories()
    }, [])

    const onRefresh = async () => {
      await refreshHomeFeed()
      await loadStories()
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
  marginBottom: 10,
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
