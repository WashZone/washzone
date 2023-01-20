import React, { useEffect, useState } from "react"
import { FlatList, View, ViewStyle, ScrollView, Dimensions, ImageStyle } from "react-native"
import { colors, spacing } from "../../theme"
import { useHooks } from "../hooks"
import { VideoBlock } from "../VideosFeed"
import { ClassifiedComponent } from "../ClassifiedsFeed"
import { TopicComponent } from "../TopicsFeed"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { AutoImage } from "../../components"

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const mockImageData = [
  { uri: "https://dummyimage.com/600x400/000/fff/&text=GM @Arben!" },
  { uri: "https://dummyimage.com/400x400/000/fff/&text=Below this gallery section" },
  { uri: "https://dummyimage.com/400x600/000/fff/&text=We will update this later! " },
  { uri: "https://dummyimage.com/600x200/000/fff/&text=would be more content Right?" },
]

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
  const [isOpen, setOpen] = useState(false)
  const open = useSharedValue(0)
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

  const animatedContainer = useAnimatedStyle(() => {
    const height = interpolate(open.value, [0, 1], [0, 400])
    return {
      height,
      backgroundColor: colors.palette.neutral100,
    }
  })

  const dropStyle = useAnimatedStyle(() => {
    const rotate = interpolate(open.value, [0, 1], [0, -180])
    return {
      transform: [{ rotate: `${rotate}deg` }],
    }
  })

  const handleExpand = () => {
    setOpen(!isOpen)
  }

  useEffect(() => {
    open.value = withTiming(isOpen ? 0 : 1, { duration: 150 })
  }, [isOpen])

  return (
    <>
      {/* <Pressable onPress={handleExpand} style={$galleryHeaderContainer}>
        <Text tx="profile.gallery" preset="formLabel" />
        <Animated.View style={dropStyle}>
          <Icon icon="arrowDown" color={colors.palette.neutral800} />
        </Animated.View>
      </Pressable> */}

      <ScrollView style={$screenContainer}>
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
      </ScrollView>
    </>
  )
}

export const TopicsTabScreen = ({
  userId,
  bioHeightRef,
  addToGallery,
}: {
  userId: string
  bioHeightRef: any
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
  }, [])

  return (
    <View style={$screenContainer}>
      <AnimatedFlatList
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: bioHeightRef } } }], {
          useNativeDriver: false,
        })}
        data={userTopics}
        renderItem={({ item, index }) => <TopicComponent index={index} topic={item} />}
      />
    </View>
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
  }, [])

  return (
    <View style={$screenContainer}>
      <FlatList
        data={userClassifieds}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={$classifiedBlockContainer}>
            <ClassifiedComponent classified={item} />
          </View>
        )}
      />
    </View>
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
  }, [])

  return (
    <View style={$screenContainer}>
      <FlatList
        data={userVideos}
        renderItem={({ item }) => (
          <View style={$videoBlockContainer}>
            <VideoBlock videoDetails={item} />
          </View>
        )}
      />
    </View>
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
  backgroundColor: colors.backgroundGrey,
}

const $marginAutoImage: ImageStyle = { margin: 10 }

const $flexRow: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  marginHorizontal: 10,
}
