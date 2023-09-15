import React, { FC, useEffect, useRef, useState } from "react"
import { FlatList, LayoutChangeEvent, ViewStyle, Alert } from "react-native"
import { CommentInput, Screen } from "../../components"
import { HomeTabProps } from "../../tabs/Home"
import { PostComponent } from "../Feed/partials"
import { useHooks } from "../hooks"
import { useStores } from "../../models"
import { CommentComponent } from "../TopicInfo/Comments"
import Loading from "../../components/Loading"
import ImageView from "react-native-image-viewing"
import { ImageViewConfigType } from ".."
import { Host } from "react-native-portalize"
import { colors } from "../../theme"
import { navigationRef } from "../../navigators"

export const PostInfo: FC<HomeTabProps<"PostInfo">> = function PostInfo(props) {
  const { post, highlightedComment } = props.route.params
  const [imageViewConfig, setImageViewConfig] = useState<Omit<ImageViewConfigType, "show">>({
    images: [],
    currentIndex: 0,
  })
  const scrollRef = useRef<FlatList>()
  const [comments, setComments] = useState<Array<any>>([])
  const [showImageView, setShowImageView] = useState<boolean>(false)

  const [postDetails, setPostDetails] = useState<any>(post)
  const [loading, setLoading] = useState<boolean>(typeof post === "string")
  const {
    userStore: { _id },
    api: { mutateGetHomePagesById },
  } = useStores()
  const { getCommentsOnHomePagePost, postCommentOnHomePagePost } = useHooks()

  const syncPost = async (postId: string) => {
    const res = await mutateGetHomePagesById({ homePageId: postId, callerId: _id })
    const postData = res.getHomePagesById?.data.length === 1 && res.getHomePagesById?.data[0]
    setPostDetails(postData)
    return postData
  }
  const handelPost = async () => {
    setLoading(true)
    try {
      if (typeof post === "string") {
        const postData = await syncPost(post)
        await syncComments(postData?._id)
        setLoading(false)
      } else {
        setPostDetails(post)
        await syncComments(postDetails?._id)
        setLoading(false)
      }
    } catch (err) {
      Alert.alert(
        "Post Not Found",
        " We apologize, but the requested post is currently unavailable.",
        [{ text: "Go Back", onPress: props.navigation.goBack }],
      )
    }
  }
  const onPostLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout
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

  const handleImageViewConfig = (args: ImageViewConfigType) => {
    const { show, ...rest } = args
    if (show) {
      setImageViewConfig(rest)
      setTimeout(() => setShowImageView(true), 100)
    }
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
                highlightedComment && (
                  <CommentComponent
                    highlighted
                    comment={highlightedComment}
                    key={highlightedComment?._id}
                  />
                )
              }
              refreshParent={navigationRef.goBack}
              onLayout={onPostLayout}
              setImageViewConfig={handleImageViewConfig}
              post={postDetails}
              index={0}
            />
          }
        />

        <CommentInput createComment={onComment} />
        <ImageView
          images={imageViewConfig.images}
          imageIndex={imageViewConfig.currentIndex}
          visible={showImageView}
          onRequestClose={() => setShowImageView(false)}
        />
      </Host>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $contentContainer: ViewStyle = {
  flex: 1,
}
