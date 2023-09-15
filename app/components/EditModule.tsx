import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { CreatePost } from "../screens/Feed/partials"
import { CreateTopic } from "../screens/TopicsFeed/CreateTopic"
import { useStores } from "../models"
import { Asset } from "react-native-image-picker"
import { BottomModal, TOnPost, TOnTopic, Text } from "."
import { useSharedValue, withTiming } from "react-native-reanimated"
import Lottie from "lottie-react-native"

import { colors, spacing } from "../theme"
import { useHooks } from "../screens/hooks"
import { $loaderContainer } from "../screens/styles"
import { View, ViewStyle } from "react-native"
import { navigationRef } from "../navigators"

const handlingReloadOnInfoComponents = (mode: "post" | "topic", updatedData: any) => {
  const detailRoute = mode === "post" ? "PostInfo" : "TopicInfo"
  const currentRoute = navigationRef.current?.getCurrentRoute()?.name
  const newParams = {}
  newParams[mode] = updatedData
  if (currentRoute === detailRoute) {
    navigationRef.current?.setParams(newParams)
  }
}

export const EditModule = observer(function EditModals() {
  const {
    edit: { isEditing, defaultData, mode, resetState },
  } = useStores()
  const { userId: moduleAuthor } = defaultData as any
  const { refreshTopics, refreshHomeFeed, updateTopic, updatePost } = useHooks()
  const [isUpdating, setIsUpdating] = useState(false)

  const onUpdateTopic = ({ topicContent, file, topicId, title }: Parameters<TOnTopic>[0]) => {
    setIsUpdating(true)
    console.log(topicContent, file, topicId, title)
    updateTopic(topicId, { topicContent, title }, file).then(
      async (data) => {
        handlingReloadOnInfoComponents(mode, {
          ...data?.updateUserTopic,
          userId: moduleAuthor,
        })
        refreshTopics()
        setIsUpdating(false)
        resetState()
      },
      (err) => {
        console.log(err)
        setIsUpdating(false)
        resetState()
      },
    )
  }

  const onUpdatePost = ({ postContent, files, postId }: Parameters<TOnPost>[0]) => {
    setIsUpdating(true)
    console.log('FILES',files)
    updatePost(postId, { Discription: postContent }, files).then(
      async (data) => {
        handlingReloadOnInfoComponents(mode, {
          ...data?.updateUserHomePages,
          userId: moduleAuthor,
        })
        console.log("updated post", data)
        refreshHomeFeed()
        setIsUpdating(false)
        resetState()
      },
      (err) => {
        console.log(err)

        setIsUpdating(false)
        resetState()
      },
    )
  }

  return (
    <BottomModal
      isVisible={isEditing}
      backgroundColor={colors.palette.neutral100}
      overrideCloseModal={resetState}
      avoidKeyboard
      keyboardOffset={-30}
    >
      {mode === "post" ? (
        <EditPost post={defaultData} onUpdatePost={onUpdatePost} />
      ) : (
        <EditTopic topic={defaultData} onUpdateTopic={onUpdateTopic} />
      )}
      {isUpdating && (
        <View style={$loadingContainer}>
          <Lottie
            style={$lottie}
            source={require("../../assets/lottie/loader.json")}
            autoPlay
            loop
          />
          <Text
            text={"Updating in progress..."}
            color={colors.palette.primary100}
            weight="semiBold"
            size="sm"
            style={{ marginTop: spacing.tiny }}
          />
          <Text
            text={"Please wait while we update your " + (mode === "post" ? "post" : "discussion.")}
            color={colors.palette.primary100}
            weight="medium"
            size="xxs"
            style={{ marginTop: spacing.tiny }}
          />
        </View>
      )}
    </BottomModal>
  )
})

const EditPost = ({ post, onUpdatePost }: { post: any; onUpdatePost: TOnPost }) => {
  const progress = useSharedValue(post.attachmentUrl?.length ? 1 : 0.5)
  const [selectedImages, setSelectedImages] = useState<Asset[]>(
    post?.attachmentUrl ? post.attachmentUrl.map((i) => ({ ...i, uri: i.url })) : [],
  )

  useEffect(() => {
    setTimeout(() => {
      progress.value = withTiming(selectedImages?.length ? 1 : 0.5, { duration: 300 })
    }, 300)
  }, [selectedImages])

  return (
    <CreatePost
      shouldHidePostSubmit={false}
      inputFocused
      progress={progress}
      defaultPost={post}
      onPost={onUpdatePost}
      selectedImages={selectedImages}
      setSelectedImages={setSelectedImages}
    />
  )
}

const EditTopic = ({ topic, onUpdateTopic }: { topic: any; onUpdateTopic: TOnTopic }) => {
  const progress = useSharedValue(topic.attachmentUrl?.length ? 1 : 0.5)

  const [selectedImage, setSelectedImage] = useState<Asset>({ uri: topic.attachmentUrl })

  useEffect(() => {
    setTimeout(() => {
      progress.value = withTiming(selectedImage.uri ? 1 : 0.5, { duration: 300 })
    }, 300)
  }, [selectedImage])

  return (
    <CreateTopic
      inputFocused
      progress={progress}
      defaultTopic={topic}
      onTopic={onUpdateTopic}
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
    />
  )
}

const $lottie: ViewStyle = { height: 40, backgroundColor: colors.transparent }

const $loadingContainer: ViewStyle[] = [
  $loaderContainer,
  {
    backgroundColor: colors.palette.neutral100,
    position: "absolute",
    height: "100%",
    width: "100%",
  },
]
