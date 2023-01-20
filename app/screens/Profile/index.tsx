import React, { FC, useRef, useState } from "react"
import {
  Dimensions,
  TextStyle,
  ViewStyle,
  View,
  useWindowDimensions,
  Pressable,
} from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { colors, spacing } from "../../theme"
import { HomeTabProps } from "../../tabs"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import { formatName } from "../../utils/formatName"

import { NavigationState, SceneRendererProps, TabView } from "react-native-tab-view"
import { ClassifiedsTabScreen, GalleryTabView, TopicsTabScreen, VideosTabScreen } from "./tabViews"
import { $flex1 } from "../styles"
import Animated, { Extrapolate } from "react-native-reanimated"

const BIO_MAX_HEIGHT = 260
const mockDescription =
  "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis."

export const Profile: FC<HomeTabProps<"Profile">> = observer(function Profile({ route }) {
  const { user } = route.params
  const [galleryItems, setGalleryItems] = useState([])

  const addToGallery = (additionalItems: Array<any>) => {
    setGalleryItems([...galleryItems, ...additionalItems])
  }

  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "topic", title: "Topics" },
    { key: "classified", title: "Classifieds" },
    { key: "video", title: "Videos" },
    { key: "gallery", title: "Gallery" },
  ])
  const bioHeightRef = useRef(new Animated.Value(0)).current

  const headerHeight = bioHeightRef.interpolate({
    inputRange: [0, BIO_MAX_HEIGHT],
    outputRange: [BIO_MAX_HEIGHT, 0],
    extrapolate: Extrapolate.CLAMP,
  })

  // const animatedBioContainer = useAnimatedStyle(() => {
  //   return {
  //     height: interpolate(bioHeight, [0, 1], [0, BIO_MAX_HEIGHT]),
  //   }
  // })

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "topic":
        return (
          <TopicsTabScreen
            userId={user?._id}
            bioHeightRef={bioHeightRef}
            addToGallery={addToGallery}
          />
        )
      case "classified":
        return <ClassifiedsTabScreen userId={user?._id} addToGallery={addToGallery} />
      case "video":
        return <VideosTabScreen userId={user?._id} addToGallery={addToGallery} />
      case "gallery":
        return <GalleryTabView galleryItems={galleryItems} />
      default:
        return null
    }
  }

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<any>
    },
  ) => {
    console.log("TAB BAR PROPS", JSON.stringify(props))
    return (
      <View style={$tabBar}>
        {props.navigationState.routes.map((route, indexR) => (
          <Pressable
            key={route?.key}
            style={$tab}
            onPress={() => index !== indexR && setIndex(indexR)}
          >
            <Text
              style={$tabHeading}
              weight={index === indexR ? "bold" : "light"}
              text={route.title.toUpperCase()}
            />
          </Pressable>
        ))}
      </View>
    )
  }

  return (
    <Screen contentContainerStyle={$flex1}>
      <Animated.View style={[$topContainer, { height: headerHeight }]}>
        <FastImage style={$profileImage} source={{ uri: user?.picture }} />
        <Text text={formatName(user?.name)} style={$publisherName} weight="semiBold" />
        <Text text={user?.description || mockDescription} style={$descriptionText} />
      </Animated.View>
      <View style={$flex1}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </Screen>
  )
})

const $tabHeading: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 14,
}

const $tab: ViewStyle = {
  flex: 1,
  height: 50,
  alignItems: "center",
  justifyContent: "center",
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
