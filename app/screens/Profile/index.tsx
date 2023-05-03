import React, { FC, useState } from "react"
import { Dimensions, TextStyle, ViewStyle, View, useWindowDimensions, Alert } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { CollapsibleHeaderTabView } from "react-native-tab-view-collapsible-header"
import { NavigationState, SceneRendererProps, TabBar } from "react-native-tab-view"
import { observer } from "mobx-react-lite"

import { colors, spacing } from "../../theme"
import { HomeTabProps } from "../../tabs"
import { Button, Header, Screen, Text, Icon } from "../../components"
import { formatName } from "../../utils/formatName"
import {
  ClassifiedsTabScreen,
  GalleryTabView,
  HomePostsTabScreen,
  TopicsTabScreen,
} from "./tabViews"
import { $flex1 } from "../styles"
import { useHooks } from "../hooks"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { AppStackParamList } from "../../navigators"
import { useStores } from "../../models"
import ReportUserModal from "./reportUserModal"
import Toast from "react-native-toast-message"
import { toastMessages } from "../../utils/toastMessages"
import { showAlertYesNo } from "../../utils/helpers"

const BlockAndReport = observer(function BlockAndReport({
  setReportModalVisible,
  user,
}: {
  setReportModalVisible: (b: boolean) => void
  user: any
}) {
  const {
    userStore: { _id, isBlocked },
  } = useStores()
  const { blockUser: blockUserHook, unblockUser: unblockUserHook } = useHooks()

  const blockUser = () => {
    showAlertYesNo({
      message: `Block ${user?.first_name} ?`,
      description: `Once you block someone, they won't be able to send you message or make offers on your Classifieds.`,
      onYesPress: async () => {
        try {
          await blockUserHook(user?._id)
          Alert.alert(
            "Success",
            `${user?.first_name} is now blocked and won't be able to now interact.`,
          )
        } catch (err) {
          console.log("ERRRR", err)
          Toast.show({ text1: JSON.stringify(err?.response?.errors?.[0]?.message) })
        }
      },
    })
  }

  const unblockUser = () => {
    showAlertYesNo({
      message: `Unblock ${user?.first_name} ?`,
      description: `${user?.first_name} has been blocked by you. If you unblock them, they will now be able to send you messages or make offers on your Classifieds.`,
      onYesPress: async () => {
        try {
          await unblockUserHook(user?._id)
          Alert.alert("Success", "You can now connect back with " + user?.first_name)
        } catch (err) {
          Toast.show({ text1: JSON.stringify(err?.response?.errors?.[0]?.message) })
        }
      },
    })
  }

  return (
    <>
      {user?._id !== _id && (
        <>
          <Icon
            color={colors.palette.angry500}
            onPress={() => setReportModalVisible(true)}
            icon="reportUser"
            containerStyle={$reportIcon}
            size={22}
          />
          <Icon
            onPress={isBlocked(user?._id) ? unblockUser : blockUser}
            icon="block"
            containerStyle={$blockIcon}
            size={22}
          />
        </>
      )}
    </>
  )
})

export const Profile: FC<HomeTabProps<"Profile">> = observer(function Profile({ route }) {
  const { user, header } = route.params
  const [galleryItemsTopics, setGalleryItemsTopics] = useState([])
  const [galleryItemsClassifieds, setGalleryItemsClassifieds] = useState([])
  const [isReportModalVisible, setReportModalVisible] = useState(false)
  const [galleryItemsHomePosts, setGalleryItemsHomePosts] = useState([])
  const { getOrCreateRoom } = useHooks()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const layout = useWindowDimensions()
  const {
    userStore: { _id },
    api: { mutateReportOnUser },
  } = useStores()
  const isUser = user?._id === _id

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "posts", title: "Posts" },
    { key: "topic", title: "Discussions" },
    { key: "classified", title: "Classifieds" },
    // { key: "video", title: "Videos" },
    { key: "gallery", title: "Gallery" },
  ])

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "posts":
        return <HomePostsTabScreen userId={user?._id} addToGallery={setGalleryItemsHomePosts} />
      case "topic":
        return <TopicsTabScreen userId={user?._id} addToGallery={setGalleryItemsTopics} />
      case "classified":
        return <ClassifiedsTabScreen userId={user?._id} addToGallery={setGalleryItemsClassifieds} />
      // case "video":
      //   return <VideosTabScreen userId={user?._id} addToGallery={setGalleryItemsVideos} />
      case "gallery":
        return (
          <GalleryTabView
            galleryItems={[
              ...galleryItemsTopics,
              ...galleryItemsClassifieds,
              // ...galleryItemsVideos,
              ...galleryItemsHomePosts,
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
    roomId && navigation.navigate("P2PChat", { receiver: user, roomId })
  }

  const reportUser = async (reason: string) => {
    try {
      await mutateReportOnUser({
        reason,
        reportedById: _id,
        userId: user?._id,
      })
      Toast.show(toastMessages.successfullyReported)
    } catch (err) {
      Toast.show(toastMessages.somethingWentWrong)
    }
    setReportModalVisible(false)
  }

  return (
    <Screen contentContainerStyle={$flex1}>
      {header && (
        <Header
          title={"Profile"}
          titleStyle={{ color: colors.palette.neutral100 }}
          leftIcon="caretLeft"
          backgroundColor={colors.palette.primary100}
          onLeftPress={() => navigation.goBack()}
          leftIconColor={colors.palette.neutral100}
        />
      )}
      <CollapsibleHeaderTabView
        renderScrollHeader={() => (
          <View style={$topContainer}>
            <FastImage style={$profileImage} source={{ uri: user?.picture }} />
            <Text text={formatName(user?.name)} style={$publisherName} weight="semiBold" />
            {user?.description && (
              <Text
                color={colors.palette.neutral900}
                numberOfLines={3}
                weight="normal"
                text={user?.description}
                style={$descriptionText}
              />
            )}
            {!isUser && (
              <Button preset="reversed" style={$messageButton} text="Message" onPress={onMessage} />
            )}
            <BlockAndReport user={user} setReportModalVisible={setReportModalVisible} />
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
      <ReportUserModal
        isVisible={isReportModalVisible}
        setVisible={setReportModalVisible}
        onReport={reportUser}
        userName={user?.first_name}
      />
    </Screen>
  )
})

const $blockIcon: ViewStyle = {
  position: "absolute",
  top: 20,
  right: 50,
}

const $reportIcon: ViewStyle = {
  position: "absolute",
  top: 20,
  right: 20,
}

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
  paddingBottom: spacing.medium,
}
const $descriptionText: TextStyle = {
  marginTop: spacing.large,
  width: Dimensions.get("screen").width - 100,
  fontSize: 14,
  lineHeight: 17,
  textAlign: "center",
  alignSelf: "center",
}

const $messageButton: ViewStyle = {
  padding: spacing.extraSmall,
  paddingHorizontal: spacing.medium,
  height: 45,
  width: 148,
  marginTop: spacing.medium,
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
