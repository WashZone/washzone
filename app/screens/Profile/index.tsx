import React, { FC, Ref, useEffect, useRef, useState } from "react"
import {
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
  Animated,
  View,
} from "react-native"
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu"

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
import { $contentCenter, $flex1, $flexRow, $justifyCenter } from "../styles"
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

// const BlockAndReport = observer(function BlockAndReport({
//   setReportModalVisible,
//   user,
// }: {
//   setReportModalVisible: (b: boolean) => void
//   user: any
// }) {

//   return (
//     <>
//       {user?._id !== _id && (
//         <>
//           <Icon
//             color={colors.palette.angry500}
//             onPress={() => setReportModalVisible(true)}
//             icon="reportUser"
//             containerStyle={$reportIcon}
//             size={22}
//           />
//           <Icon
//             onPress={isBlocked(user?._id) ? unblockUser : blockUser}
//             icon="block"
//             containerStyle={$blockIcon}
//             size={22}
//           />
//         </>
//       )}
//     </>
//   )
// })

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

const Options = ({ onMessage, setReportModalVisible, user }) => {
  const {
    userStore: { _id, isBlocked },
  } = useStores()

  const { blockUser: blockUserHook, unblockUser: unblockUserHook } = useHooks()

  const [visible, setVisible] = useState(false)

  const hideMenu = () => setVisible(false)

  const showMenu = () => setVisible(true)

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
    <Menu
      visible={visible}
      anchor={<Icon onPress={showMenu} icon="more" size={28} color={colors.palette.neutral100} />}
      onRequestClose={hideMenu}
    >
      <MenuItem
        onPress={() => {
          onMessage()
          hideMenu()
        }}
      >
        <View style={[{ height: "100%", width: 100, alignItems: "center" }, $flexRow]}>
          <Icon
            containerStyle={{ marginHorizontal: spacing.extraSmall }}
            color={colors.palette.neutral900}
            icon="chatMessage"
            size={22}
          />
          <Text text="Message" />
        </View>
      </MenuItem>
      <MenuDivider />

      <MenuItem
        onPress={() => {
          console.log("Setting Modal to true")
          setReportModalVisible(true)
          // hideMenu()
        }}
      >
        <View style={[{ height: "100%", width: 100, alignItems: "center" }, $flexRow]}>
          <Icon
            containerStyle={{ marginHorizontal: spacing.extraSmall }}
            color={colors.palette.angry500}
            icon="reportUser"
            size={22}
          />
          <Text text="Report" />
        </View>
      </MenuItem>
      <MenuDivider />
      <MenuItem
        onPress={() => {
          hideMenu()
          isBlocked(user?._id) ? unblockUser() : blockUser()
        }}
      >
        <View style={[{ height: "100%", width: 100, alignItems: "center" }, $flexRow]}>
          <Icon icon="block" size={22} containerStyle={{ marginHorizontal: spacing.extraSmall }} />
          <Text text={isBlocked(user?._id) ? "UnBlock" : "Block"} />
        </View>
      </MenuItem>
    </Menu>
  )
}

const ProfileHeader = ({ user, isUser, onMessage }) => {
  const [isReportModalVisible, setReportModalVisible] = useState(false)
  const {
    userStore: { _id },
    api: { mutateReportOnUser },
  } = useStores()
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

  return (
    <View style={{ height: 240, backgroundColor: colors.palette.neutral100 }}>
      <FastImage
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjFPcJqziZXYjlWPPAUxepuQbt4lDJEJqvRbGn9UoSfA&s",
        }}
        style={$topContainer}
      />
      <View style={$userDetailsContainer}>
        <View style={$flexRow}>
          <FastImage style={$profileImage} source={{ uri: user?.picture }} />

          <View
            style={[
              $flexRow,
              $flex1,
              { justifyContent: "space-around", paddingHorizontal: spacing.medium },
            ]}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                text="Followers"
                weight="semiBold"
                size="xxs"
                color={colors.palette.neutral400}
              />
              <Text text="100" size="lg" weight="semiBold" color={colors.palette.primary100} />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                text="Following"
                weight="semiBold"
                size="xxs"
                color={colors.palette.neutral400}
              />
              <Text text="100" size="lg" weight="semiBold" color={colors.palette.primary100} />
            </View>
          </View>
        </View>
        <View style={[$flexRow, { alignItems: "center", marginTop: spacing.tiny }]}>
          <Text text={formatName(user?.name)} style={$publisherName} weight="semiBold" />
          <Icon icon="verifiedTick" size={20} containerStyle={{ marginLeft: spacing.extraSmall }} />
        </View>
        {user?.description && (
          <View>
            <Text
              color={colors.palette.neutral900}
              numberOfLines={3}
              weight="normal"
              text={user?.description + "sadfasdfsdaf"}
              style={$descriptionText}
            />
          </View>
        )}
      </View>
      {!isUser && (
        <View style={$verticalThreeDots}>
          <Options
            onMessage={onMessage}
            setReportModalVisible={setReportModalVisible}
            user={user}
          />
        </View>
      )}
      <ReportUserModal
        isVisible={isReportModalVisible}
        setVisible={setReportModalVisible}
        onReport={reportUser}
        userName={user?.first_name}
      />
    </View>
  )
}

export const Profile: FC<HomeTabProps<"Profile">> = observer(function Profile({ route }) {
  const { user, header } = route.params
  const [galleryItemsTopics, setGalleryItemsTopics] = useState([])
  const [galleryItemsClassifieds, setGalleryItemsClassifieds] = useState([])
  const [galleryItemsHomePosts, setGalleryItemsHomePosts] = useState([])
  const { getOrCreateRoom, getUserById } = useHooks()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const layout = useWindowDimensions()
  const {
    userStore: { _id },
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
        return <HomePostsTabScreen userId={user?._id} addToGallery={setGalleryItemsHomePosts} />
      case "topic":
        return <TopicsTabScreen userId={user?._id} addToGallery={setGalleryItemsTopics} />
      case "classified":
        return <ClassifiedsTabScreen userId={user?._id} addToGallery={setGalleryItemsClassifieds} />
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
          <ProfileHeader user={user} isUser={isUser} onMessage={onMessage} />
        )}
        enableSnap
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={(props) => renderTabBar(props, position, setIndex, index)}
        onIndexChange={setIndex}
        style={$flex1}
        initialLayout={{ width: layout.width }}
      />
    </Screen>
  )
})

const $verticalThreeDots: ViewStyle = {
  position: "absolute",
  top: 10,
  right: 10,
  transform: [{ rotate: "90deg" }],
}

const $userDetailsContainer: ViewStyle = {
  marginHorizontal: spacing.medium,
  backgroundColor: colors.palette.neutral100,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  top: -40,
  height: 180,
  padding: spacing.medium,
}

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

const $topContainer: ImageStyle = {
  backgroundColor: colors.palette.neutral100,
  alignItems: "center",
  paddingBottom: spacing.medium,
  height: 100,
}

const $descriptionText: TextStyle = {
  fontSize: 14,
  lineHeight: 17,
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
  textAlign: "center",
}

const $profileImage: ImageStyle = {
  height: 60,
  width: 60,
  borderRadius: 30,
  alignSelf: "center",
}
