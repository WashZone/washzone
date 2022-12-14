import React, { useEffect, useState } from "react"
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

export interface PostComponentProps {
  post: any
  navigateOnPress?: boolean
}

export const PostComponent = ({ post, navigateOnPress }: PostComponentProps) => {
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
    picture: post?.UserId?.picture,
    first_name: post?.UserId?.first_name,
    last_name: post?.UserId?.last_name,
    attachmentUrl: post?.attachmentUrl,
    createdAt: post?.createdAt,
  }

  const windowWidth = Dimensions.get("window").width

  return (
    <Pressable style={$postContainer} onPress={onContainerPress}>
      <View style={$publisherInfoContainer}>
        <FastImage
          source={{
            uri: postDetails.picture || "https://edigitalcare.in/public/uploads/user-dummy.png",
          }}
          style={$picture}
        />
        <View style={$textContainer}>
          <Text
            text={formatName(postDetails.first_name + " " + postDetails.last_name)}
            preset="subheading2"
          />
          <Text text={fromNow(post.createdAt)} style={$agoStamp} />
        </View>
      </View>
      <Text style={$postContent} text={post.postContent} />
      <FastImage
        style={[{ ...attachmentDimensions }, $bottomCurve]}
        source={{ uri: postDetails.attachmentUrl }}
        onLoad={(res) =>
          setAttachmentDimensions({
            height: (windowWidth * res.nativeEvent.height) / res.nativeEvent.width,
            width: windowWidth,
          })
        }
      />
    </Pressable>
  )
}

export const Posts = observer(() => {
  const {
    feedStore: { feedPosts },
  } = useStores()
  const { refreshPosts, loadMorePosts } = useHooks()
  const [refreshing, setRefreshing] = useState<boolean>(false)

  useEffect(() => {
    refreshPosts()
  }, [])

  const onRefresh = () => {
    refreshPosts()
    setRefreshing(false)
  }

  return (
    <View style={{flex:1}}>
      <FlatList
        ListHeaderComponent={<Stories />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onEndReached={loadMorePosts}
        data={feedPosts}
        renderItem={({ item }) => (
          <PostComponent key={item?._id} post={item} navigateOnPress={true} />
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