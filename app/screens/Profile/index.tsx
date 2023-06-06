import React, { FC, Ref, useEffect, useRef, useState } from "react"
import {
  Dimensions,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
  ImageBackground,
  Animated,
} from "react-native"
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
import { $contentCenter, $flex1 } from "../styles"
import { useHooks } from "../hooks"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { AppStackParamList } from "../../navigators"
import { useStores } from "../../models"
import ReportUserModal from "./reportUserModal"
import Toast from "react-native-toast-message"
import { toastMessages } from "../../utils/toastMessages"
import { showAlertYesNo } from "../../utils/helpers"
import { interpolateColor, useAnimatedStyle, useSharedValue } from "react-native-reanimated"
import Loading from "../../components/Loading"

const getIndexFromKey = (key: string) => {
  switch (key) {
    case "posts":
      return 0
    case "topic":
      return 1
    case "classified":
      return 2
    case "gallery":
      return 3
    default: {
      return 0
    }
  }
}

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

const renderTabBar = (
  props: SceneRendererProps & {
    navigationState: NavigationState<any>
  },
  position: React.MutableRefObject<Animated.Value>,
  setIndex: (n: number) => void,
  index: number,
) => {
  position.current = props.position
  const color = position.current.interpolate({
    inputRange: [0.5, 1],
    outputRange: [colors.palette.neutral100, colors.palette.primary100],
  })

  return (
    <TabBar
      style={$tab}
      labelStyle={$label}
      activeColor={colors.palette.neutral100}
      indicatorStyle={$indicator}
      scrollEnabled
      renderTabBarItem={(props) => {
        return (
          <TouchableOpacity
            onPress={() => {
              switch (props.key) {
                case "posts": {
                  setIndex(0)
                  break
                }
                case "topic": {
                  setIndex(1)
                  break
                }
                case "classified": {
                  setIndex(2)
                  break
                }
                case "gallery": {
                  setIndex(3)
                  break
                }
              }
            }}
          >
            <Animated.View
              style={[
                $tabBarItem,
                {
                  backgroundColor:
                    getIndexFromKey(props.key) === index
                      ? colors.palette.neutral100
                      : colors.palette.primary100,
                  borderTopRightRadius: spacing.tiny,
                  borderTopLeftRadius: spacing.tiny,
                },
              ]}
            >
              <Animated.Text
                style={{
                  color:
                    getIndexFromKey(props.key) === index
                      ? colors.palette.primary100
                      : colors.palette.neutral250,
                  fontWeight: getIndexFromKey(props.key) === index ? "700" : "500",
                  fontSize: spacing.medium,
                }}
              >
                {props?.key.toUpperCase()}
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>
        )
      }}
      {...props}
    />
  )
}

export const Profile: FC<HomeTabProps<"Profile">> = observer(function Profile({ route }) {
  const { user, header } = route.params
  console.log('user :: ', user)
  const [galleryItemsTopics, setGalleryItemsTopics] = useState([])
  const [galleryItemsClassifieds, setGalleryItemsClassifieds] = useState([])
  const [isReportModalVisible, setReportModalVisible] = useState(false)
  const [galleryItemsHomePosts, setGalleryItemsHomePosts] = useState([])
  const { getOrCreateRoom, getUserById } = useHooks()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const layout = useWindowDimensions()
  const {
    userStore: { _id },
    api: { mutateReportOnUser },
  } = useStores()
  const [loading, setLoading] = useState(Object.keys(user)?.length === 1)
  const isUser = user?._id === _id
  const position = useRef(new Animated.Value(0))
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "posts", title: "Posts" },
    { key: "topic", title: "Discussions" },
    { key: "classified", title: "Classifieds" },
    { key: "gallery", title: "Gallery" },
  ])

  const syncUser = async () => {
    const res = await getUserById(user?._id)
    navigation.setParams({ user: res })
    setLoading(false)
  }

  useEffect(() => {
    Object.keys(user)?.length === 1 && syncUser()
  }, [])

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "posts":
        return (
          <HomePostsTabScreen userId={user?._id} addToGallery={setGalleryItemsHomePosts} />
        )
      case "topic":
        return <TopicsTabScreen userId={user?._id} addToGallery={setGalleryItemsTopics} />
      case "classified":
        return (
          <ClassifiedsTabScreen
            userId={user?._id}
            addToGallery={setGalleryItemsClassifieds}
          />
        )
      case "gallery":
        return (
          <GalleryTabView
            galleryItems={[
              ...galleryItemsTopics,
              ...galleryItemsClassifieds,
              ...galleryItemsHomePosts,
            ]}
          />
        )
      default:
        return null
    }
  }

  const onMessage = async () => {
    const roomId = await getOrCreateRoom(user?._id)
    if (!roomId) Toast.show(toastMessages.mightbeblocked)
    roomId && navigation.navigate("P2PChat", { receiver: user, roomId })
  }

  const reportUser = async (reason: string) => {
    try {
      await mutateReportOnUser({
        reason,
        reportedById: _id,
        userId: user?._id,
      })
      Alert.alert(
        user?.first_name + " has been reported!",
        `Thank you for reporting the user. Please be assured that all reports are taken seriously and appropriate action will be taken if necessary. We will review the user within 24hours.`,
      )
    } catch (err) {
      Toast.show(toastMessages.somethingWentWrong)
    }
    setReportModalVisible(false)
  }

  if (loading) return <Loading />

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
          <ImageBackground
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjFPcJqziZXYjlWPPAUxepuQbt4lDJEJqvRbGn9UoSfA&s",
            }}
            blurRadius={1}
            style={$topContainer}
          >
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
          </ImageBackground>
        )}
        enableSnap
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={(props) => renderTabBar(props, position, setIndex, index)}
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

const $tabBarItem: ViewStyle = {
  height: 50,
  width: 171.2, // Default Tab Width as per docs
  backgroundColor: "pink",
  ...$contentCenter,
}

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
  height: 0,
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
