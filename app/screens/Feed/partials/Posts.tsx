import React, { useEffect, useRef, useState } from "react"
import {
  Dimensions,
  FlatList,
  Pressable,
  RefreshControl,
  TextStyle,
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
import NativeAdView from "../../../utils/NativeAd"

export interface TopicComponentProps {
  topic: any
  navigateOnPress?: boolean
  index: number
}

export const PostComponent = ({ topic, navigateOnPress, index }: TopicComponentProps) => {
  const [attachmentDimensions, setAttachmentDimensions] = useState({ height: 0, width: 0 })
  const navigation = useNavigation<NavigationProp<HomeTabParamList>>()
  const onContainerPress = () => {
    if (navigateOnPress !== undefined && navigateOnPress) {
      navigation.navigate("TopicInfo", {
        topic,
      })
    }
  }

  const topicDetails = {
    picture: topic?.UserId?.picture,
    first_name: topic?.UserId?.first_name,
    last_name: topic?.UserId?.last_name,
    attachmentUrl: topic?.attachmentUrl,
    createdAt: topic?.createdAt,
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
      <Pressable style={$postContainer} onPress={onContainerPress}>
        <View style={$publisherInfoContainer}>
          <Pressable onPress={() => navigation.navigate("Profile", { user: topic?.UserId })}>
            <FastImage
              source={{
                uri:
                  topicDetails.picture || "https://edigitalcare.in/public/uploads/user-dummy.png",
              }}
              style={$picture}
            />
          </Pressable>
          <View style={$textContainer}>
            <Text
              text={formatName(topicDetails?.first_name + " " + topicDetails?.last_name)}
              preset="subheading2"
            />
            <Text text={fromNow(topic?.createdAt)} style={$agoStamp} />
          </View>
        </View>
        <Text style={$postContent} text={topic?.topicContent} />
        <FastImage
          style={[{ ...attachmentDimensions }, $bottomCurve]}
          source={{ uri: topicDetails.attachmentUrl }}
          onLoad={(res) =>
            setAttachmentDimensions({
              height: (windowWidth * res.nativeEvent.height) / res.nativeEvent.width,
              width: windowWidth,
            })
          }
        />
      </Pressable>
      {index % 5 === 0 && (
        <NativeAdView adUnitId={NATIVE_AD_UNIT_ID} ref={nativeAdViewRef} />
        // <AppLovinMAX.AdView
        //   adUnitId={MREC_AD_UNIT_ID}
        //   adFormat={AppLovinMAX.AdFormat.BANNER}
        //   style={$mrecStyle}
        // />
      )}
    </>
  )
}

export const Posts = observer(() => {
  const {
    topics: { topics },
  } = useStores()
  const { refreshTopics, loadMoreTopics, loadStories } = useHooks()
  const [refreshing, setRefreshing] = useState<boolean>(false)
  console.log("TOPICS LENGTH", topics?.length)
  useEffect(() => {
    refreshTopics()
    loadStories()
  }, [])

  const onRefresh = () => {
    refreshTopics()
    setRefreshing(false)
  }

  return (
    <View style={$flex1}>
      <FlatList
        ListHeaderComponent={<Stories />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onEndReached={loadMoreTopics}
        data={topics}
        renderItem={({ item, index }) => (
          <PostComponent key={item?._id} topic={item} navigateOnPress={true} index={index} />
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
