import React, { useEffect, useState } from "react"
import { View, ViewStyle, Dimensions, ImageStyle } from "react-native"
import { colors, spacing } from "../../theme"
import { useHooks } from "../hooks"
import { VideoBlock } from "../VideosFeed"
import { ClassifiedComponent } from "../ClassifiedsFeed"
import { TopicComponent } from "../TopicsFeed"
import { AutoImage } from "../../components"
import { HFlatList, HScrollView } from "react-native-head-tab-view"
import { PostComponent } from "../Feed/partials"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { HomeTabParamList } from "../../tabs"
import Loading from "../../components/Loading"
import { VideoBlockFullWidth } from "../Playlist"

const GalleryItem = ({ uri }) => {
  return (
    <AutoImage
      source={{ uri }}
      maxWidth={Dimensions.get("screen").width / 2 - 30}
      style={$marginAutoImage}
    />
  )
}

export const GalleryTabView = ({ galleryItems }: { galleryItems: Array<any> }) => {
  const [loading, setLoading] = useState(true)
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
    setLoading(false)
  }, [galleryItems])

  if (loading) return <Loading />

  return (
    <HScrollView showsVerticalScrollIndicator={false} index={4} style={$screenContainer}>
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

export const HomePostsTabScreen = ({
  userId,
  addToGallery,
}: {
  userId: string
  addToGallery: (toAdd: Array<any>) => void
}) => {
  const [loading, setLoading] = useState(true)

  const [userPosts, setUserPosts] = React.useState([])
  const { getUsersHomePosts } = useHooks()
  const navigation = useNavigation<NavigationProp<HomeTabParamList>>()

  const fetchUserPosts = async () => {
    const res = await getUsersHomePosts(userId)
    setUserPosts(res)
    addToGallery(res)
    setLoading(false)
  }

  useEffect(() => {
    fetchUserPosts()
  }, [userId])

  if (loading) return <Loading />

  return (
    <HFlatList
      index={0}
      style={$screenContainer}
      bounces={false}
      data={userPosts}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => <PostComponent post={item} navigateOnPress index={index} />}
    />
  )
}
export const TopicsTabScreen = ({
  userId,
  addToGallery,
}: {
  userId: string
  addToGallery: (toAdd: Array<any>) => void
}) => {
  const [loading, setLoading] = useState(true)

  const [userTopics, setUserTopics] = React.useState([])
  const { getUserTopics } = useHooks()

  const fetchUserTopics = async () => {
    const res = await getUserTopics(userId)
    setUserTopics(res)
    addToGallery(res)
    setLoading(false)
  }

  useEffect(() => {
    fetchUserTopics()
  }, [userId])

  if (loading) {
    return <Loading />
  }

  return (
    <HFlatList
      index={1}
      style={$screenContainer}
      bounces={false}
      data={userTopics}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => <TopicComponent topic={item} />}
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
  const [loading, setLoading] = useState(true)

  const [userClassifieds, setUserClassifieds] = React.useState([])
  const { getUserClassifieds } = useHooks()

  const fetchUserClassifieds = async () => {
    const res = await getUserClassifieds(userId)
    setUserClassifieds(res)
    addToGallery(res)
    setLoading(false)
  }

  useEffect(() => {
    fetchUserClassifieds()
  }, [userId])

  if (loading) {
    return <Loading />
  }

  return (
    <HFlatList
      index={2}
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
  const [loading, setLoading] = useState(true)

  const [userVideos, setUserVideos] = React.useState([])
  const { getUserVideos } = useHooks()

  const fetchUserVideos = async () => {
    const res = await getUserVideos(userId)
    setUserVideos(res)
    addToGallery(res)
    setLoading(false)
  }

  useEffect(() => {
    fetchUserVideos()
  }, [userId])

  if (loading) {
    return <Loading />
  }

  return (
    <HFlatList
      index={3}
      style={$screenContainer}
      data={userVideos}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<View style={{ height: spacing.homeScreen }} />}
      renderItem={({ item, index }) => (
        <View style={$videoBlockContainer}>
          <VideoBlockFullWidth videoDetails={item} index={index} />
        </View>
      )}
    />
  )
}

const $videoBlockContainer: ViewStyle = {
  // marginTop: spacing.medium,
  // alignSelf: "center",
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
