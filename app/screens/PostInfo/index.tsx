import React, { FC, useEffect, useState } from "react"
import { FlatList, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { Icon, Screen } from "../../components"
import { colors, spacing } from "../../theme"
import { HomeTabProps } from "../../tabs/Home"
import { PostComponent } from "../Feed/partials"
import { MediaPicker } from "../../utils/device/MediaPicker"
import { useHooks } from "../hooks"
import { useStores } from "../../models"
import { ActivityIndicator } from "react-native-paper"
import FastImage from "react-native-fast-image"
import { CommentComponent } from "../TopicInfo/Comments"
import Loading from "../../components/Loading"

export const PostInfo: FC<HomeTabProps<"PostInfo">> = function PostInfo(props) {
  const { post } = props.route.params
  const [commentText, setCommentText] = useState<string>("")
  const [comments, setComments] = useState<Array<any>>([])
  const [selectedMedia, setSelectedMedia] = useState<any>()
  const [isCommenting, setIsCommenting] = useState<boolean>(false)
  const [postDetails, setPostDetails] = useState<any>(post)
  const [loading, setLoading] = useState<boolean>(typeof post === "string")
  const {
    api: { mutateGetHomePagesByHomePageId },
  } = useStores()
  const { getCommentsOnHomePagePost, postCommentOnHomePagePost } = useHooks()

  const handelPost = async () => {
    setLoading(true)
    if (typeof post === "string") {
      const res = await mutateGetHomePagesByHomePageId({ homePageId: post })
      const topicData =
        res.getHomePagesByHomePageId?.data.length === 1 && res.getHomePagesByHomePageId?.data[0]
      setPostDetails(topicData)
      await syncComments(topicData?._id)
      setLoading(false)
    } else {
      await syncComments(postDetails?._id)
      setLoading(false)
    }
  }

  useEffect(() => {
    handelPost()
  }, [post])

  async function syncComments(id: string) {
    const data = await getCommentsOnHomePagePost(id)
    setComments(data || [])
  }

  const onComment = async () => {
    setIsCommenting(true)
    await postCommentOnHomePagePost(commentText, selectedMedia, postDetails?._id)
    await syncComments(postDetails?._id)
    setCommentText("")
    setSelectedMedia(undefined)
    setIsCommenting(false)
  }

  const onAddImage = async () => {
    const res = await MediaPicker()
    setSelectedMedia(res)
  }

  if (loading) {
    return <Loading />
  }
  return (
    <Screen preset="fixed" keyboardOffset={-180} contentContainerStyle={$container}>
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentComponent comment={item} key={item?._id} />}
        style={$contentContainer}
        ListHeaderComponent={<PostComponent post={postDetails} index={0} />}
      />

      {selectedMedia && (
        <View style={{ position: "absolute", bottom: 54 }}>
          <FastImage
            source={{ uri: selectedMedia?.uri }}
            style={{ height: 100, width: 100, borderRadius: 10 }}
          />
          <Icon
            icon="x"
            size={20}
            onPress={() => setSelectedMedia(undefined)}
            containerStyle={$iconXContainer}
            disabled={isCommenting}
          />
        </View>
      )}
      <View style={$postCommentContainer}>
        <Icon icon="addImage" disabled={isCommenting} size={28} onPress={onAddImage} />
        <TextInput
          value={commentText}
          onChangeText={setCommentText}
          placeholder="Write a comment!"
          placeholderTextColor={colors.palette.overlay50}
          style={$commentInput}
        />
        <View style={$rightIconContainer}>
          {isCommenting ? (
            <ActivityIndicator animating />
          ) : (
            <Icon
              icon="send"
              size={28}
              onPress={onComment}
              color={commentText.length > 1 ? colors.palette.primary100 : colors.palette.neutral400}
            />
          )}
        </View>
      </View>
    </Screen>
  )
}

const $iconXContainer: ViewStyle = {
  height: 24,
  width: 24,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 8,
  backgroundColor: colors.background,
  position: "absolute",
  top: -5,
  left: 85,
}

const $rightIconContainer: ViewStyle = {
  width: 28,
}

const $commentInput: TextStyle = {
  flex: 1,
  height: 48,
  backgroundColor: colors.background,
  marginHorizontal: 10,
  borderRadius: 24,
  paddingHorizontal: 10,
}

const $postCommentContainer: ViewStyle = {
  height: 54,
  flexDirection: "row",
  paddingHorizontal: spacing.medium,
  backgroundColor: colors.palette.neutral100,
  alignItems: "center",
}

const $loadingScreen: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}
// const $rightIconContainer: ViewStyle = {
//   width: 28,
// }

// const $commentInput: TextStyle = {
//   flex: 1,
//   height: 48,
//   backgroundColor: colors.background,
//   marginHorizontal: 10,
//   borderRadius: 24,
//   paddingHorizontal: 10,
// }

const $container: ViewStyle = {
  flex: 1,
}

const $contentContainer: ViewStyle = {
  flex: 1,
}

// const $postCommentContainer: ViewStyle = {
//   height: 54,
//   flexDirection: "row",
//   paddingHorizontal: spacing.medium,
//   backgroundColor: colors.palette.neutral100,
//   alignItems: "center",
// }
