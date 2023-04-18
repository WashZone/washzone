import React, { FC, useEffect, useState } from "react"
import { FlatList, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { CommentInput, Icon, Screen } from "../../components"
import { colors, spacing } from "../../theme"
import { HomeTabProps } from "../../tabs/Home"
import { PostComponent } from "../Feed/partials"
import { MediaPicker } from "../../utils/device/MediaPicker"
import { useHooks } from "../hooks"
import { useStores } from "../../models"
import { CommentComponent } from "../TopicInfo/Comments"
import Loading from "../../components/Loading"

export const PostInfo: FC<HomeTabProps<"PostInfo">> = function PostInfo(props) {
  const { post } = props.route.params

  const [comments, setComments] = useState<Array<any>>([])

  const [postDetails, setPostDetails] = useState<any>(post)
  const [loading, setLoading] = useState<boolean>(typeof post === "string")
  const {
    userStore: { _id },
    api: { mutateGetHomePagesById },
  } = useStores()
  const { getCommentsOnHomePagePost, postCommentOnHomePagePost } = useHooks()

  const handelPost = async () => {
    setLoading(true)
    if (typeof post === "string") {
      const res = await mutateGetHomePagesById({ homePageId: post, callerId: _id })
      const topicData = res.getHomePagesById?.data.length === 1 && res.getHomePagesById?.data[0]
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

  const onComment = async (commentText, selectedMedia) => {
    await postCommentOnHomePagePost(commentText, selectedMedia, postDetails?._id)
    await syncComments(postDetails?._id)
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

      <CommentInput createComment={onComment} />
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
