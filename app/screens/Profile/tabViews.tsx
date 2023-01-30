import React, { useEffect, useState } from "react"
import { View, ViewStyle, Dimensions, ImageStyle } from "react-native"
import { colors, spacing } from "../../theme"
import { useHooks } from "../hooks"
import { VideoBlock } from "../VideosFeed"
import { ClassifiedComponent } from "../ClassifiedsFeed"
import { TopicComponent } from "../TopicsFeed"
import { AutoImage } from "../../components"
import { HFlatList, HScrollView } from "react-native-head-tab-view"

const GalleryItem = ({ uri }) => {
  console.log(uri)
  return (
    <AutoImage
      source={{ uri }}
      maxWidth={Dimensions.get("screen").width / 2 - 30}
      style={$marginAutoImage}
    />
  )
}

export const GalleryTabView = ({ galleryItems }: { galleryItems: Array<any> }) => {
  const [imageData, setImageData] = useState<{ left: Array<any>; right: Array<any> }>({
    left: [],
    right: [],
  })

  useEffect(() => {
    const left = []
    const right = []

    galleryItems.map((data, index) => {
      if (index % 2 === 0) {
        left.push(data)
      } else {
        right.push(data)
      }
      return true
    })

    setImageData({
      left,
      right,
    })
    console.log(left)
    console.log(right)
  }, [galleryItems])

  return (
    <HScrollView showsVerticalScrollIndicator={false} index={3} style={$screenContainer}>
      <View style={$flexRow}>
        <View style={{ flex: 1 / 2 }}>
          {imageData.left.map((e, index) => (
            <GalleryItem uri={e?.attachmentUrl || e.thumbnailUrl} key={index} />
          ))}
        </View>
        <View style={{ flex: 1 / 2 }}>
          {imageData.right.map((e, index) => (
            <GalleryItem uri={e?.attachmentUrl || e.thumbnailUrl} key={index} />
          ))}
        </View>
      </View>
    </HScrollView>
  )
}

export const TopicsTabScreen = ({
  userId,
  addToGallery,
}: {
  userId: string
  addToGallery: (toAdd: Array<any>) => void
}) => {
  const [userTopics, setUserTopics] = React.useState([])
  const { getUserTopics } = useHooks()

  const fetchUserTopics = async () => {
    const res = await getUserTopics(userId)
    setUserTopics(res)
    addToGallery(res)
  }

  useEffect(() => {
    fetchUserTopics()
  }, [userId])

  return (
    <HFlatList
      index={0}
      style={$screenContainer}
      bounces={false}
      data={userTopics}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => <TopicComponent index={index} topic={item} />}
    />
  )
}

export const ClassifiedsTabScreen = ({
  userId,
  addToGallery,
}: {
  userId: string
  addToGallery: (toAdd: Array<any>) => void
}) => {
  const [userClassifieds, setUserClassifieds] = React.useState([])
  const { getUserClassifieds } = useHooks()

  const fetchUserClassifieds = async () => {
    const res = await getUserClassifieds(userId)
    setUserClassifieds(res)
    addToGallery(res)
  }

  useEffect(() => {
    fetchUserClassifieds()
  }, [userId])

  return (
    <HFlatList
      index={1}
      data={userClassifieds}
      style={$screenContainer}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={$classifiedBlockContainer}>
          <ClassifiedComponent classified={item} />
        </View>
      )}
    />
  )
}

export const VideosTabScreen = ({
  userId,
  addToGallery,
}: {
  userId: string
  addToGallery: (toAdd: Array<any>) => void
}) => {
  const [userVideos, setUserVideos] = React.useState([])
  const { getUserVideos } = useHooks()

  const fetchUserVideos = async () => {
    const res = await getUserVideos(userId)
    setUserVideos(res)
    addToGallery(res)
  }

  useEffect(() => {
    fetchUserVideos()
  }, [userId])

  return (
    <HFlatList
      index={2}
      style={$screenContainer}
      data={userVideos}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={$videoBlockContainer}>
          <VideoBlock videoDetails={item} />
        </View>
      )}
    />
  )
}

const $videoBlockContainer: ViewStyle = {
  marginTop: spacing.medium,
  alignSelf: "center",
  zIndex: 100,
}

const $classifiedBlockContainer: ViewStyle = {
  marginTop: spacing.medium,
  alignItems: "center",
  width: "50%",
}

const $screenContainer: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.primaryOverlay15,
}

const $marginAutoImage: ImageStyle = { margin: 10 }

const $flexRow: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  marginHorizontal: 10,
}
