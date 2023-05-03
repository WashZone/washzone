import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  Alert,
  Dimensions,
  Pressable,
  Share,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { CustomFlatlist, Icon, Text } from "../../../components"
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
import { $flex1, $flexRow } from "../../styles"
import ShimmerPlaceHolder from "react-native-shimmer-placeholder"
import { getIconForInteraction, showAlertYesNo } from "../../../utils/helpers"
import * as Haptics from 'expo-haptics';

import NativeAdView from "../../../utils/NativeAd"

import { defaultImages } from "../../../utils"
import LinearGradient from "react-native-linear-gradient"
import { toastMessages } from "../../../utils/toastMessages"

export interface PostComponentProps {
  post: any
  navigateOnPress?: boolean
  index: number
  numberOfLines?: number
}
const Actions = observer(function ActionButtons({ item }: { item: any }) {
  const [loading, setLoading] = useState<boolean>(false)
  const { interactWithHomePost } = useHooks()
  const [dynamicData, setDynamicData] = useState({
    interaction: item?.interaction,
    dislikeviews: item?.dislikeviews,
    likeviews: item?.likeviews,
  })
  const { api: { mutateFlagsOnFeed }, userStore: { _id } } = useStores()

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
            type: 'post',
            postId: item?._id
          })
          Alert.alert('Success!', 'We will review the flagged content within 24 hours.')
        }
        catch (err) {
          Alert.alert(err?.response?.errors?.[0]?.message)
        }

      }
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
            }
            }
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
}: PostComponentProps) => {
  const [loaded, setLoaded] = useState(false)
  const [showMore, setShowMore] = useState(undefined)
  const [tempNumberOfLines, setTempNumberOfLines] = useState(undefined)

  const windowWidth = Dimensions.get("window").width

  const [attachmentDimensions, setAttachmentDimensions] = useState({
    height: windowWidth,
    width: windowWidth,
  })
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
      <Pressable onPress={onContainerPress} style={$postContainer}>
        <View style={$publisherInfoContainer}>
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
        </View>

        <Text
          style={$postContent}
          numberOfLines={tempNumberOfLines}
          onTextLayout={onTextLayout}
          text={postDetails.content}
          size="xs"
        />
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
        {postDetails?.attachmentUrl && (
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
        )}
        <Actions item={post} />
      </Pressable>
      {index % 5 === 0 && (
        <>
          <NativeAdView />
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
        renderItem={({ item, index }) => (
          <PostComponent
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
})

const $postContent: TextStyle = {
  // fontSize: 13,
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
  justifyContent: 'space-between',
}
