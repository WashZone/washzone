import React, { FC, useEffect, useState } from "react"
import { ScrollView,  View, ViewStyle } from "react-native"
import {  Screen } from "../../components"
import { colors } from "../../theme"
import { HomeTabProps } from "../../tabs/Home"
import { PostComponent } from "../Feed/partials"
// import { Capture } from "../../utils/device/MediaPicker"
// import { useHooks } from "../hooks"
import { useStores } from "../../models"
import { ActivityIndicator } from "react-native-paper"

export const PostInfo: FC<HomeTabProps<"PostInfo">> = function PostInfo(props) {
  const { post } = props.route.params
  // const [commentText, setCommentText] = useState<string>("")
  // const { postComment, getCommentsOnPost } = useHooks()
  // const [comments, setComments] = useState<Array<any>>([])
  // const [isCommenting, setIsCommenting] = useState<boolean>(false)
  const [postDetails, setPostDetails] = useState<any>(post)
  const [loading, setLoading] = useState<boolean>(typeof post === "string")
  const {
    api: { mutateGetHomePagesByHomePageId },
  } = useStores()

  const handelPost = async () => {
    setLoading(true)
    if (typeof post === "string") {
      const res = await mutateGetHomePagesByHomePageId({ homePageId: post })
      const topicData = res.getHomePagesByHomePageId?.data.length === 1 && res.getHomePagesByHomePageId?.data[0]
      setPostDetails(topicData)
      // await syncComments(topicData?._id)
      setLoading(false)
    } else {
      // await syncComments(postDetails?._id)
      setLoading(false)
    }
  }

  useEffect(() => {
    handelPost()
  }, [post])

  // async function syncComments(id: string) {
  //   const data = await getCommentsOnPost(id)
  //   setComments(data || [])
  // }

  // const onComment = async () => {
  //   setIsCommenting(true)
  //   await postComment(commentText, postDetails?._id)
  //   await syncComments(postDetails?._id)
  //   setCommentText("")
  //   setIsCommenting(false)
  // }

  if (loading) {
    return (
      <View style={$loadingScreen}>
        <ActivityIndicator animating color={colors.palette.primary100} />
      </View>
    )
  }

  return (
    <Screen preset="fixed" keyboardOffset={-180} contentContainerStyle={$container}>
      <ScrollView style={$contentContainer}>
        <PostComponent post={postDetails} index={0} />
      </ScrollView>
      {/* <View style={$postCommentContainer}>
        <Icon icon="camera" size={28} onPress={Capture} />
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
      </View> */}
    </Screen>
  )
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
