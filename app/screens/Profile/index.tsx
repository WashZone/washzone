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
import { Button, Screen, Text } from "../../components"
import { formatName } from "../../utils/formatName"
import { ClassifiedsTabScreen, GalleryTabView, TopicsTabScreen, VideosTabScreen } from "./tabViews"
import { $flex1 } from "../styles"
import { useHooks } from "../hooks"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { AppStackParamList } from "../../navigators"

const mockDescription =
  "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis."

export const Profile: FC<HomeTabProps<"Profile">> = observer(function Profile({ route }) {
  const { user } = route.params
  const [galleryItemsTopics, setGalleryItemsTopics] = useState([])
  const [galleryItemsClassifieds, setGalleryItemsClassifieds] = useState([])
  const [galleryItemsVideos, setGalleryItemsVideos] = useState([])
  const { getOrCreateRoom } = useHooks()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
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

  const onMessage = async () => {
    const roomId = await getOrCreateRoom(user?._id)
    navigation.navigate("P2PChat", { receiver: user, roomId })
  }

  return (
    <Screen contentContainerStyle={$flex1}>
      <CollapsibleHeaderTabView
        renderScrollHeader={() => (
          <View style={$topContainer}>
            <FastImage style={$profileImage} source={{ uri: user?.picture }} />
            <Text text={formatName(user?.name)} style={$publisherName} weight="semiBold" />
            {user?.description  && <Text
              color={colors.palette.neutral900}
              numberOfLines={3}
              weight="normal"
              text={user?.description}
              style={$descriptionText}
            />}
            <Button preset="reversed" style={$messageButton} text="Message" onPress={onMessage} />
          </View>
        )}
        enableSnap
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
}
const $descriptionText: TextStyle = {
  marginTop: spacing.large,
  width: Dimensions.get("screen").width - 100,
  fontSize: 14,
  lineHeight: 17,
  textAlign: "justify",
  alignSelf: "center",
}

const $messageButton: ViewStyle = {
  padding: spacing.extraSmall,
  paddingHorizontal: spacing.medium,
  height: 45,
  width: 148,
  marginVertical : spacing.medium
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
