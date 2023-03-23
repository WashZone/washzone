import React, { FC, useEffect, useState } from "react"
import { ScrollView, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { Icon, Screen } from "../../components"
import { colors, spacing } from "../../theme"
import { HomeTabProps } from "../../tabs/Home"
// import { PostComponent } from "../Feed/partials"
import { Capture, MediaPicker } from "../../utils/device/MediaPicker"
import { useHooks } from "../hooks"
import { CommentComponent } from "./Comments"
import { useStores } from "../../models"
import { ActivityIndicator } from "react-native-paper"
import { TopicComponent } from "../TopicsFeed"
import FastImage from "react-native-fast-image"

export const TopicInfo: FC<HomeTabProps<"TopicInfo">> = function PostInfo(props) {
  const { topic } = props.route.params
  const [commentText, setCommentText] = useState<string>("")
  const { postComment, getCommentsOnPost } = useHooks()
  const [comments, setComments] = useState<Array<any>>([])
  const [isCommenting, setIsCommenting] = useState<boolean>(false)
  const [selectedMedia, setSelectedMedia] = useState<any>()
  const [topicDetails, setTopicDetails] = useState<any>(topic)
  const [loading, setLoading] = useState<boolean>(typeof topic === "string")
  const {
    api: { mutateGetTopicByTopicId },
  } = useStores()

  const handleTopic = async () => {
    setLoading(true)
    if (typeof topic === "string") {
      const res = await mutateGetTopicByTopicId({ topicId: topic })
      const topicData = res.getTopicByTopicId?.data.length === 1 && res.getTopicByTopicId?.data[0]
      setTopicDetails(topicData)
      await syncComments(topicData?._id)
      setLoading(false)
    } else {
      await syncComments(topicDetails?._id)
      setLoading(false)
    }
  }

  useEffect(() => {
    handleTopic()
  }, [topic])

  async function syncComments(id: string) {
    const data = await getCommentsOnPost(id)
    console.log("ALL COMMENTS", data)
    setComments(data || [])
  }

  const onComment = async () => {
    if (commentText?.length ===0)return 
    setIsCommenting(true)
    await postComment(commentText, selectedMedia ,  topicDetails?._id)
    await syncComments(topicDetails?._id)
    setSelectedMedia(undefined)
    setCommentText("")
    setIsCommenting(false)
  }

  const onAddImage = async () => {
    const res = await MediaPicker()
    setSelectedMedia(res)
  }

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
        <TopicComponent topic={topicDetails} index={0} />
        {comments.map((c) => (
          <CommentComponent comment={c} key={c?._id} />
        ))}
      </ScrollView>
     {selectedMedia && <View style={{position:'absolute', bottom:54}}>
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
      </View>}
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
  height: 48,
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
  height: 54,
  flexDirection: "row",
  paddingHorizontal: spacing.medium,
  backgroundColor: colors.palette.neutral100,
  alignItems: "center",
}
