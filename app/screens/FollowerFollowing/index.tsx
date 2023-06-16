import React, { FC, useEffect, useState } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Header, Screen } from "../../components"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { HomeTabProps } from "../../tabs"
import { colors, spacing } from "../../theme"
import { observer } from "mobx-react-lite"
import { $flex1 } from "../styles"
import { FollowersList } from "./partials/Followers"
import { FollowingList } from "./partials/Followings"
import { formatName } from "../../utils/formatName"
import { useNavigation } from "@react-navigation/native"
import { TabBar, TabView } from "react-native-tab-view"

export const FollowerFollowing: FC<HomeTabProps<"FollowerFollowing">> = observer(
  function FollowerFollowing(props) {
    const { initialTab, user } = props.route.params
    console.log("USER FollowerFollowing", user)
    const navigation = useNavigation()
    const [index, setIndex] = React.useState(initialTab === "followers" ? 0 : 1)
    const [routes] = React.useState([
      { key: "followers", title: "Followers" },
      { key: "following", title: "Following" },
    ])
    const renderScene = ({ route }) => {
      switch (route.key) {
        case "followers":
          return <FollowersList user={user} />
        case "following":
          return <FollowingList user={user} />
        default:
          return null
      }
    }

    return (
      <Screen preset="fixed" contentContainerStyle={$flex1}>
        <Header
          safeAreaEdges={[]}
          title={formatName(user?.name)}
          titleStyle={{ color: colors.palette.neutral100 }}
          leftIcon="caretLeft"
          backgroundColor={colors.palette.primary100}
          onLeftPress={() => navigation.goBack()}
          leftIconColor={colors.palette.neutral100}
        />
        <TabView
          onIndexChange={setIndex}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={(props) => (
            <TabBar
              activeColor={colors.palette.primary100}
              inactiveColor={colors.palette.neutral400}
              contentContainerStyle={{ backgroundColor: colors.palette.neutral100 }}
              indicatorStyle={
               { backgroundColor: '#000'}
                // position: 'absolute',
                // left: 0,
                // bottom: 0,
                // right: 0,
                // height: 2,}
              }
              {...props}
            />
          )}
        />
      </Screen>
    )
  },
)

export default FollowerFollowing

const $backWhite: ViewStyle = { backgroundColor: colors.palette.neutral100 }

const $avatar: ImageStyle = {
  height: 60,
  width: 60,
  borderRadius: 30,
  alignSelf: "center",
  marginTop: 20,
}

const $heading: TextStyle = {
  color: colors.palette.neutral100,
  alignSelf: "center",
  marginTop: 10,
  fontSize: 32,
  letterSpacing: -0.5,
  shadowColor: colors.palette.neutral900,
  shadowOffset: { height: -2, width: -2 },
  elevation: 10,
  shadowRadius: 10,
  shadowOpacity: 1,
}

const $screenHeaderContainer: ViewStyle = {
  height: 200,
  backgroundColor: colors.palette.primary400,
  justifyContent: "center",
}

const $videoDetailsContent: ViewStyle = {
  paddingHorizontal: spacing.medium,
  flex: 1,
}

const $videoBlockContainer: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingTop: spacing.medium,
  flexDirection: "row",
}

const $seperator: ViewStyle = {
  marginHorizontal: spacing.medium,
  marginTop: spacing.medium,
  height: 1,
}

const videoPosterWidth = 150

const $videoPoster: ImageStyle = {
  height: (videoPosterWidth * 9) / 16,
  width: videoPosterWidth,
  borderRadius: 5,
}

const $videoTitle: TextStyle = {
  fontSize: 16,
  lineHeight: 22,
}

const $publisherName: TextStyle = {
  fontSize: 14,
  lineHeight: 28,
  color: colors.palette.neutral100,
  alignSelf: "center",
}

const $viewsAndCreated: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral500,
  lineHeight: 22,
}
