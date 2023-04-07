import React, { useEffect, useRef, useState } from "react"
import {
  Dimensions,
  FlatList,
  Pressable,
  RefreshControl,
  Share,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Icon, Text } from "../../../components"
import { colors, spacing } from "../../../theme"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { formatName } from "../../../utils/formatName"
import { fromNow } from "../../../utils/agoFromNow"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { HomeTabParamList } from "../../../tabs"
import { observer } from "mobx-react-lite"
import { useHooks } from "../../hooks"
import { useStores } from "../../../models"
import { Stories } from "./Stories"
import { $flex1 } from "../../styles"
import { MREC_AD_UNIT_ID, NATIVE_AD_UNIT_ID } from "../../../utils/AppLovin"
import ShimmerPlaceHolder from "react-native-shimmer-placeholder"
import { getIconForInteraction } from "../../../utils/helpers"

import NativeAdView from "../../../utils/NativeAd"
import AppLovinMAX from "react-native-applovin-max/src/index"

import { defaultImages } from "../../../utils"
import LinearGradient from "react-native-linear-gradient"

export interface PostComponentProps {
  post: any
  navigateOnPress?: boolean
  index: number
}
const Actions = observer(function ActionButtons({ item }: { item: any }) {
  const [loading, setLoading] = useState<boolean>(false)
  const { interactWithHomePost } = useHooks()
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
          icon="share"
          size={25}
          onPress={() =>
            Share.share({ message: "", title: "", url: `washzone://shared-post/${item?._id}` })
          }
        />
      </View>
    </View>
  )
})

export const PostComponent = ({ post, navigateOnPress, index }: PostComponentProps) => {
  const [loaded, setLoaded] = useState(false)
  const [attachmentDimensions, setAttachmentDimensions] = useState({ height: 0, width: 0 })
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

  const windowWidth = Dimensions.get("window").width

  const nativeAdViewRef = useRef<any>()

  useEffect(() => {
    if (nativeAdViewRef?.current) {
      nativeAdViewRef.current?.loadAd()
    }
  }, [nativeAdViewRef.current])
  return (
    <>
      <Pressable onPress={onContainerPress} style={$postContainer}>
        <View style={$publisherInfoContainer}>
          <Pressable onPress={() => navigation.navigate("Profile", { user: post?.userId })}>
            <FastImage
              source={{
                uri: postDetails.picture || defaultImages.profile,
              }}
              style={$picture}
            />
          </Pressable>
          <View style={$textContainer}>
            <Text
              text={formatName(postDetails?.first_name + " " + postDetails?.last_name)}
              preset="subheading2"
            />
            <Text text={fromNow(post?.createdAt)} style={$agoStamp} />
          </View>
        </View>

        <Text style={$postContent} text={postDetails.content} size="xs" />
        <ShimmerPlaceHolder
          visible={loaded}
          shimmerStyle={{
            height: windowWidth,
            width: windowWidth,
          }}
          LinearGradient={LinearGradient}
        >
          <FastImage
            style={attachmentDimensions}
            source={{ uri: postDetails.attachmentUrl }}
            onLoad={(res) => {
              setAttachmentDimensions({
                height: (windowWidth * res.nativeEvent.height) / res.nativeEvent.width,
                width: windowWidth,
              })
            }}
            onLoadEnd={() => setLoaded(true)}
          />
        </ShimmerPlaceHolder>
        <Actions item={post} />
      </Pressable>
      {index % 5 === 0 && (
        <>
          <NativeAdView ref={nativeAdViewRef} />
          {/* <AppLovinMAX.AdView
          adUnitId={MREC_AD_UNIT_ID}
          adFormat={AppLovinMAX.AdFormat.BANNER}
          // style={$mrecStyle}
        ></AppLovinMAX.AdView> */}
        </>
      )}
    </>
  )
}

export const Posts = observer(() => {
  const {
    feedStore: { homeFeed },
  } = useStores()
  const { refreshHomeFeed, loadMoreHomeFeed, loadStories } = useHooks()
  const [refreshing, setRefreshing] = useState<boolean>(false)
  useEffect(() => {
    refreshHomeFeed()
    loadStories()
  }, [])

  const onRefresh = () => {
    refreshHomeFeed()
    loadStories()
    setRefreshing(false)
  }

  return (
    <View style={$flex1}>
      <FlatList
        ListHeaderComponent={<Stories />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.palette.primary100}
          />
        }
        onEndReached={loadMoreHomeFeed}
        data={homeFeed}
        renderItem={({ item, index }) => (
          <PostComponent key={item?._id} post={item} navigateOnPress={true} index={index} />
        )}
      />
    </View>
  )
})

const $postContent: TextStyle = {
  // fontSize: 13,
  marginHorizontal: spacing.homeScreen,
  marginBottom: spacing.homeScreen,
  lineHeight: 20,
}

const $agoStamp: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral500,
}
const $bottomCurve: ImageStyle = {
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
}

const $postContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  marginBottom: 10,
  width: "100%",
  // borderRadius: postContainerRadius,
  justifyContent: "space-between",
}

const $publisherInfoContainer: ViewStyle = {
  height: 68,
  width: "100%",
  // borderRadius: 20,
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
}
