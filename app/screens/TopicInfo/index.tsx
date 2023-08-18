import React, { FC, useEffect, useRef, useState } from "react"
import { FlatList, LayoutChangeEvent, View, ViewStyle } from "react-native"
import { Host } from "react-native-portalize"

import { CommentInput } from "../../components"
import { HomeTabProps } from "../../tabs/Home"
import { useHooks } from "../hooks"
import { CommentComponent } from "./Comments"
import { useStores } from "../../models"
import { TopicComponentFullView } from "../TopicsFeed"
import Loading from "../../components/Loading"
import { $flex1 } from "../styles"

export const TopicInfo: FC<HomeTabProps<"TopicInfo">> = function PostInfo(props) {
  const { topic, highlightedComment } = props.route.params
  const { postComment, getCommentsOnPost } = useHooks()
  const [comments, setComments] = useState<Array<any>>([])
  const [topicDetails, setTopicDetails] = useState<any>(topic)
  const [loading, setLoading] = useState<boolean>(typeof topic === "string")
  const scrollRef = useRef<FlatList>()
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


  const onTopicLayout = (e: LayoutChangeEvent) => {
    const  {height } = e.nativeEvent.layout;
    highlightedComment && scrollRef.current.scrollToOffset({ offset: height })
  }

  useEffect(() => {
    handleTopic()
  }, [topic])

  async function syncComments(id: string) {
    let data = await getCommentsOnPost(id)
    if (highlightedComment?._id) {
      data = data.filter((i) => i?._id !== highlightedComment._id)
    }
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
    <View style={$container}>
      <Host style={$flex1}>
        <FlatList
          data={comments}
          ref={scrollRef}
          renderItem={({ item }) => <CommentComponent comment={item} key={item?._id} />}
          style={$contentContainer}
          ListHeaderComponent={
            <TopicComponentFullView
              onLayout={onTopicLayout}
              additionalChildComponent={
                highlightedComment && (
                  <CommentComponent
                    highlighted
                    comment={highlightedComment}
                    key={highlightedComment?._id}
                  />
                )
              }
              topic={topicDetails}
            />
          }
        />
        <CommentInput createComment={onComment} />
      </Host>
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
}

const $contentContainer: ViewStyle = {
  flex: 1,
}
