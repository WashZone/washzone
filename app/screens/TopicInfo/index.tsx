import React, { FC, useEffect, useState } from "react"
import { FlatList, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { CommentInput, Icon, Screen } from "../../components"
import { colors, spacing } from "../../theme"
import { HomeTabProps } from "../../tabs/Home"
import { useHooks } from "../hooks"
import { CommentComponent } from "./Comments"
import { useStores } from "../../models"
import { ActivityIndicator } from "react-native-paper"
import { TopicComponentFullView } from "../TopicsFeed"
import FastImage from "react-native-fast-image"
import Loading from "../../components/Loading"

export const TopicInfo: FC<HomeTabProps<"TopicInfo">> = function PostInfo(props) {
  const { topic } = props.route.params
  const { postComment, getCommentsOnPost } = useHooks()
  const [comments, setComments] = useState<Array<any>>([])
  const [topicDetails, setTopicDetails] = useState<any>(topic)
  const [loading, setLoading] = useState<boolean>(typeof topic === "string")
  const {
    userStore: { _id },
    api: { mutateGetTopicById },
  } = useStores()

  const handleTopic = async () => {
    setLoading(true)
    if (typeof topic === "string") {
      const res = await mutateGetTopicById({ topicId: topic, callerId: _id })
      const topicData = res.getTopicById?.data.length === 1 && res.getTopicById?.data[0]
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

  const onComment = async (commentText, selectedMedia) => {
    await postComment(commentText, selectedMedia, topicDetails?._id)
    await syncComments(topicDetails?._id)
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
        ListHeaderComponent={<TopicComponentFullView topic={topicDetails} />}
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
