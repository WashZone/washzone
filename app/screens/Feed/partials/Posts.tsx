import React, { useEffect, useRef, useState } from "react"
import {
  Dimensions,
  FlatList,
  Pressable,
  RefreshControl,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { Text } from "../../../components"
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
import { NATIVE_AD_UNIT_ID } from "../../../utils/AppLovin"
import ShimmerPlaceHolder from "react-native-shimmer-placeholder"

// import NativeAdView from "../../../utils/NativeAd"
import { defaultImages, DEFAULT_LOADING } from "../../../utils"
import LinearGradient from "react-native-linear-gradient"

export interface PostComponentProps {
  post: any
  navigateOnPress?: boolean
  index: number
}

export const PostComponent = ({ post, navigateOnPress, index }: PostComponentProps) => {
  const size = Dimensions.get("window").width
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

  // useEffect(() => {
  //   if (nativeAdViewRef?.current) {
  //     nativeAdViewRef.current?.loadAd()
  //   }
  // }, [nativeAdViewRef.current])
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

        <Text style={$postContent} text={postDetails.content} />
        <ShimmerPlaceHolder
          visible={loaded}
          shimmerStyle={{
            height: windowWidth,
            width: windowWidth,
          }}
          LinearGradient={LinearGradient}
        >
          <FastImage
            style={[{ ...attachmentDimensions }, $bottomCurve]}
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
      </Pressable>
      {/* {index % 5 === 0 && (
        // <NativeAdView adUnitId={NATIVE_AD_UNIT_ID} ref={nativeAdViewRef} />
        // <AppLovinMAX.AdView
        //   adUnitId={MREC_AD_UNIT_ID}
        //   adFormat={AppLovinMAX.AdFormat.BANNER}
        //   style={$mrecStyle}
        // />
      )} */}
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

const postContainerRadius = 10

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
const $bottomCurve: ImageStyle = {
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
}

const $postContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  marginBottom: 10,
  width: "100%",
  borderRadius: postContainerRadius,
  justifyContent: "space-between",
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
