import React, { FC, useEffect, useState } from "react"
import { FlatList, ViewStyle } from "react-native"
import { Host } from "react-native-portalize"

import { CommentInput, Screen } from "../../components"
import { HomeTabProps } from "../../tabs/Home"
import { useHooks } from "../hooks"
import { CommentComponent } from "./Comments"
import { useStores } from "../../models"
import { TopicComponentFullView } from "../TopicsFeed"
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
      <Host>
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentComponent comment={item} key={item?._id} />}
        style={$contentContainer}
        ListHeaderComponent={<TopicComponentFullView topic={topicDetails} />}
      />
      <CommentInput createComment={onComment} />
      </Host>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
}

const $contentContainer: ViewStyle = {
  flex: 1,
}
