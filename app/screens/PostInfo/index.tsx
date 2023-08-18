import React, { FC, useEffect, useRef, useState } from "react"
import { FlatList, LayoutChangeEvent, ViewStyle } from "react-native"
import { CommentInput, Screen } from "../../components"
import { HomeTabProps } from "../../tabs/Home"
import { PostComponent } from "../Feed/partials"
import { useHooks } from "../hooks"
import { useStores } from "../../models"
import { CommentComponent } from "../TopicInfo/Comments"
import Loading from "../../components/Loading"
import ImageView from "react-native-fast-image-viewing"
import { ImageViewConfigType } from ".."
import { Host } from "react-native-portalize"

export const PostInfo: FC<HomeTabProps<"PostInfo">> = function PostInfo(props) {
  const { post, highlightedComment } = props.route.params
  const [imageViewConfig, setImageViewConfig] = useState<ImageViewConfigType>({
    images: [],
    currentIndex: 0,
    show: false,
  })
const scrollRef = useRef<FlatList>()
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
  const onPostLayout = (e: LayoutChangeEvent) => {
    const  {height } = e.nativeEvent.layout;
    highlightedComment && scrollRef.current.scrollToOffset({ offset: height })
  }

  useEffect(() => {
    handelPost()
  }, [post])

  async function syncComments(id: string) {
    let data = await getCommentsOnHomePagePost(id)
    if (highlightedComment?._id) {
      data = data.filter((i) => i._id !== highlightedComment._id)
    }
    console.log("DATA syncComments", data)
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
      <Host>
        <FlatList
        ref={scrollRef}
          data={comments}
          renderItem={({ item }) => <CommentComponent comment={item} key={item?._id} />}
          style={$contentContainer}
          ListHeaderComponent={

            <PostComponent
              additionalChildComponent={
                highlightedComment && <CommentComponent highlighted comment={highlightedComment} key={highlightedComment?._id} />
              }
              onLayout={onPostLayout}
              setImageViewConfig={setImageViewConfig}
              post={postDetails}
              index={0}
            />

          }
        />

        <CommentInput createComment={onComment} />
        <ImageView
          images={imageViewConfig.images}
          imageIndex={imageViewConfig.currentIndex}
          visible={imageViewConfig.show}
          onRequestClose={() => setImageViewConfig({ ...imageViewConfig, show: false })}
        />
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
