import React, { FC, useState } from "react"
import {
  Dimensions,
  TextStyle,
  ViewStyle,
  View,
  useWindowDimensions,
  Pressable,
} from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { CollapsibleHeaderTabView } from "react-native-tab-view-collapsible-header"
import { NavigationState, SceneRendererProps, TabBar } from "react-native-tab-view"
import { observer } from "mobx-react-lite"

import { colors, spacing } from "../../theme"
import { HomeTabProps } from "../../tabs"
import { Screen, Text } from "../../components"
import { formatName } from "../../utils/formatName"
import { ClassifiedsTabScreen, GalleryTabView, TopicsTabScreen, VideosTabScreen } from "./tabViews"
import { $flex1 } from "../styles"

const mockDescription =
  "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis."

export const Profile: FC<HomeTabProps<"Profile">> = observer(function Profile({ route }) {
  const { user } = route.params
  const [galleryItemsTopics, setGalleryItemsTopics] = useState([])
  const [galleryItemsClassifieds, setGalleryItemsClassifieds] = useState([])
  const [galleryItemsVideos, setGalleryItemsVideos] = useState([])

  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "topic", title: "Topics" },
    { key: "classified", title: "Classifieds" },
    { key: "video", title: "Videos" },
    { key: "gallery", title: "Gallery" },
  ])

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "topic":
        return <TopicsTabScreen userId={user?._id} addToGallery={setGalleryItemsTopics} />
      case "classified":
        return <ClassifiedsTabScreen userId={user?._id} addToGallery={setGalleryItemsClassifieds} />
      case "video":
        return <VideosTabScreen userId={user?._id} addToGallery={setGalleryItemsVideos} />
      case "gallery":
        return (
          <GalleryTabView
            galleryItems={[
              ...galleryItemsTopics,
              ...galleryItemsClassifieds,
              ...galleryItemsVideos,
            ]}
          />
        )
      default:
        return null
    }
  }

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<any>
    },
  ) => {
    return (
      <TabBar
        style={$tab}
        labelStyle={$label}
        activeColor={colors.palette.neutral100}
        indicatorStyle={$indicator}
        scrollEnabled
        {...props}
      />
    )
  }

  return (
    <Screen contentContainerStyle={$flex1}>
      <CollapsibleHeaderTabView
        renderScrollHeader={() => (
          <View style={$topContainer}>
            <FastImage style={$profileImage} source={{ uri: user?.picture }} />
            <Text text={formatName(user?.name)} style={$publisherName} weight="semiBold" />
            <Text text={user?.description || mockDescription} style={$descriptionText} />
          </View>
        )}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        style={$flex1}
        initialLayout={{ width: layout.width }}
      />
    </Screen>
  )
})

const $tab: TextStyle = {
  backgroundColor: colors.palette.primary100,
  fontSize: 14,
}

const $label: TextStyle = {
  color: colors.palette.greyOverlay100,
  fontSize: 14,
  fontWeight: "700",
}
const $indicator: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
}

const $topContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  alignItems: "center",
  height: 260,
}
const $descriptionText: TextStyle = {
  marginTop: spacing.extraLarge,
  width: Dimensions.get("screen").width - 100,
  fontSize: 14,
  lineHeight: 17,
  textAlign: "justify",
  alignSelf: "center",
}

const $tabBar: ViewStyle = {
  flexDirection: "row",
  backgroundColor: colors.palette.primary100,
}

const $publisherName: TextStyle = {
  fontSize: 16,
  lineHeight: 16,
  textAlign: "center",
  marginTop: spacing.small,
}

const $profileImage: ImageStyle = {
  height: 50,
  width: 50,
  borderRadius: 25,
  alignSelf: "center",
  marginTop: spacing.extraLarge,
}
