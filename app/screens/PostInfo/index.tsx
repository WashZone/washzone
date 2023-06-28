import React, { FC, useEffect, useState } from "react"
import { FlatList,  ViewStyle } from "react-native"
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
  const { post } = props.route.params
  const [imageViewConfig, setImageViewConfig] = useState<ImageViewConfigType>({ images: [], currentIndex: 0, show: false })

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
      <Host>
        <FlatList
          data={comments}
          renderItem={({ item }) => <CommentComponent comment={item} key={item?._id} />}
          style={$contentContainer}
          ListHeaderComponent={<PostComponent setImageViewConfig={setImageViewConfig} post={postDetails} index={0} />}
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

