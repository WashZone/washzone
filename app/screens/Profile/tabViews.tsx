import React, { useEffect } from "react"
import { FlatList, View, ViewStyle, Pressable } from "react-native"
import { colors, spacing } from "../../theme"
import { useHooks } from "../hooks"
import { VideoBlock } from "../VideosFeed"
import { ClassifiedComponent } from "../ClassifiedsFeed"
import { TopicComponent } from "../TopicsFeed"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { ClassifiedsTabParamList, VideosTabParamList, TopicsTabParamList } from "../../tabs"
import { TabParamList } from "../../navigators/TabNavigator"
import { openCustomUrl } from "../../utils/navigations"

export const TopicsTabScreen = ({ userId }: { userId: string }) => {
  const [userTopics, setUserTopics] = React.useState([])
  const { getUserTopics } = useHooks()

  const fetchUserTopics = async () => {
    const res = await getUserTopics(userId)
    setUserTopics(res)
  }

  useEffect(() => {
    fetchUserTopics()
  }, [])

  return (
    <View style={$screenContainer}>
      <FlatList
        data={userTopics}
        renderItem={({ item, index }) => <TopicComponent index={index} topic={item} />}
      />
    </View>
  )
}

export const ClassifiedsTabScreen = ({ userId }: { userId: string }) => {
  const [userClassifieds, setUserClassifieds] = React.useState([])
  const { getUserClassifieds } = useHooks()
  const navigation = useNavigation<NavigationProp<TabParamList>>()
  const navigationTopic = useNavigation<NavigationProp<TopicsTabParamList>>()
  const navigationClassified = useNavigation<NavigationProp<ClassifiedsTabParamList>>()
  const navigationVideo = useNavigation<NavigationProp<VideosTabParamList>>()

  const fetchUserClassifieds = async () => {
    const res = await getUserClassifieds(userId)
    setUserClassifieds(res)
  }

  const handlePress = (id: string) => {
    openCustomUrl(
      `washzone://open-classfied/${id}`,
      navigation,
      navigationTopic,
      navigationClassified,
      navigationVideo,
    )
  }

  useEffect(() => {
    fetchUserClassifieds()
  }, [])

  return (
    <View style={$screenContainer}>
      <FlatList
        data={userClassifieds}
        numColumns={2}
        renderItem={({ item }) => (
          <Pressable style={$classifiedBlockContainer}>
            <ClassifiedComponent classified={item} />
          </Pressable>
        )}
      />
    </View>
  )
}

export const VideosTabScreen = ({ userId }: { userId: string }) => {
  const [userVideos, setUserVideos] = React.useState([])
  const { getUserVideos } = useHooks()

  const fetchUserVideos = async () => {
    const res = await getUserVideos(userId)
    setUserVideos(res)
  }

  useEffect(() => {
    fetchUserVideos()
  }, [])

  return (
    <View style={$screenContainer}>
      <FlatList
        data={userVideos}
        renderItem={({ item }) => (
          <Pressable style={$videoBlockContainer}>
            <VideoBlock videoDetails={item} />
          </Pressable>
        )}
      />
    </View>
  )
}

const $videoBlockContainer: ViewStyle = {
  marginTop: spacing.medium,
  alignSelf: "center",
}

const $classifiedBlockContainer: ViewStyle = {
  marginTop: spacing.medium,
  alignItems: "center",
  width: "50%",
}

const $screenContainer: ViewStyle = {
  flex: 1,
}
