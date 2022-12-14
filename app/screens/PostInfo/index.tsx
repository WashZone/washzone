import React, { FC, useEffect, useState } from "react"
import { ActivityIndicator, ScrollView, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { Icon, Screen } from "../../components"
import { colors, spacing } from "../../theme"
import { HomeTabProps } from "../../tabs/Home"
import { PostComponent } from "../Feed/partials"
import { Capture } from "../../utils/device/MediaPicker"
import { useHooks } from "../hooks"
import { CommentComponent } from "./Comments"

export const PostInfo: FC<HomeTabProps<"PostInfo">> = function PostInfo(props) {
  const { post } = props.route.params
  const [commentText, setCommentText] = useState<string>("")
  console.log("POSTD", post)
  const { postComment, getCommentsOnPost } = useHooks()
  const [comments, setComments] = useState<Array<any>>([])
  const [isCommenting, setIsCommenting] = useState<boolean>(false)

  async function syncComments() {
    const data = await getCommentsOnPost(post?._id)
    setComments(data)
  }

  const onComment = async() =>{
    setIsCommenting(true)
    await postComment(commentText, post?._id);
    await syncComments()
    setCommentText('')
    setIsCommenting(false)
  }


  useEffect(() => {
    syncComments()
  }, [])

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <ScrollView style={$contentContainer}>
        <PostComponent post={post} />
        {comments.map((c) => (
          <CommentComponent comment={c} key={c?._id}/>
        ))}
      </ScrollView>
      <View style={$postCommentContainer}>
        <Icon icon="camera" size={28} onPress={Capture} />
        <TextInput
          value={commentText}
          onChangeText={setCommentText}
          placeholder="Write a comment!"
          placeholderTextColor={colors.palette.overlay50}
          style={$commentInput}
        />
        <View style={$rightIconContainer}>
       {isCommenting ?<ActivityIndicator animating/> : <Icon
          icon="send"
          size={28}
          onPress={onComment}
          color={commentText.length > 1 ? colors.palette.primary100 : colors.palette.neutral400}
        />}
        </View>
      </View>
    </Screen>
  )
}
const $rightIconContainer:ViewStyle={
  width:28
}

const $commentInput: TextStyle = {
  flex: 1,
  height: 34,
  backgroundColor: colors.background,
  marginHorizontal: 10,
  borderRadius: 24,
  paddingHorizontal: 10,
}

const $container: ViewStyle = {
  flex: 1,
}

const $contentContainer: ViewStyle = {
  flex: 1,
}

const $postCommentContainer: ViewStyle = {
  height: 46,
  flexDirection: "row",
  paddingHorizontal: spacing.medium,
  backgroundColor: colors.palette.neutral100,
  alignItems: "center",
}
