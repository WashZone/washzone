import React, { FC, useEffect, useState } from "react"
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Icon, Screen } from "../../components"
import { colors, spacing } from "../../theme"
import { HomeTabProps } from "../../tabs/Home"
import { PostComponent } from "../Feed/partials"
import { Capture } from "../../utils/device/MediaPicker"
import { useHooks } from "../hooks"
import { CommentComponent } from "./Comments"
import { useStores } from "../../models"

export const TopicInfo: FC<HomeTabProps<"TopicInfo">> = function PostInfo(props) {
  const { topic } = props.route.params
  const [commentText, setCommentText] = useState<string>("")
  console.log("POSTD", topic)
  const { postComment, getCommentsOnPost } = useHooks()
  const [comments, setComments] = useState<Array<any>>([])
  const [isCommenting, setIsCommenting] = useState<boolean>(false)
  const [topicDetails, setTopicDetails] = useState<any>(topic)
  const [loading, setLoading] = useState<boolean>(typeof topic === "string")
  const {
    api: { mutateGetTopicByTopicId },
  } = useStores()

  const handleTopic = async () => {
    if (loading && typeof topic === "string") {
      console.log("TOPIC--ID", topic)
      const res = await mutateGetTopicByTopicId({ topicId: topic })
      console.log("RES", res)
      const topicData = res.getTopicByTopicId?.data.length === 1 && res.getTopicByTopicId?.data[0]
      setTopicDetails(topicData)
      setLoading(false)
      await syncComments(topicData?._id)
    } else {
      await syncComments(topicDetails?._id)
    }
  }

  useEffect(() => {
    handleTopic()
  }, [])

  async function syncComments(id: string) {
    const data = await getCommentsOnPost(id)
    setComments(data || [])
  }

  const onComment = async () => {
    setIsCommenting(true)
    await postComment(commentText, topicDetails?._id)
    await syncComments(topicDetails?._id)
    setCommentText("")
    setIsCommenting(false)
  }
  if (loading) {
    return (
      <View style={$loadingScreen}>
        <ActivityIndicator animating />
      </View>
    )
  }

  return (
    <Screen preset="fixed" keyboardOffset={-180} contentContainerStyle={$container}>
      <ScrollView style={$contentContainer}>
        <PostComponent topic={topicDetails} index={0} />
        {comments.map((c) => (
          <CommentComponent comment={c} key={c?._id} />
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

const $loadingScreen: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}
const $rightIconContainer: ViewStyle = {
  width: 28,
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
